/* Auto-generated Router (React + Vite) */
import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion, type Variants, type Transition } from "framer-motion";

import Home from "@/pages/home";
import About from "@/pages/about";
import Blog from "@/pages/blog";
import BlogSingle from "@/pages/blog-single";
import Contact from "@/pages/contact";
import Gallery from "@/pages/gallery";
import Services from "@/pages/services";
import SiteWalkThroughPage from "./pages/site-walk-through";
import { useSetBackgroundsGlobal } from "@/hooks/useSetBackgrounds";

import OverlayModeToggle from "@/components/dev/OverlayModeToggle";
import { Toaster } from "react-hot-toast";

import GlobalWrap0 from "./components/common/GlobalWrap0/GlobalWrap0";
import Navbar from "./components/common/Navbar/Navbar";
import Footer from "./components/common/Footer/Footer";

// Zustand store
import { usePreviewStore } from "src/store/previewStore";

/* ---- Page FX presets ---- */
const FX: Record<string, Variants> = {
  fade: { initial: { opacity: 0 }, enter: { opacity: 1 }, exit: { opacity: 0 } },

  slideLeft:  { initial: { x: 40,  opacity: 0 }, enter: { x: 0, opacity: 1 }, exit: { x: -40, opacity: 0 } },
  slideRight: { initial: { x: -40, opacity: 0 }, enter: { x: 0, opacity: 1 }, exit: { x: 40,  opacity: 0 } },
  slideUp:    { initial: { y: 40,  opacity: 0 }, enter: { y: 0, opacity: 1 }, exit: { y: -40, opacity: 0 } },
  slideDown:  { initial: { y: -40, opacity: 0 }, enter: { y: 0, opacity: 1 }, exit: { y: 40,  opacity: 0 } },

  fadeLeft:  { initial: { x: 24,  opacity: 0 }, enter: { x: 0, opacity: 1 }, exit: { x: -24, opacity: 0 } },
  fadeRight: { initial: { x: -24, opacity: 0 }, enter: { x: 0, opacity: 1 }, exit: { x: 24,  opacity: 0 } },
  fadeUp:    { initial: { y: 24,  opacity: 0 }, enter: { y: 0, opacity: 1 }, exit: { y: -24, opacity: 0 } },
  fadeDown:  { initial: { y: -24, opacity: 0 }, enter: { y: 0, opacity: 1 }, exit: { y: 24,  opacity: 0 } },

  zoomIn:  { initial: { scale: 0.94, opacity: 0 }, enter: { scale: 1, opacity: 1 }, exit: { scale: 0.98, opacity: 0 } },
  zoomOut: { initial: { scale: 1.06, opacity: 0 }, enter: { scale: 1, opacity: 1 }, exit: { scale: 1.02, opacity: 0 } },
  scaleIn: { initial: { scale: 0.9,  opacity: 0 }, enter: { scale: 1, opacity: 1 }, exit: { scale: 0.9,  opacity: 0 } },
  scaleOut:{ initial: { scale: 1.1,  opacity: 0 }, enter: { scale: 1, opacity: 1 }, exit: { scale: 1.1,  opacity: 0 } },

  rotateIn:  { initial: { rotate: -6, opacity: 0 }, enter: { rotate: 0, opacity: 1 }, exit: { rotate: 6,  opacity: 0 } },
  rotateOut: { initial: { rotate: 6,  opacity: 0 }, enter: { rotate: 0, opacity: 1 }, exit: { rotate: -6, opacity: 0 } },

  flipX: {
    initial: { rotateX: -90, opacity: 0, transformPerspective: 1000 },
    enter:   { rotateX: 0,   opacity: 1, transformPerspective: 1000 },
    exit:    { rotateX: 90,  opacity: 0, transformPerspective: 1000 },
  },
  flipY: {
    initial: { rotateY: -90, opacity: 0, transformPerspective: 1000 },
    enter:   { rotateY: 0,   opacity: 1, transformPerspective: 1000 },
    exit:    { rotateY: 90,  opacity: 0, transformPerspective: 1000 },
  },

  blurIn:  { initial: { opacity: 0, filter: "blur(8px)" }, enter: { opacity: 1, filter: "blur(0px)" }, exit: { opacity: 0, filter: "blur(8px)" } },
  blurOut: { initial: { opacity: 0, filter: "blur(2px)" }, enter: { opacity: 1, filter: "blur(0px)" }, exit: { opacity: 0, filter: "blur(2px)" } },
};

function AnimatedRoutes() {
  const location = useLocation();

  // Respect user's motion preference
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // Choose FX: ?anim=..., ?fx=..., <html data-page-fx="...">, or localStorage("pageFx")
  const search = location.search;
  const fxName =
    new URLSearchParams(search).get("anim") ||
    new URLSearchParams(search).get("fx") ||
    document.documentElement.dataset.pageFx ||
    localStorage.getItem("pageFx") ||
    "zoomIn";

  const variants = FX[fxName] || FX.zoomIn;

  const transition: Transition =
    fxName.startsWith("slide") || fxName.startsWith("flip")
      ? { type: "spring", stiffness: 260, damping: 30 }
      : { type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] };

  // Prevent horizontal scrollbar during slides
  useEffect(() => {
    if (fxName.startsWith("slide") || fxName.startsWith("flip")) {
      const prev = document.documentElement.style.overflowX;
      document.documentElement.style.overflowX = "hidden";
      return () => {
        document.documentElement.style.overflowX = prev;
      };
    }
  }, [fxName]);

  const routeKey = location.pathname + location.search + location.hash;

  return (
    <AnimatePresence mode="wait" initial={!prefersReduced}>
      <motion.main
        key={routeKey}
        initial={prefersReduced ? false : "initial"}
        animate={prefersReduced ? undefined : "enter"}
        exit={prefersReduced ? undefined : "exit"}
        variants={variants}
        transition={transition}
        style={{ willChange: "opacity, transform, filter" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-single" element={<BlogSingle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/services" element={<Services />} />
          <Route path="/walkthrough" element={<SiteWalkThroughPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  const resetToDefaults = usePreviewStore((s) => s.resetToDefaults);

  // DEV ONLY: Reset preview store on mount
  useEffect(() => {
    resetToDefaults();
    console.warn("🧼 Store reset to preview defaults (dev only)");
  }, [resetToDefaults]);

  useSetBackgroundsGlobal();

  return (
    <BrowserRouter>
      <OverlayModeToggle />
      <GlobalWrap0 />
      <Navbar />

      {/* Animated route outlet */}
      <AnimatedRoutes />

      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#111",
            color: "#fff",
            fontSize: "14px",
            borderRadius: "8px",
            padding: "12px 16px",
          },
        }}
      />
    </BrowserRouter>
  );
}
