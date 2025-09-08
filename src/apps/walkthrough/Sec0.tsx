// src/apps/walkthrough/WalkthroughApp.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { db, storage, ensureAnonAuth } from "@/utils/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

type ModeKey = "live" | "room" | "debris" | "measure";

const shell = {
  wrap: { maxWidth: 980, margin: "0 auto", padding: "12px" } as React.CSSProperties,
  topbar: {
    display: "flex", alignItems: "center", gap: 8, marginBottom: 12,
  } as React.CSSProperties,
  backBtn: {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    height: 40, padding: "0 12px", borderRadius: 10, border: "1px solid #ccc",
    background: "#fff", color: "#111", cursor: "pointer", textDecoration: "none",
  } as React.CSSProperties,
  title: { margin: 0, fontSize: 18, fontWeight: 700 } as React.CSSProperties,
  tabsRow: {
    display: "flex", gap: 8, flexWrap: "wrap", margin: "8px 0 12px",
  } as React.CSSProperties,
  card: { border: "1px solid #e6e6e6", borderRadius: 12, padding: 14, background: "#fff" } as React.CSSProperties,
  h3: { margin: "0 0 8px 0" } as React.CSSProperties,
  note: { color: "#666", fontSize: 12 } as React.CSSProperties,
};

// ---------- Mode: Live Scan ----------
function LiveScan({ orgId, isMobileOrTablet }: { orgId: string; isMobileOrTablet: boolean }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [streaming, setStreaming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    ensureAnonAuth();
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

  const capture = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const v = videoRef.current,
      c = canvasRef.current;
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    const ctx = c.getContext("2d")!;
    ctx.drawImage(v, 0, 0);

    const blob = await new Promise<Blob>((resolve, reject) =>
      c.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), "image/jpeg", 0.85)
    );

    setPreview(URL.createObjectURL(blob));
    setBusy(true);
    try {
      const jobId = "adhoc";
      const id = (crypto as any).randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
      const path = `${orgId}/scans/${jobId}/${id}.jpg`;
      await uploadBytes(ref(storage, path), blob, { contentType: "image/jpeg" });
      await addDoc(collection(db, "photos"), {
        orgId,
        jobId,
        path,
        type: "scan",
        createdAt: serverTimestamp(),
      });
    } finally {
      setBusy(false);
    }
  };

  const onFile = async (f?: File) => {
    if (!f) return;
    setPreview(URL.createObjectURL(f));
    setBusy(true);
    try {
      const jobId = "adhoc";
      const id = (crypto as any).randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
      const path = `${orgId}/uploads/${jobId}/${id}_${f.name}`;
      await uploadBytes(ref(storage, path), f, { contentType: f.type || "image/jpeg" });
      await addDoc(collection(db, "photos"), {
        orgId,
        jobId,
        path,
        type: "upload",
        createdAt: serverTimestamp(),
      });
    } finally {
      setBusy(false);
    }
  };

  // Equal-size action buttons in mobile grid
  const actionsWrap: React.CSSProperties = isMobileOrTablet
    ? {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8,
        alignItems: "stretch",
        marginTop: 4,
      }
    : { display: "flex", gap: 12, alignItems: "center" };

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
  };

  // Make the video pane fluid, with a reasonable minimum height on mobile
  const videoStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: 8,
    background: "#000",
    minHeight: isMobileOrTablet ? 300 : 0,
  };

  return (
    <div style={shell.card}>
      <h3 style={shell.h3}>📹 Live Camera Scan</h3>
      <div style={{ display: "grid", gap: 12 }}>
        <video ref={videoRef} playsInline muted style={videoStyle} />
        <div style={actionsWrap}>
          {!streaming ? (
            <button style={primaryBtn} onClick={start}>
              Start Camera
            </button>
          ) : (
            <>
              <button style={ghostBtn} onClick={stop}>
                Stop
              </button>
              <button style={primaryBtn} onClick={capture} disabled={busy}>
                Capture
              </button>
            </>
          )}
          {/* Keep Upload with same dimensions as buttons */}
          <label style={ghostBtn as React.CSSProperties}>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: "none" }}
              onChange={(e) => onFile(e.target.files?.[0] || undefined)}
            />
            Upload Photo
          </label>
          {/* Note spans full row on mobile */}
          <div style={{ gridColumn: isMobileOrTablet ? "1 / -1" : "auto" }}>
            <span style={shell.note}>Requires camera permission on mobile.</span>
          </div>
        </div>
        <canvas ref={canvasRef} style={{ display: "none" }} />
        {preview && <img src={preview} alt="preview" style={{ width: "100%", borderRadius: 8 }} />}
      </div>
    </div>
  );
}

