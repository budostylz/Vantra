import React, { useEffect, useRef } from "react";
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

export default function Sec0() {
  // Overlay wiring (auto-injected)
  const ROUTE = "/blog";
  const OVERLAY_KEY = "sec0";
  const { node: sec0Overlay, text, links, images } = useOverlay(ROUTE, OVERLAY_KEY);

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

    const processBatch = () => {
      const batch = Array.from(root.querySelectorAll<HTMLElement>(".ftco-animate.item-animate"));
      batch.forEach((el, k) => setTimeout(() => apply(el), k * 50));
    };

    const io = new IntersectionObserver(
      (entries) => {
        let queued = false;
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting && !el.classList.contains("ftco-animated")) {
            el.classList.add("item-animate");
            queued = true;
          }
        });
        if (queued) setTimeout(processBatch, 100);
      },
      { root: null, rootMargin: "0px 0px -5% 0px", threshold: 0 }
    );

    Array.from(root.querySelectorAll<HTMLElement>(".ftco-animate")).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  // ------------------------------------------------------------

  return (
    <>
      <section
        ref={sectionRef}
        className="hero-wrap hero-wrap-2"
        style={{
          backgroundImage: `url(${
            images[0]?.src ??
            "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/bg_2.jpg"
          })`,
        }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text align-items-end">
            <div className="col-md-9 ftco-animate pb-5" data-animate-effect="fadeInUp">
              <p className="breadcrumbs mb-2">
                <span className="mr-2">
                  <a href={links[0]?.href ?? "index.html"}>
                    {links[0]?.text ?? "Home"} <i className="ion-ios-arrow-forward"></i>
                  </a>
                </span>
                <span>
                  {text[1]?.value ?? "Blog"} <i className="ion-ios-arrow-forward"></i>
                </span>
              </p>
              <h1 className="mb-0 bread">{text[2]?.value ?? "Our Blog"}</h1>
            </div>
          </div>
        </div>
      </section>

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
