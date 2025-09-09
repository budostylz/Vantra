// src/apps/walkthrough/WalkthroughApp.tsx
import React, { useEffect, useMemo, useState } from "react";
import { LiveScan } from "./livescan/Sec0";
import { AutoRoom } from "./autoroom/Sec0";
import { Debris } from "./debris/Sec0";
import { Measure } from "./measure/Sec0";

type ModeKey = "live" | "room" | "debris" | "measure";

export default function WalkthroughApp({ orgId = "vantra" }: { orgId?: string }) {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  useEffect(() => {
    const checkDevice = () => {
      const w = window.innerWidth, h = window.innerHeight;
      const isTablet = w <= 1024 && w > 640, isMobile = w <= 640, isLandscape = w > h;
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
  useEffect(() => { location.hash = `app&mode=${mode}`; }, [mode]);

  const tabs = useMemo(
    () => [
      { key: "live", label: "Live Scan", node: <LiveScan orgId={orgId} isMobileOrTablet={isMobileOrTablet} /> },
      { key: "room", label: "Auto Room", node: <AutoRoom orgId={orgId} /> },
      { key: "debris", label: "Debris", node: <Debris orgId={orgId} /> },
      { key: "measure", label: "Measure", node: <Measure /> },
    ] as const,
    [orgId, isMobileOrTablet]
  );

  const wrap: React.CSSProperties = { maxWidth: 980, margin: "0 auto", padding: "12px" };
  const topbar: React.CSSProperties = { display: "flex", alignItems: "center", gap: 8, marginBottom: 12 };
  const backBtn: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    height: 40, padding: "0 12px", borderRadius: 10, border: "1px solid #ccc",
    background: "#fff", color: "#111", cursor: "pointer", textDecoration: "none",
  };
  const title: React.CSSProperties = { margin: 0, fontSize: 18, fontWeight: 700 };

  const tabsContainer: React.CSSProperties = isMobileOrTablet
    ? { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, margin: "8px 0 12px" }
    : { display: "flex", gap: 8, flexWrap: "wrap", margin: "8px 0 12px" };

  const tabBtn = (active: boolean): React.CSSProperties =>
    isMobileOrTablet
      ? { height: 44, width: "100%", borderRadius: 10, border: active ? "2px solid #111" : "1px solid #ccc",
          background: active ? "#111" : "#fff", color: active ? "#fff" : "#111", cursor: "pointer" }
      : { padding: "8px 12px", borderRadius: 10, border: active ? "2px solid #111" : "1px solid #ccc",
          background: active ? "#111" : "#fff", color: active ? "#fff" : "#111", cursor: "pointer" };

  const goBack = () => { window.location.assign("/walkthrough"); };

  return (
    <div style={wrap}>
      <div style={topbar}>
        <button onClick={goBack} style={backBtn} aria-label="Back">← Back</button>
        <h1 style={title}>Smart Site Walkthrough</h1>
      </div>

      <div style={tabsContainer}>
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setMode(t.key as ModeKey)} style={tabBtn(mode === t.key)} aria-current={mode === t.key}>
            {t.label}
          </button>
        ))}
      </div>

      {tabs.find((t) => t.key === mode)?.node}
    </div>
  );
}
