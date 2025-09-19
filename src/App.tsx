// src/App.tsx
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
import AuthBridge from "@/pages/auth-bridge";
import SiteWalkThroughPage from "./pages/site-walk-through";
import CalculatorPage from "./pages/calculator";
import GeneratorPage from "./pages/generator";
import ContractPage from "./pages/contract";
import PhotoDocAndHistoryPage from "./pages/photo-doc-and-history";
import CRMPage from "./pages/crm";
import VoiceAndObservationsPage from "./pages/voice-and-observations";
import WalkthroughApp from "./pages/walkthrough";

import { useSetBackgroundsGlobal } from "@/hooks/useSetBackgrounds";

import OverlayModeToggle from "@/components/dev/OverlayModeToggle";
import { Toaster } from "react-hot-toast";

import GlobalWrap0 from "./components/common/GlobalWrap0/GlobalWrap0";
import Navbar from "./components/common/Navbar/Navbar";
import Footer from "./components/common/Footer/Footer";

import { usePreviewStore } from "@/store/previewStore";


// If you ever enable this again, keep it client-only.
// import { usePreviewStore } from "src/store/previewStore";

/* ---- Page FX presets ---- */
const FX: Record<string, Variants> = {
  fade: { initial: { opacity: 0 }, enter: { opacity: 1 }, exit: { opacity: 0 } },
  slideLeft: { initial: { x: 40, opacity: 0 }, enter: { x: 0, opacity: 1 }, exit: { x: -40, opacity: 0 } },
  slideRight: { initial: { x: -40, opacity: 0 }, enter: { x: 0, opacity: 1 }, exit: { x: 40, opacity: 0 } },
  slideUp: { initial: { y: 40, opacity: 0 }, enter: { y: 0, opacity: 1 }, exit: { y: -40, opacity: 0 } },
  slideDown: { initial: { y: -40, opacity: 0 }, enter: { y: 0, opacity: 1 }, exit: { y: 40, opacity: 0 } },
  zoomIn: { initial: { scale: 0.94, opacity: 0 }, enter: { scale: 1, opacity: 1 }, exit: { scale: 0.98, opacity: 0 } },
  zoomOut: { initial: { scale: 1.06, opacity: 0 }, enter: { scale: 1, opacity: 1 }, exit: { scale: 1.02, opacity: 0 } },
  flipX: {
    initial: { rotateX: -90, opacity: 0, transformPerspective: 1000 },
    enter: { rotateX: 0, opacity: 1, transformPerspective: 1000 },
    exit: { rotateX: 90, opacity: 0, transformPerspective: 1000 },
  },
};

function dumpOverlayMap() {
  const map = usePreviewStore.getState().overlayMap;
  // pretty-print to the console
  console.log("overlayMap →", JSON.stringify(map, null, 2));
  return map; // in case you want to use it programmatically
}

function MainRoutes() {
  const location = useLocation();
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const search = location.search;
  const fxName =
    new URLSearchParams(search).get("anim") ||
    new URLSearchParams(search).get("fx") ||
    (typeof document !== "undefined" ? document.documentElement.dataset.pageFx : undefined) ||
    (typeof localStorage !== "undefined" ? localStorage.getItem("pageFx") : null) ||
    "zoomIn";

  const variants = FX[fxName] || FX.zoomIn;

  const transition: Transition =
    fxName.startsWith("slide") || fxName.startsWith("flip")
      ? { type: "spring", stiffness: 260, damping: 30 }
      : { type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] };

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
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/generator" element={<GeneratorPage />} />
          <Route path="/contract" element={<ContractPage />} />
          <Route path="/photodocsandhistory" element={<PhotoDocAndHistoryPage />} />
          <Route path="/crm" element={<CRMPage />} />
          <Route path="/voiceandobservations" element={<VoiceAndObservationsPage />} />
          <Route path="/auth-bridge" element={<AuthBridge />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

/** Compute a safe basename from Vite's BASE_URL.
 *  - "/" or "./"  -> "/"
 *  - "/foo/"      -> "/foo"
 */
function getBaseName(): string {
  const raw = import.meta?.env?.BASE_URL ?? "/";
  if (raw === "/" || raw === "./" || raw === "") return "/";
  try {
    const pathname = new URL(raw, typeof window !== "undefined" ? window.location.origin : "http://localhost").pathname;
    return pathname.replace(/\/$/, "") || "/";
  } catch {
    return "/";
  }
}

export default function App() {
  // const resetToDefaults = usePreviewStore((s) => s.resetToDefaults);
  // useEffect(() => { if (import.meta.env.DEV) resetToDefaults(); }, [resetToDefaults]);


  /*
  const resetToDefaults = usePreviewStore((state) => state.resetToDefaults);

  // DEV ONLY: reset preview store on mount
  useEffect(() => {
    if (import.meta.env.DEV) {
      resetToDefaults();
      console.warn("🧼 Store reset to preview defaults (dev only)");
    }
  }, [resetToDefaults]);
  */

  dumpOverlayMap();

  useSetBackgroundsGlobal();


  const BASENAME = getBaseName();

  return (
    <BrowserRouter basename={BASENAME}>
      <Routes>
        {/* Standalone Walkthrough App (still under the basename) */}
        <Route path="/walkthrough-app" element={<WalkthroughApp />} />

        {/* Main Site App */}
        <Route
          path="*"
          element={
            <>
              <OverlayModeToggle />
              <GlobalWrap0 />
              <Navbar />
              <MainRoutes />
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
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