// ---------- Mode: Auto Room ----------
function AutoRoom({ orgId }: { orgId: string }) {
  const [label, setLabel] = useState("Unknown");
  const [note, setNote] = useState("");

  const save = async () => {
    await ensureAnonAuth();
    await addDoc(collection(db, "scans"), {
      orgId,
      label,
      note,
      createdAt: serverTimestamp(),
    });
    alert("Room tagged.");
  };

  return (
    <div style={shell.card}>
      <h3 style={shell.h3}>🏠 Auto Room (Manual tag MVP)</h3>
      <div style={{ display: "grid", gap: 8 }}>
        <select value={label} onChange={(e) => setLabel(e.target.value)} style={{ padding: 8, borderRadius: 8 }}>
          <option>Kitchen</option>
          <option>Bathroom</option>
          <option>Living Room</option>
          <option>Exterior</option>
          <option>Garage</option>
          <option>Unknown</option>
        </select>
        <input
          placeholder="Notes (e.g., 'stove present, tile floor')"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{ padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
        />
        <button
          style={{
            height: 44,
            borderRadius: 10,
            border: "1px solid #111",
            background: "#111",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={save}
        >
          Save Tag
        </button>
      </div>
    </div>
  );
}

// ---------- Mode: Debris / Material ----------
function Debris({ orgId }: { orgId: string }) {
  const [tags, setTags] = useState<string>("drywall_dust, tape, overspray");
  const save = async () => {
    await ensureAnonAuth();
    await addDoc(collection(db, "scans"), {
      orgId,
      debris: tags.split(",").map((s) => s.trim()).filter(Boolean),
      createdAt: serverTimestamp(),
    });
    alert("Debris/material notes saved.");
  };
  return (
    <div style={shell.card}>
      <h3 style={shell.h3}>🧪 Debris + Material</h3>
      <p style={shell.note}>Stub for model output—use this now, swap with YOLO later.</p>
      <textarea
        rows={3}
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
      />
      <div style={{ marginTop: 8 }}>
        <button
          style={{
            height: 44,
            borderRadius: 10,
            border: "1px solid #111",
            background: "#111",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={save}
        >
          Save
        </button>
      </div>
    </div>
  );
}

// ---------- Mode: Auto Measure (fallback) ----------
function Measure() {
  const [lengthFt, setLengthFt] = useState(20);
  const [widthFt, setWidthFt] = useState(12);
  const area = Math.round(lengthFt * widthFt);

  return (
    <div style={shell.card}>
      <h3 style={shell.h3}>📏 Auto Measure (Fallback)</h3>
      <p style={shell.note}>MVP uses manual dimensions; later upgrade to WebXR/ARCore or reference-object scaling.</p>
      <div style={{ display: "grid", gap: 8, maxWidth: 420 }}>
        <label>
          Length (ft)
          <input
            type="number"
            value={lengthFt}
            onChange={(e) => setLengthFt(Number(e.target.value))}
            style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
          />
        </label>
        <label>
          Width (ft)
          <input
            type="number"
            value={widthFt}
            onChange={(e) => setWidthFt(Number(e.target.value))}
            style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
          />
        </label>
        <div>
          <strong>Estimated Area:</strong> {area} sq ft
        </div>
      </div>
    </div>
  );
}

// ---------- App container with mobile detection + hash routing ----------
export default function WalkthroughApp({ orgId = "vantra" }: { orgId?: string }) {
  // Mobile / tablet detector (as requested)
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  useEffect(() => {
    const checkDevice = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isTablet = w <= 1024 && w > 640;
      const isMobile = w <= 640;
      const isLandscape = w > h;
      setIsMobileOrTablet(isMobile || isTablet || isLandscape);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    window.addEventListener("orientationchange", checkDevice);
    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("orientationchange", checkDevice);
    };
  }, []);

  const [mode, setMode] = useState<ModeKey>(() => {
    const m = location.hash.match(/mode=([a-z]+)/i)?.[1] as ModeKey | undefined;
    return m || "live";
  });
  useEffect(() => {
    const onHash = () => {
      const m = location.hash.match(/mode=([a-z]+)/i)?.[1] as ModeKey | undefined;
      if (m) setMode(m);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  useEffect(() => {
    location.hash = `app&mode=${mode}`;
  }, [mode]);

  const tabs = useMemo(
    () =>
      [
        { key: "live", label: "Live Scan", node: <LiveScan orgId={orgId} isMobileOrTablet={isMobileOrTablet} /> },
        { key: "room", label: "Auto Room", node: <AutoRoom orgId={orgId} /> },
        { key: "debris", label: "Debris", node: <Debris orgId={orgId} /> },
        { key: "measure", label: "Measure", node: <Measure /> },
      ] as const,
    [orgId, isMobileOrTablet]
  );

  // Equal-size tabs in mobile: two-column grid
  const tabsContainer: React.CSSProperties = isMobileOrTablet
    ? { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, margin: "8px 0 12px" }
    : shell.tabsRow;

  const tabBtn = (active: boolean): React.CSSProperties =>
    isMobileOrTablet
      ? {
          height: 44,
          width: "100%",
          borderRadius: 10,
          border: active ? "2px solid #111" : "1px solid #ccc",
          background: active ? "#111" : "#fff",
          color: active ? "#fff" : "#111",
          cursor: "pointer",
        }
      : {
          padding: "8px 12px",
          borderRadius: 10,
          border: active ? "2px solid #111" : "1px solid #ccc",
          background: active ? "#111" : "#fff",
          color: active ? "#fff" : "#111",
          cursor: "pointer",
        };

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.assign("/");
  };

  return (
    <div style={shell.wrap}>
      <div style={shell.topbar}>
        <button onClick={goBack} style={shell.backBtn} aria-label="Back">
          ← Back
        </button>
        <h1 style={shell.title}>Smart Site Walkthrough</h1>
      </div>

      <div style={tabsContainer}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setMode(t.key as ModeKey)}
            style={tabBtn(mode === t.key)}
            aria-current={mode === t.key}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tabs.find((t) => t.key === mode)?.node}
    </div>
  );
}
