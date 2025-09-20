import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

/** Tiny inline chat-bubble icon (no FA dependency) */
const ChatIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M20 2H4a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h10.6l3.7 2.78a1 1 0 0 0 1.6-.8V19h0A3 3 0 0 0 23 16V5a3 3 0 0 0-3-3Z" />
  </svg>
);

export default function Sec1() {
  const ROUTE = "/blog";
  const OVERLAY_KEY = "sec1";
  const { text, links, images } = useOverlay(ROUTE, OVERLAY_KEY);

  // internal destination helper (falls back to blog-single)
  const toBlogSingle = (maybe: string | undefined) =>
    maybe && /^https?:\/\//i.test(maybe) ? maybe : "/blog-single";

  // --- ftco-animate mimic (IntersectionObserver + stagger) ---
  const sectionRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const apply = (el: HTMLElement) => {
      const eff = (el.getAttribute("data-animate-effect") || "").trim();
      if (eff === "fadeIn") el.classList.add("fadeIn", "ftco-animated");
      else if (eff === "fadeInLeft") el.classList.add("fadeInLeft", "ftco-animated");
      else if (eff === "fadeInRight") el.classList.add("fadeInRight", "ftco-animated");
      else el.classList.add("fadeInUp", "ftco-animated");
      el.classList.remove("item-animate");
    };

    const batch = () => {
      Array.from(root.querySelectorAll<HTMLElement>(".ftco-animate.item-animate")).forEach((el, i) =>
        setTimeout(() => apply(el), i * 50)
      );
    };

    const io = new IntersectionObserver(
      (entries) => {
        let queued = false;
        entries.forEach((e) => {
          const el = e.target as HTMLElement;
          if (e.isIntersecting && !el.classList.contains("ftco-animated")) {
            el.classList.add("item-animate");
            queued = true;
          }
        });
        if (queued) setTimeout(batch, 100);
      },
      { root: null, rootMargin: "0px 0px -5% 0px", threshold: 0 }
    );

    Array.from(root.querySelectorAll<HTMLElement>(".ftco-animate")).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  // ------------------------------------------------------------

  // put this near the top of the file
  const HIRING_FLYER =
    encodeURI(
      "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/users/GLelFyrkvyMnLPTfOFY2xS6QT3t2/vantra-qSKe8jlhMtNvudBqrdmcYljQMM42/img/Blue And Yellow Modern We Are Hiring Flyer.png"
    );



  return (
    <>

      {/* Centered flyer */}
      <section className="ftco-section bg-light" ref={sectionRef}>
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={HIRING_FLYER}
            alt="We Are Hiring — Vantra Building Services"
            style={{
              display: "block",
              width: "100%",
              maxWidth: 860,          // tweak as needed
              height: "auto",
              borderRadius: 12,
              boxShadow: "0 10px 30px rgba(15,24,65,.12)",
            }}
            className="ftco-animate"
            data-animate-effect="fadeInUp"
          />
        </div>
      </section>



      {/* Editor panel */}
      <div className="container mt-6">
        <div
          style={{
            position: "sticky",
            top: "calc(env(safe-area-inset-top, 0px) + 12px)",
            zIndex: 10,
            maxHeight: "calc(100svh - 16px)",
            overflowY: "auto",
            overflowX: "hidden",
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",
            paddingBottom: 8,
            maxWidth: "100%",
          }}
        >
          <OverlayEditor route={ROUTE} overlayKey={OVERLAY_KEY} />
        </div>
      </div>
    </>
  );
}
