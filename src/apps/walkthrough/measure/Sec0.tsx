// src/apps/walkthrough/components/Measure.tsx
import React, { useState } from "react";

export function Measure() {
  const [lengthFt, setLengthFt] = useState(20);
  const [widthFt, setWidthFt] = useState(12);
  const area = Math.round(lengthFt * widthFt);

  const card: React.CSSProperties = { border: "1px solid #e6e6e6", borderRadius: 12, padding: 14, background: "#fff" };
  const h3: React.CSSProperties = { margin: "0 0 8px 0" };
  const note: React.CSSProperties = { color: "#666", fontSize: 12 };

  return (
    <div style={card}>
      <h3 style={h3}>📏 Auto Measure (Fallback)</h3>
      <p style={note}>Manual dimensions for now; upgrade to AR/API later.</p>
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
        <div><strong>Estimated Area:</strong> {area} sq ft</div>
      </div>
    </div>
  );
}
