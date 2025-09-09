// src/apps/walkthrough/components/LiveScan.tsx
import React, { useEffect, useRef, useState } from "react";
import { db, storage, auth } from "@/utils/firebase";
import { collection, doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

type CFResponse = {
  success: boolean;
  data?: { width: number; height: number; format: string; url?: string; base64?: string };
  error?: string;
};

const CLOUD_FN_URL =
  import.meta.env.VITE_IMAGE_INFO_URL ||
  "https://us-central1-budoapps-5aacf.cloudfunctions.net/imageInfoVantra";

export function LiveScan({ orgId, isMobileOrTablet }: { orgId: string; isMobileOrTablet: boolean }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const captureCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [streaming, setStreaming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      const tracks = (videoRef.current?.srcObject as MediaStream | null)?.getTracks() || [];
      tracks.forEach((t) => t.stop());
    };
  }, []);

  const start = async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error("getUserMedia not supported");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStreaming(true);
      }
    } catch {
      alert("Camera access failed. You can upload a photo instead.");
    }
  };

  const stop = () => {
    const tracks = (videoRef.current?.srcObject as MediaStream | null)?.getTracks() || [];
    tracks.forEach((t) => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    setStreaming(false);
  };

  const requireAuth = () => {
    if (!auth.currentUser) {
      alert("Please sign in to save scans.");
      return false;
    }
    return true;
  };

  // ── helpers ────────────────────────────────────────────────────────────────
  const blobToDataURL = (blob: Blob) =>
    new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result));
      r.onerror = () => reject(r.error);
      r.readAsDataURL(blob);
    });

  const dataURLToBlob = async (dataUrl: string) => {
    const res = await fetch(dataUrl);
    return await res.blob();
  };

  const urlToBlob = async (url: string) => {
    const res = await fetch(url, { mode: "cors" }); // CORS handled by CF
    if (!res.ok) throw new Error(`Failed to fetch resized image (${res.status})`);
    return await res.blob();
  };

  const requestResizedFromCloud = async (payload: { base64?: string; cloudinaryUrl?: string }) => {
    const res = await fetch(CLOUD_FN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = (await res.json()) as CFResponse;
    if (!res.ok || !json.success || !json.data) throw new Error(json.error || "Resize service failed");
    return json.data;
  };

  /**
   * Upload the (already ≤1024px) blob to Storage, then create jobs/{jobId} safely.
   * - New jobId for every capture or upload (caller invokes per action)
   * - Uses setDoc with an existence check to avoid overwriting fields that workers might set.
   */
  const uploadAndCreateJob = async ({
    finalBlob,
    width,
    height,
    format,
    folder,
  }: {
    finalBlob: Blob;
    width?: number;
    height?: number;
    format?: string;
    folder: "scans" | "uploads";
  }) => {
    // new job id per action (capture or upload)
    const jobId =
      (crypto as any).randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    // 1) upload to Storage
    const ext = finalBlob.type?.split("/")[1] || (format || "jpeg");
    const storagePath = `${orgId}/${folder}/${jobId}.${ext}`;
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, finalBlob, { contentType: finalBlob.type || "image/jpeg" });
    const downloadUrl = await getDownloadURL(storageRef);

    // 2) create/merge job doc WITHOUT clobbering concurrent worker updates
    const jobRef = doc(collection(db, "jobs"), jobId);
    const snap = await getDoc(jobRef);

    if (!snap.exists()) {
      // Initial create with full shape
      await setDoc(jobRef, {
        ownerUid: auth.currentUser!.uid,
        imageUrl: downloadUrl,
        createdAt: serverTimestamp(),
        status: "pending",
        required: ["yolo", "seg", "depth"],
        // Do NOT include `done` here if there's a chance parallel writers might beat us.
        // But since this is a brand-new id, it's safe to initialize to [].
        done: [],
        // Optional convenience
        width: width ?? null,
        height: height ?? null,
        format: format ?? null,
      } as const);
    } else {
      // If something already created the job, merge only non-conflicting fields.
      // Avoid writing `status` or `done` so we don't overwrite workers.
      await setDoc(
        jobRef,
        {
          ownerUid: auth.currentUser!.uid,
          imageUrl: downloadUrl,
          // don't touch createdAt/status/done if doc exists
          width: width ?? snap.get("width") ?? null,
          height: height ?? snap.get("height") ?? null,
          format: format ?? snap.get("format") ?? null,
        },
        { merge: true }
      );
    }

    return { jobId, downloadUrl };
  };

  // ── CAPTURE → resize via CF → upload → create jobs/{jobId} ──────────────────
  const capture = async () => {
    if (!requireAuth()) return;
    if (!videoRef.current || !captureCanvasRef.current) return;

    const v = videoRef.current, c = captureCanvasRef.current;
    c.width = v.videoWidth; c.height = v.videoHeight;
    const ctx = c.getContext("2d")!;
    ctx.drawImage(v, 0, 0);

    const rawBlob = await new Promise<Blob>((resolve, reject) =>
      c.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), "image/jpeg", 0.9)
    );

    setBusy(true);
    try {
      const dataUrl = await blobToDataURL(rawBlob);
      const resized = await requestResizedFromCloud({ base64: dataUrl });

      let finalBlob: Blob;
      let previewSrc: string;

      if (resized.base64) {
        previewSrc = resized.base64;
        finalBlob = await dataURLToBlob(resized.base64);
      } else if (resized.url) {
        previewSrc = resized.url;
        finalBlob = await urlToBlob(resized.url);
      } else {
        previewSrc = dataUrl;
        finalBlob = rawBlob;
      }

      setPreview(previewSrc);

      await uploadAndCreateJob({
        finalBlob,
        width: resized.width,
        height: resized.height,
        format: resized.format,
        folder: "scans",
      });
    } catch (e: any) {
      alert(e?.message || "Failed to process capture.");
    } finally {
      setBusy(false);
    }
  };

  // ── FILE UPLOAD → resize via CF → upload → create jobs/{jobId} ──────────────
  const onFile = async (f?: File) => {
    if (!requireAuth() || !f) return;

    setBusy(true);
    try {
      const dataUrl = await blobToDataURL(f);
      const resized = await requestResizedFromCloud({ base64: dataUrl });

      let finalBlob: Blob;
      let previewSrc: string;

      if (resized.base64) {
        previewSrc = resized.base64;
        finalBlob = await dataURLToBlob(resized.base64);
      } else if (resized.url) {
        previewSrc = resized.url;
        finalBlob = await urlToBlob(resized.url);
      } else {
        previewSrc = dataUrl;
        finalBlob = f;
      }

      setPreview(previewSrc);

      await uploadAndCreateJob({
        finalBlob,
        width: resized.width,
        height: resized.height,
        format: resized.format,
        folder: "uploads",
      });
    } catch (e: any) {
      alert(e?.message || "Failed to process upload.");
    } finally {
      setBusy(false);
    }
  };

  // ── UI ──────────────────────────────────────────────────────────────────────
  const actionsWrap: React.CSSProperties = isMobileOrTablet
    ? { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, alignItems: "stretch", marginTop: 4 }
    : { display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" };

  const primaryBtn: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    height: 44, padding: "0 12px", borderRadius: 10,
    border: "1px solid #111", background: "#111", color: "#fff", cursor: "pointer",
    width: isMobileOrTablet ? "100%" : undefined,
  };

  const ghostBtn: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    height: 44, padding: "0 12px", borderRadius: 10,
    border: "1px solid #ccc", background: "#fff", color: "#111", cursor: "pointer",
    width: isMobileOrTablet ? "100%" : undefined,
  };

  const card: React.CSSProperties = { border: "1px solid #e6e6e6", borderRadius: 12, padding: 14, background: "#fff" };
  const videoStyle: React.CSSProperties = {
    width: "100%", borderRadius: 8, background: "#000", minHeight: isMobileOrTablet ? 300 : 0,
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
            <button style={primaryBtn} onClick={start}>Start Camera</button>
          ) : (
            <>
              <button style={ghostBtn} onClick={stop}>Stop</button>
              <button style={primaryBtn} onClick={capture} disabled={busy}>Capture & Save</button>
            </>
          )}
          <label style={ghostBtn as React.CSSProperties}>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: "none" }}
              onChange={(e) => onFile(e.target.files?.[0] || undefined)}
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
