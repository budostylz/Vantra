// src/apps/walkthrough/components/LiveScan.tsx
import React, { useEffect, useRef, useState } from "react";
import { db, storage, auth } from "@/utils/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

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
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

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

  const capture = async () => {
    if (!requireAuth()) return;
    if (!videoRef.current || !captureCanvasRef.current) return;
    const v = videoRef.current, c = captureCanvasRef.current;
    c.width = v.videoWidth; c.height = v.videoHeight;
    const ctx = c.getContext("2d")!;
    ctx.drawImage(v, 0, 0);

    const blob = await new Promise<Blob>((resolve, reject) =>
      c.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), "image/jpeg", 0.9)
    );

    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(blob));
    setBusy(true);
    try {
      const jobId = "adhoc";
      const id = (crypto as any).randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
      const path = `${orgId}/scans/${jobId}/${id}.jpg`;
      await uploadBytes(ref(storage, path), blob, { contentType: "image/jpeg" });
      await addDoc(collection(db, "photos"), {
        orgId, jobId, path, type: "scan", createdAt: serverTimestamp(),
      });
    } finally { setBusy(false); }
  };

  const onFile = async (f?: File) => {
    if (!requireAuth() || !f) return;
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(f));
    setBusy(true);
    try {
      const jobId = "adhoc";
      const id = (crypto as any).randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
      const path = `${orgId}/uploads/${jobId}/${id}_${f.name}`;
      await uploadBytes(ref(storage, path), f, { contentType: f.type || "image/jpeg" });
      await addDoc(collection(db, "photos"), {
        orgId, jobId, path, type: "upload", createdAt: serverTimestamp(),
      });
    } finally { setBusy(false); }
  };

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
