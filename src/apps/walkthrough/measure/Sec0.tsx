// src/apps/walkthrough/components/Measure.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";

type EightWallMsg = {
  type: "8thwall:measure";
  m2: number;
  points: [number, number][];
};

type Props = {
  projectUrl?: string; // Hosted 8th Wall URL for the measure scene (must postMessage to opener)
  shareCode?: string;  // Optional fallback purple button code, e.g. "93ast"
  onResult?: (r: { areaM2: number; areaFt2: number; points: [number, number][] }) => void;
};

export function Measure({
  projectUrl = "https://budoboost.8thwall.app/prod/",
  shareCode,
  onResult,
}: Props) {
  const [lengthFt, setLengthFt] = useState(20);
  const [widthFt, setWidthFt] = useState(12);
  const [arEnabled, setArEnabled] = useState(true);
  const [arM2, setArM2] = useState<number | null>(null);
  const [arPoints, setArPoints] = useState<[number, number][]>([]);
  const [waiting, setWaiting] = useState(false);
  const arWinRef = useRef<Window | null>(null);

  const manualFt2 = useMemo(() => Math.round(lengthFt * widthFt), [lengthFt, widthFt]);
  const arFt2 = useMemo(() => (arM2 == null ? null : Math.round(arM2 * 10.7639)), [arM2]);

  const card: React.CSSProperties = { border: "1px solid #e6e6e6", borderRadius: 12, padding: 14, background: "#fff" };
  const h3: React.CSSProperties = { margin: "0 0 8px 0" };
  const note: React.CSSProperties = { color: "#666", fontSize: 12 };

  useEffect(() => {
    const onMessage = (evt: MessageEvent) => {
      const data = evt.data as EightWallMsg;
      if (!data || data.type !== "8thwall:measure") return;
      setArM2(data.m2);
      setArPoints(data.points);
      setWaiting(false);
      onResult?.({ areaM2: data.m2, areaFt2: data.m2 * 10.7639, points: data.points });
      try {
        if (arWinRef.current && !arWinRef.current.closed) arWinRef.current.close();
      } catch {}
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onResult]);

  useEffect(() => {
    if (!shareCode) return;
    const id = "eightwall-embed8";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.async = true;
      s.src = "https://cdn.8thwall.com/web/share/embed8.js";
      document.head.appendChild(s);
    }
  }, [shareCode]);

  const openAR = () => {
    // Use window.open (not an <a target=_blank>) so window.opener remains available
    arWinRef.current = window.open(projectUrl, "_blank");
    setWaiting(true);
    if (!arWinRef.current) {
      setWaiting(false);
      alert("Popup blocked. Please allow popups for this site or open the AR link manually.");
    }
  };

  return (
    <div style={card}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "space-between" }}>
        <h3 style={h3}>📏 Auto Measure</h3>
        <label style={{ display: "inline-flex", gap: 6, alignItems: "center", fontSize: 13 }}>
          <input type="checkbox" checked={arEnabled} onChange={(e) => setArEnabled(e.target.checked)} />
          Use AR
        </label>
      </div>
      <p style={note}>
        Open the AR measure, tap the floor to add vertices, then hit <em>Done</em> in AR to send the area back here.
      </p>

      {arEnabled ? (
        <>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <button
              onClick={openAR}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #111",
                background: "#111",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Open AR Measure
            </button>
            {shareCode && (
              <div style={{ display: "inline-flex", alignItems: "center" }}>
                {/* Purple 8th Wall button as a fallback (may use noopener, which disables postMessage) */}
                <a data-8code={shareCode} />
              </div>
            )}
          </div>

          <div style={{ fontSize: 14, display: "grid", gap: 6 }}>
            <div><strong>Status:</strong> {waiting ? "Waiting for AR result…" : arM2 == null ? "Idle" : "Result received"}</div>
            <div><strong>AR Vertices:</strong> {arPoints.length}</div>
            <div>
              <strong>AR Area:</strong>{" "}
              {arFt2 == null ? "—" : (<>{arFt2} ft² ({arM2?.toFixed(2)} m²)</>)}
            </div>
          </div>
        </>
      ) : (
        <>
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
            <div><strong>Estimated Area:</strong> {manualFt2} ft²</div>
          </div>
        </>
      )}
    </div>
  );
}
