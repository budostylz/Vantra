/* Auto-generated Router */
import { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/home";
import About from "@/pages/about";
import Blog from "@/pages/blog";
import BlogSingle from "@/pages/blog-single";
import Contact from "@/pages/contact";
import Gallery from "@/pages/gallery";
import Services from "@/pages/services";
import { useSetBackgroundsGlobal } from "@/hooks/useSetBackgrounds";

import OverlayModeToggle from "@/components/dev/OverlayModeToggle";
import { Toaster } from 'react-hot-toast';

import GlobalWrap0 from "./components/common/GlobalWrap0/GlobalWrap0";
import Navbar from "./components/common/Navbar/Navbar";
import Footer from "./components/common/Footer/Footer";

// Zustand store
import { usePreviewStore } from 'src/store/previewStore';

export default function App() {




  const resetToDefaults = usePreviewStore((state) => state.resetToDefaults);



  // 🧪 DEV ONLY: Reset store on mount to preview defaults
  useEffect(() => {
    resetToDefaults();
    console.warn("🧼 Store reset to preview defaults (dev only)");
  }, [resetToDefaults]);





  useSetBackgroundsGlobal();
  return (
    <>
      <OverlayModeToggle />

      <GlobalWrap0 />
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-single" element={<BlogSingle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/services" element={<Services />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
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

  );
}
