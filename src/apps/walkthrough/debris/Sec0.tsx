// src/apps/walkthrough/components/Debris.tsx
import React, { useState } from "react";
import { db, auth } from "@/utils/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export function Debris({ orgId }: { orgId: string }) {
  const [tags, setTags] = useState<string>("drywall_dust, tape, overspray");

  const save = async () => {
    if (!auth.currentUser) return alert("Please sign in to save.");
    await addDoc(collection(db, "scans"), {
      orgId,
      debris: tags.split(",").map((s) => s.trim()).filter(Boolean),
      createdAt: serverTimestamp(),
    });
    alert("Debris/material notes saved.");
  };

  const card: React.CSSProperties = { border: "1px solid #e6e6e6", borderRadius: 12, padding: 14, background: "#fff" };
  const h3: React.CSSProperties = { margin: "0 0 8px 0" };
  const note: React.CSSProperties = { color: "#666", fontSize: 12 };

  return (
    <div style={card}>
      <h3 style={h3}>🧪 Debris + Material</h3>
      <p style={note}>Stub for model output—use this now, swap with API later.</p>
      <textarea
        rows={3}
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
      />
      <div style={{ marginTop: 8 }}>
        <button
          style={{ height: 44, borderRadius: 10, border: "1px solid #111", background: "#111", color: "#fff", cursor: "pointer" }}
          onClick={save}
        >
          Save
        </button>
      </div>
    </div>
  );
}
