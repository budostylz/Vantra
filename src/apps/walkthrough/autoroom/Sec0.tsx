// src/apps/walkthrough/components/AutoRoom.tsx
import React, { useState } from "react";
import { db, auth } from "@/utils/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export function AutoRoom({ orgId }: { orgId: string }) {
  const [label, setLabel] = useState("Unknown");
  const [note, setNote] = useState("");

  const save = async () => {
    if (!auth.currentUser) return alert("Please sign in to save.");
    await addDoc(collection(db, "scans"), { orgId, label, note, createdAt: serverTimestamp() });
    alert("Room tagged.");
  };

  const card: React.CSSProperties = { border: "1px solid #e6e6e6", borderRadius: 12, padding: 14, background: "#fff" };
  const h3: React.CSSProperties = { margin: "0 0 8px 0" };

  return (
    <div style={card}>
      <h3 style={h3}>🏠 Auto Room (Manual tag MVP)</h3>
      <div style={{ display: "grid", gap: 8 }}>
        <select value={label} onChange={(e) => setLabel(e.target.value)} style={{ padding: 8, borderRadius: 8 }}>
          <option>Kitchen</option><option>Bathroom</option><option>Living Room</option>
          <option>Exterior</option><option>Garage</option><option>Unknown</option>
        </select>
        <input
          placeholder="Notes (e.g., 'stove present, tile floor')"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{ padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
        />
        <button
          style={{ height: 44, borderRadius: 10, border: "1px solid #111", background: "#111", color: "#fff", cursor: "pointer" }}
          onClick={save}
        >
          Save Tag
        </button>
      </div>
    </div>
  );
}
