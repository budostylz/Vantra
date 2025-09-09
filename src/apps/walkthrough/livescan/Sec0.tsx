// src/apps/walkthrough/components/LiveScan.tsx
import React, { useEffect, useRef, useState } from "react";
import { auth } from "@/utils/firebase";
import { uploadToStorage } from "@/utils/uploadToStorage";
import { toast } from "react-hot-toast";

type CFImageInfo = {
  width: number;
  height: number;
  format: string;
  url?: string;
  base64?: string;
};

type CFImageInfoResp = { success: boolean; data?: CFImageInfo; error?: string };

const CLOUD_FN_RESIZE_URL =
  import.meta.env.VITE_IMAGE_INFO_URL ||
  "https://us-central1-budoapps-5aacf.cloudfunctions.net/imageInfoVantra";

const CF_FIRESTORE_UPDATE_URL =
  import.meta.env.VITE_CF_FIRESTORE_UPDATE ||
  "https://us-central1-budoapps-5aacf.cloudfunctions.net/firebaseFirestoreUpdate";

const TEMPLATE_ID = "templateA"; // wire from settings if needed

export function LiveScan({ orgId, isMobileOrTablet }: { orgId: string; isMobileOrTablet: boolean }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const captureCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [streaming, setStreaming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  console.log('CURRENT USER: ', auth.currentUser);

  // ────────────────────────────────────────────────────────────────────────────
  // Helpers
  // ────────────────────────────────────────────────────────────────────────────
  const log = (...args: any[]) => console.log("📸 [LiveScan]", ...args);

  const blobToDataURL = (blob: Blob) =>
    new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result));
      r.onerror = () => reject(r.error);
      r.readAsDataURL(blob);
    });

  const newJobId = () =>
    (crypto as any).randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const requireAuth = () => {
    if (!auth.currentUser) {
      toast.error("Please sign in to save scans.");
      return false;
    }
    return true;
  };

  const requestResize = async (payload: { base64?: string; cloudinaryUrl?: string }) => {
    log("1) Resize request →", { kind: payload.base64 ? "base64" : "url" });
    const id = toast.loading("1/4 Resizing to ≤1024px…");
    const res = await fetch(CLOUD_FN_RESIZE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = (await res.json()) as CFImageInfoResp;
    if (!res.ok || !json.success || !json.data) {
      toast.error(`Resize failed: ${json.error || res.statusText}`, { id });
      throw new Error(json.error || "Resize service failed");
    }
    toast.success(`Resized ${json.data.width}×${json.data.height} (${json.data.format})`, { id });
    log("1) Resize OK ←", json.data);
    return json.data;
  };

  const uploadViaCF = async (src: string, formatHint?: string) => {
    const id = toast.loading("2/4 Uploading via Cloud Function…");
    log("2) Upload start →", { formatHint, len: src?.length });
    const { url } = await uploadToStorage({
      src,
      suggestedExt: (formatHint || "jpeg").toLowerCase(),
      uid: auth.currentUser!.uid,
      templateId: TEMPLATE_ID,
    });
    toast.success("Uploaded to Storage ✅", { id });
    log("2) Upload OK ←", { url });
    return url;
  };

  const upsertJobViaCF = async ({
    jobId,
    imageUrl,
    width,
    height,
    format,
  }: {
    jobId: string;
    imageUrl: string;
    width?: number;
    height?: number;
    format?: string;
  }) => {
    const id = toast.loading("3/4 Creating job record…");
    log("3) Firestore upsert →", { jobId, imageUrl, width, height, format });

    const payload = {
      collection: "jobs",
      docId: jobId,
      data: {
        // core shape
        ownerUid: auth.currentUser!.uid,
        imageUrl,
        status: "pending",
        required: ["yolo", "seg", "depth"],
        done: [],
        // convenience
        orgId,
        width: width ?? null,
        height: height ?? null,
        format: format ?? null,
      },
    };

    const res = await fetch(CF_FIRESTORE_UPDATE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const ok = res.ok;
    const text = await res.text().catch(() => "");
    if (!ok) {
      toast.error(`Job write failed (${res.status})`, { id });
      log("3) Firestore upsert ERROR ←", res.status, text);
      throw new Error(text || `Firestore update error ${res.status}`);
    }

    toast.success("Job created ✅", { id });
    log("3) Firestore upsert OK ←", text);
  };

  const finalizeToast = (jobId: string) => {
    toast.success(`4/4 Done. Job ${jobId} ready to process.`, { duration: 3500 });
  };

  // ────────────────────────────────────────────────────────────────────────────
  // Camera lifecycle
  // ────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      const tracks = (videoRef.current?.srcObject as MediaStream | null)?.getTracks() || [];
      tracks.forEach((t) => t.stop());
    };
  }, []);

  const start = async () => {
    try {
      log("Start camera");
      if (!navigator.mediaDevices?.getUserMedia) throw new Error("getUserMedia not supported");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStreaming(true);
        toast.success("Camera started");
      }
    } catch (err: any) {
      log("Camera error", err);
      toast.error("Camera access failed. You can upload a photo instead.");
    }
  };

  const stop = () => {
    log("Stop camera");
    const tracks = (videoRef.current?.srcObject as MediaStream | null)?.getTracks() || [];
    tracks.forEach((t) => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    setStreaming(false);
    toast("Camera stopped");
  };

  // ────────────────────────────────────────────────────────────────────────────
  // Capture → Resize → Upload → Create Job (all with verbose toasts)
  // ────────────────────────────────────────────────────────────────────────────
  const capture = async () => {
    if (!requireAuth()) return;
    if (!videoRef.current || !captureCanvasRef.current) return;

    setBusy(true);
    const jobId = newJobId();

    try {
      log("Capture start →", { jobId });

      // draw current frame to canvas
      const v = videoRef.current;
      const c = captureCanvasRef.current;
      c.width = v.videoWidth;
      c.height = v.videoHeight;
      c.getContext("2d")!.drawImage(v, 0, 0);

      const rawBlob = await new Promise<Blob>((resolve, reject) =>
        c.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), "image/jpeg", 0.9)
      );

      const base64 = await blobToDataURL(rawBlob);
      setPreview(base64);

      // 1) resize in cloud
      const resized = await requestResize({ base64 });

      // choose best source to upload
      const srcForUpload = resized.base64 || resized.url || base64;

      // 2) upload to storage via CF
      const publicUrl = await uploadViaCF(srcForUpload, resized.format);

      // 3) upsert job doc via CF (no client rules needed)
      await upsertJobViaCF({
        jobId,
        imageUrl: publicUrl,
        width: resized.width,
        height: resized.height,
        format: resized.format,
      });

      // 4) finish
      finalizeToast(jobId);
      log("Capture DONE ←", { jobId, publicUrl });
    } catch (e: any) {
      log("Capture flow error", e);
      toast.error(e?.message || "Failed to process capture.");
    } finally {
      setBusy(false);
    }
  };

  // Upload from file → same pipeline
  const onFile = async (f?: File) => {
    if (!requireAuth() || !f) return;

    setBusy(true);
    const jobId = newJobId();

    try {
      log("Upload start →", { jobId, name: f.name, type: f.type, size: f.size });
      const base64 = await blobToDataURL(f);
      setPreview(base64);

      const resized = await requestResize({ base64 });
      const srcForUpload = resized.base64 || resized.url || base64;

      const publicUrl = await uploadViaCF(srcForUpload, resized.format);

      await upsertJobViaCF({
        jobId,
        imageUrl: publicUrl,
        width: resized.width,
        height: resized.height,
        format: resized.format,
      });

      finalizeToast(jobId);
      log("Upload DONE ←", { jobId, publicUrl });
    } catch (e: any) {
      log("Upload flow error", e);
      toast.error(e?.message || "Failed to process upload.");
    } finally {
      setBusy(false);
    }
  };

  // ────────────────────────────────────────────────────────────────────────────
  // UI
  // ────────────────────────────────────────────────────────────────────────────
  const actionsWrap: React.CSSProperties = isMobileOrTablet
    ? { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, alignItems: "stretch", marginTop: 4 }
    : { display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" };

  const primaryBtn: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    padding: "0 12px",
    borderRadius: 10,
    border: "1px solid #111",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
    width: isMobileOrTablet ? "100%" : undefined,
    opacity: busy ? 0.8 : 1,
  };

  const ghostBtn: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    padding: "0 12px",
    borderRadius: 10,
    border: "1px solid #ccc",
    background: "#fff",
    color: "#111",
    cursor: "pointer",
    width: isMobileOrTablet ? "100%" : undefined,
    opacity: busy ? 0.8 : 1,
  };

  const card: React.CSSProperties = { border: "1px solid #e6e6e6", borderRadius: 12, padding: 14, background: "#fff" };
  const videoStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: 8,
    background: "#000",
    minHeight: isMobileOrTablet ? 300 : 0,
  };
  const h3: React.CSSProperties = { margin: "0 0 8px 0" };
  const note: React.CSSProperties = { color: "#666", fontSize: 12 };

  return (
    <div style={card}>
      <h3 style={h3}>📹 Live Camera Scan</h3>
      <div style={{ display: "grid", gap: 12 }}>
        <video ref={videoRef} playsInline muted style={videoStyle} />
        <div style={actionsWrap}>
          {!streaming ? (
            <button style={primaryBtn} onClick={start} disabled={busy}>
              Start Camera
            </button>
          ) : (
            <>
              <button style={ghostBtn} onClick={stop} disabled={busy}>
                Stop
              </button>
              <button style={primaryBtn} onClick={capture} disabled={busy}>
                Capture & Save
              </button>
            </>
          )}
          <label style={ghostBtn as React.CSSProperties}>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: "none" }}
              onChange={(e) => onFile(e.target.files?.[0] || undefined)}
              disabled={busy}
            />
            Upload & Save
          </label>
          <div style={{ gridColumn: isMobileOrTablet ? "1 / -1" : "auto" }}>
            <span style={note}>You must be signed in to save photos.</span>
          </div>
        </div>
        <canvas ref={captureCanvasRef} style={{ display: "none" }} />
        {preview && <img src={preview} alt="preview" style={{ width: "100%", borderRadius: 8 }} />}
      </div>
    </div>
  );
}
