// src/components/dev/OverlayModeToggle.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { createPortal } from "react-dom";
import { usePreviewStore } from "@/store/previewStore";
import { useOverlay } from "@/store/hooks";
import { exportOverlayJsonToStorage } from "@/utils/overlayExport";



type Pos = { top: number; left: number }; // relative to visual viewport
const LS_KEY = "oe:togglePos:v1";
const DRAG_THRESHOLD = 6;
const FALLBACK_W = 210;
const FALLBACK_H = 36;

const keyFor = (isMobileOrTablet: boolean) => `${LS_KEY}:${isMobileOrTablet ? "m" : "d"}`;

export default function OverlayModeToggle() {
  // Overlay wiring (auto-injected)
  const ROUTE = "/dev";
  const OVERLAY_KEY = "overlayModeToggle";
  useOverlay(ROUTE, OVERLAY_KEY); // node not needed here

  const mode = usePreviewStore((s) => s.uiDesignMode);         // "design" | "preview"
  const setMode = usePreviewStore((s) => s.setDesignMode);     // (m: "design" | "preview") => void

  // ✅ On first mount, default to preview unless URL explicitly asks for design
  const didInitRef = useRef(false);
  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;

    const params = new URLSearchParams(window.location.search);
    const urlMode = (params.get("mode") || params.get("editor"))?.toLowerCase();
    if (urlMode === "design" || urlMode === "preview" || urlMode === "golive") {
      setMode(urlMode as any);
      return;
    }



    if (mode !== "preview") setMode("preview");
    // intentionally omit deps — this should only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [mounted, setMounted] = useState(false);

  // Device detection
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const checkDevice = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isTablet = w <= 1024 && w > 640;
      const isMobile = w <= 640;
      const isLandscape = w > h;
      setIsMobileOrTablet(isMobile || isTablet || isLandscape);
      setIsDesktop(w >= 992);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    window.addEventListener("orientationchange", checkDevice);
    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("orientationchange", checkDevice);
    };
  }, []);

  // VisualViewport tracking
  const [vv, setVv] = useState({ top: 0, left: 0, width: 0, height: 0 });
  useEffect(() => {
    setMounted(true);
    const update = () => {
      const v = (window as any).visualViewport;
      setVv({
        top: v?.offsetTop || 0,
        left: v?.offsetLeft || 0,
        width: v?.width || window.innerWidth,
        height: v?.height || window.innerHeight,
      });
    };
    update();
    const v = (window as any).visualViewport;
    v?.addEventListener?.("resize", update);
    v?.addEventListener?.("scroll", update);
    v?.addEventListener?.("geometrychange", update);
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      v?.removeEventListener?.("resize", update);
      v?.removeEventListener?.("scroll", update);
      v?.removeEventListener?.("geometrychange", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  // Avoid the editor dock on the right
  const [dockPad, setDockPad] = useState(0);
  useEffect(() => {
    if (typeof document === "undefined") return;

    const calc = () => {
      const host = document.getElementById("oe-dock-root");
      if (!host) return setDockPad(0);
      const cs = window.getComputedStyle(host);
      const hidden =
        cs.display === "none" || cs.visibility === "hidden" || cs.pointerEvents === "none";
      const rect = host.getBoundingClientRect();
      const visible = !hidden && rect.width > 0 && rect.height > 0;
      setDockPad(visible ? Math.ceil(rect.width + 12) : 0);
    };

    calc();
    const ro = "ResizeObserver" in window ? new ResizeObserver(calc) : null;
    const host = document.getElementById("oe-dock-root");
    host && ro?.observe(host);

    const mo = new MutationObserver(calc);
    mo.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    window.addEventListener("resize", calc);
    return () => {
      ro?.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", calc);
    };
  }, []);

  // Draggable state (persisted per form factor)
  const [pos, setPos] = useState<Pos | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Load per-form-factor position whenever device class changes
  useEffect(() => {
    try {
      const raw = localStorage.getItem(keyFor(isMobileOrTablet));
      const next = raw ? (JSON.parse(raw) as Pos) : null;
      setPos(next); // may be null (defaults to top-right)
    } catch {
      setPos(null);
    }
  }, [isMobileOrTablet]);

  // Pointer / drag bookkeeping
  const primed = useRef(false);
  const dragging = useRef(false);
  const wasDragging = useRef(false);
  const start = useRef({ x: 0, y: 0 });
  const base = useRef<Pos>({ top: 0, left: 0 });
  const chipSize = useRef({ w: FALLBACK_W, h: FALLBACK_H });

  const savePos = (p: Pos | null) => {
    setPos(p);
    try {
      const k = keyFor(isMobileOrTablet);
      if (p) localStorage.setItem(k, JSON.stringify(p));
      else localStorage.removeItem(k);
    } catch { }
  };

  const clampToViewport = (p: Pos): Pos => {
    const pad = 8;
    const vw = vv.width || window.innerWidth;
    const vh = vv.height || window.innerHeight;
    const w = chipSize.current.w || FALLBACK_W;
    const h = chipSize.current.h || FALLBACK_H;
    const maxLeft = Math.max(0, vw - w - pad - (dockPad || 0));
    const maxTop = Math.max(0, vh - h - pad);
    return {
      left: Math.min(Math.max(p.left, pad), maxLeft),
      top: Math.min(Math.max(p.top, pad), maxTop),
    };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const el = wrapRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    chipSize.current = { w: rect.width || FALLBACK_W, h: rect.height || FALLBACK_H };
    base.current = pos ?? { top: rect.top - vv.top, left: rect.left - vv.left };

    start.current = { x: e.clientX, y: e.clientY };
    primed.current = true;
    dragging.current = false;
    wasDragging.current = false;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (primed.current && !dragging.current) {
      const dx = e.clientX - start.current.x;
      const dy = e.clientY - start.current.y;
      if (Math.hypot(dx, dy) >= DRAG_THRESHOLD) {
        dragging.current = true;
        primed.current = false;
        wrapRef.current?.setPointerCapture(e.pointerId);
      } else {
        return;
      }
    }
    if (!dragging.current) return;

    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;

    const next = clampToViewport({
      left: base.current.left + dx,
      top: base.current.top + dy,
    });

    setPos(next);
    e.preventDefault();
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging.current) {
      wrapRef.current?.releasePointerCapture(e.pointerId);
      wasDragging.current = true;
      if (pos) savePos(clampToViewport(pos));
      setTimeout(() => {
        wasDragging.current = false;
      }, 0);
    }
    dragging.current = false;
    primed.current = false;
  };

  // Re-clamp when viewport/dock changes, and snap back if ever off-screen
  useEffect(() => {
    if (!wrapRef.current) return;

    const raf = requestAnimationFrame(() => {
      const rect = wrapRef.current!.getBoundingClientRect();
      chipSize.current = {
        w: rect.width || FALLBACK_W,
        h: rect.height || FALLBACK_H,
      };

      if (pos) {
        const clamped = clampToViewport(pos);
        if (clamped.left !== pos.left || clamped.top !== pos.top) {
          setPos(clamped);
          return;
        }
      }

      const vw = vv.width || window.innerWidth;
      const vh = vv.height || window.innerHeight;
      const offscreen =
        rect.right < 8 || rect.left > vw - 8 || rect.bottom < 8 || rect.top > vh - 8;
      if (offscreen) setPos(null);
    });

    return () => cancelAnimationFrame(raf);
  }, [vv.width, vv.height, dockPad, isMobileOrTablet]);

  // Compose style
  const wrapStyle: React.CSSProperties = useMemo(() => {
    const baseTop = `calc(env(safe-area-inset-top, 0px) + ${12 + vv.top}px)`;
    const baseRight = `calc(env(safe-area-inset-right, 0px) + ${12 + dockPad}px)`;

    if (!pos) {
      const base: React.CSSProperties = {
        position: "fixed",
        zIndex: 2147483647,
        display: "flex",
        alignItems: "center",
        pointerEvents: "auto",
        top: baseTop,
        right: baseRight,
        transform: "translateZ(0)",
        willChange: "transform",
        cursor: "grab",
        touchAction: "none",
      };
      return isMobileOrTablet ? base : { ...base, transform: `translate3d(${-vv.left}px, 0, 0)` };
    }

    const topPx = pos.top + vv.top;
    const leftPx = pos.left + (isMobileOrTablet ? 0 : vv.left);

    return {
      position: "fixed",
      zIndex: 2147483647,
      display: "flex",
      alignItems: "center",
      pointerEvents: "auto",
      top: `calc(env(safe-area-inset-top, 0px) + ${topPx}px)`,
      left: `calc(env(safe-area-inset-left, 0px) + ${leftPx}px)`,
      willChange: "top, left",
      cursor: "grab",
      touchAction: "none",
    };
  }, [pos, vv.top, vv.left, dockPad, isMobileOrTablet]);

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={wrapRef}
      style={wrapStyle}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div style={seg} role="group" aria-label="Editor mode">
        <button
          type="button"
          onClick={() => {
            if (wasDragging.current) return;
            setMode("design");
          }}
          style={{ ...btn, ...(mode === "design" ? btnActive : {}) }}
          aria-pressed={mode === "design"}
        >
          Design
        </button>
        <button
          type="button"
          onClick={() => {
            if (wasDragging.current) return;
            setMode("preview");
          }}
          style={{ ...btn, ...(mode === "preview" ? btnActive : {}) }}
          aria-pressed={mode === "preview"}
        >
          Preview
        </button>
        <button
          type="button"
          onClick={async () => {
            if (wasDragging.current) return;
            setMode("golive");

            try {
              const result = await exportOverlayJsonToStorage({
                name: "overlayMap",
                includeMeta: true,
                pretty: true,
              });
              console.log("Overlay exported:", result);

              toast.success("Overlay exported successfully!");
            } catch (err) {
              console.error("Export failed", err);
              toast.error("Failed to export overlay. Please try again.");
            }
          }}
          style={{ ...btn, ...(mode === "golive" ? btnActive : {}) }}
          aria-pressed={mode === "golive"}
          aria-label="Go Live"
        >
          Go&nbsp;Live
        </button>

      </div>
    </div>,
    document.body
  );
}

/* styles */
const seg: React.CSSProperties = {
  display: "flex",
  border: "1px solid #e5e7eb",
  borderRadius: 10,
  overflow: "hidden",
  background: "#fff",
  boxShadow: "0 10px 25px rgba(0,0,0,.08)",
};
const btn: React.CSSProperties = {
  padding: "8px 14px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: 12,
  lineHeight: "18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  userSelect: "none",
  touchAction: "manipulation",
};
const btnActive: React.CSSProperties = {
  background: "#2563eb",
  color: "#fff",
  fontWeight: 600,
};
