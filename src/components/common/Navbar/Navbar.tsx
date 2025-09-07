import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

const Navbar: React.FC = () => {
  // Overlay wiring (auto-injected)
  const ROUTE = "global";
  const OVERLAY_KEY = "navbar";
  const { node: navbarOverlay, text, links } = useOverlay(ROUTE, OVERLAY_KEY);

  const [open, setOpen] = useState(false);
  const [animating, setAnimating] = useState(false);

  // Device detection
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false); // >= lg

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

  useEffect(() => {
    if (isDesktop) {
      setOpen(false);
      setAnimating(false);
    }
  }, [isDesktop]);

  const toggle = () => {
    if (open) setAnimating(true);
    setOpen((v) => !v);
  };
  const handleItemClick = () => {
    if (!isDesktop) {
      setAnimating(true);
      setOpen(false);
    }
  };

  // FA fallback detection (shows ≡/× if FA CSS not loaded)
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const [useFallbackIcon, setUseFallbackIcon] = useState(false);
  useEffect(() => {
    if (!iconRef.current) return;
    const before = window.getComputedStyle(iconRef.current, "::before").content;
    // If FA isn't loaded, content is often 'none', 'normal', or '""'
    if (!before || before === "none" || before === "normal" || before === '""') {
      setUseFallbackIcon(true);
    } else {
      setUseFallbackIcon(false);
    }
  }, [isMobileOrTablet, open]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
        <div className="container">
          <a className="navbar-brand" href={links[0]?.href ?? "index.html"}>
            {links[0]?.text ?? "Pressure"} <span>{text[1]?.value ?? "Washing"}</span>
          </a>

          <button
            className={`navbar-toggler ${open ? "" : "collapsed"}`}
            type="button"
            data-toggle="collapse"
            data-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded={isDesktop ? true : open}
            aria-label={open ? "Close navigation" : "Toggle navigation"}
            onClick={toggle}
          >
            {isMobileOrTablet && (
              <>
                <span
                  ref={iconRef}
                  className={`fa ${open ? "fa-times" : "fa-bars"}`}
                  aria-hidden="true"
                  style={{ marginRight: 6, display: useFallbackIcon ? "none" : "inline-block" }}
                />
                {useFallbackIcon && (
                  <span aria-hidden="true" style={{ marginRight: 6 }}>
                    {open ? "×" : "≡"}
                  </span>
                )}
              </>
            )}
            {text[2]?.value ?? "Menu"}
          </button>

          {/* Keep Bootstrap wrapper; force 'show' on desktop or while exit anim runs */}
          <div className={`collapse navbar-collapse ${open || animating || isDesktop ? "show" : ""}`} id="ftco-nav">
            {isDesktop ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href={links[1]?.href ?? "/"} className="nav-link">
                    {links[1]?.text ?? "Home"}
                  </a>
                </li>
                <li className="nav-item">
                  <a href={links[2]?.href ?? "about.html"} className="nav-link">
                    {links[2]?.text ?? "About"}
                  </a>
                </li>
                <li className="nav-item active">
                  <a href={links[3]?.href ?? "services.html"} className="nav-link">
                    {links[3]?.text ?? "Services"}
                  </a>
                </li>
                <li className="nav-item">
                  <a href={links[4]?.href ?? "gallery.html"} className="nav-link">
                    {links[4]?.text ?? "Gallery"}
                  </a>
                </li>
                <li className="nav-item">
                  <a href={links[5]?.href ?? "blog.html"} className="nav-link">
                    {links[5]?.text ?? "Blog"}
                  </a>
                </li>
                <li className="nav-item">
                  <a href={links[6]?.href ?? "contact.html"} className="nav-link">
                    {links[6]?.text ?? "Contact"}
                  </a>
                </li>
              </ul>
            ) : (
              <AnimatePresence initial={false} onExitComplete={() => setAnimating(false)}>
                {open && (
                  <motion.ul
                    className="navbar-nav ml-auto"
                    onClick={handleItemClick}
                    initial={{ height: 0, opacity: 0, y: -6 }}
                    animate={{ height: "auto", opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <li className="nav-item">
                      <a href={links[1]?.href ?? "index.html"} className="nav-link">
                        {links[1]?.text ?? "Home"}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href={links[2]?.href ?? "about.html"} className="nav-link">
                        {links[2]?.text ?? "About"}
                      </a>
                    </li>
                    <li className="nav-item active">
                      <a href={links[3]?.href ?? "services.html"} className="nav-link">
                        {links[3]?.text ?? "Services"}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href={links[4]?.href ?? "gallery.html"} className="nav-link">
                        {links[4]?.text ?? "Gallery"}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href={links[5]?.href ?? "blog.html"} className="nav-link">
                        {links[5]?.text ?? "Blog"}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href={links[6]?.href ?? "contact.html"} className="nav-link">
                        {links[6]?.text ?? "Contact"}
                      </a>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </nav>

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
};

export default Navbar;
