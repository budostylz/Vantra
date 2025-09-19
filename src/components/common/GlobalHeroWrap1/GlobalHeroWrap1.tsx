import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

export default function GlobalHeroWrap1() {
  // Overlay wiring (auto-injected)
  const ROUTE = "global";
  const OVERLAY_KEY = "globalHeroWrap1";
  const { node: globalHeroWrap1Overlay, text, links, images, variables } = useOverlay(ROUTE, OVERLAY_KEY);

  // Parallax: animate background position of the hero
  const heroRef = useRef<HTMLDivElement | null>(null);
  const bgUrl =
    images[0]?.src ??
    "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/bg_1.jpg";

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"], // 0 when hero hits top, 1 when it scrolls past
  });

  // Move background upwards as user scrolls (tweak -200 to taste)
  const bgShift = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const bgPos = useMotionTemplate`center ${bgShift}px`;

  return (
    <>
      <motion.div
        ref={heroRef}
        className="hero-wrap"
        style={{ backgroundImage: `url(${bgUrl})`, backgroundPosition: bgPos }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay"></div>
        <div className="container">
          <div
            className="row no-gutters slider-text align-items-center justify-content-end"
            data-scrollax-parent="true"
          >
            <div className="col-md-6">
              <h1 className="mb-4">
                {text[0]?.value ?? "Professional"} <span>{text[1]?.value ?? "Pressure"}</span>
                <span>{text[2]?.value ?? "Washing"}</span> {text[3]?.value ?? "Services"}
              </h1>
              <p>
                <a href={links[0]?.href ?? "/service-cart-page"} className="btn btn-secondary mr-md-4 py-3 px-4">
                  {links[0]?.text ?? "Learn more"} <span className="ion-ios-arrow-forward"></span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

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
