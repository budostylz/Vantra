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

  // --- BASENAME helpers (Vite supplies BASE_URL; prod = "/tenant/", dev = "/") ---
  const BASE = (import.meta.env.BASE_URL || "/").replace(/\/$/, ""); // no trailing slash
  const withBase = (href?: string) => {
    if (!href) return BASE || "/";
    if (/^https?:\/\//i.test(href)) return href; // external
    const p = href.startsWith("/") ? href : `/${href}`;
    // avoid double-prefix if already has BASE
    return p === BASE || p.startsWith(`${BASE}/`) ? p : `${BASE}${p}`;
  };

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

  // --- Active route helpers (sticky highlight) ---
  const normalizePath = (href: string) => {
    try {
      const u = new URL(href, window.location.origin);
      let p = u.pathname || "/";
      p = p.replace(/index\.html?$/i, "/").replace(/\.html?$/i, "");
      p = p.replace(/\/+$/g, "");
      return (p || "/").toLowerCase();
    } catch {
      return "/";
    }
  };

  const [activePath, setActivePath] = useState<string>(() =>
    normalizePath(window.location.pathname)
  );

  useEffect(() => {
    const sync = () => setActivePath(normalizePath(window.location.pathname));
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  const markActiveAndMaybeClose = (href?: string) => {
    if (href) setActivePath(normalizePath(withBase(href)));
    handleItemClick();
  };
  const isActive = (href?: string) =>
    normalizePath(withBase(href || "/")) === activePath;

  // FA fallback detection (shows ≡/× if FA CSS not loaded)
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const [useFallbackIcon, setUseFallbackIcon] = useState(false);
  useEffect(() => {
    if (!iconRef.current) return;
    const before = window.getComputedStyle(iconRef.current, "::before").content;
    if (!before || before === "none" || before === "normal" || before === '""') {
      setUseFallbackIcon(true);
    } else {
      setUseFallbackIcon(false);
    }
  }, [isMobileOrTablet, open]);

  // convenience defaults (raw paths; we prefix when rendering)
  const H_HOME = links[1]?.href ?? "/";
  const H_ABOUT = links[2]?.href ?? "/about";
  const H_SERVICES = links[3]?.href ?? "/services";
  const H_GALLERY = links[4]?.href ?? "/gallery";
  const H_BLOG = links[5]?.href ?? "/blog";
  const H_CONTACT = links[6]?.href ?? "/contact";

  const SERVICES = [
    { icon: "🔍", label: "Smart Site Walkthrough + AI Estimator", href: "/walkthrough" },
    { icon: "💰", label: "On-Site Pricing Calculator", href: "/calculator" },
    { icon: "🧾", label: "Real-Time Quote Generator", href: "/generator" },
    { icon: "📃", label: "Smart Contract Builder", href: "/contract" },
    { icon: "📸", label: "Photo Documentation + Job History", href: "/photodocsandhistory" },
    { icon: "🧠", label: "AI-Driven CRM", href: "/crm" },
    { icon: "🎙️", label: "Voice Notes + Observations", href: "/voiceandobservations" },
  ];

  const [servicesOpen, setServicesOpen] = useState(false);        // desktop dropdown
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false); // mobile accordion
  const servicesActive = SERVICES.some((s) => isActive(s.href));

  const servicesRef = useRef<HTMLLIElement | null>(null);
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
        <div className="container">
          <a
            className="navbar-brand"
            href={withBase(links[0]?.href ?? "/")}
            onClick={() => markActiveAndMaybeClose(links[0]?.href ?? "/")}
          >
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
                <li className={`nav-item ${isActive(H_HOME) ? "active" : ""}`}>
                  <a href={withBase(H_HOME)} className="nav-link" onClick={() => markActiveAndMaybeClose(H_HOME)}>
                    {links[1]?.text ?? "Home"}
                  </a>
                </li>
                <li className={`nav-item ${isActive(H_ABOUT) ? "active" : ""}`}>
                  <a href={withBase(H_ABOUT)} className="nav-link" onClick={() => markActiveAndMaybeClose(H_ABOUT)}>
                    {links[2]?.text ?? "About"}
                  </a>
                </li>

                <li
                  className={`nav-item ${servicesActive ? "active" : ""}`}
                  onMouseEnter={() => setServicesOpen(true)}
                  style={{ position: "relative" }}
                  ref={servicesRef}
                >
                  <a
                    href={withBase(H_SERVICES)}
                    className="nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setServicesOpen((v) => !v);
                    }}
                    aria-expanded={servicesOpen}
                    style={{ display: "inline-flex", alignItems: "center" }}
                  >
                    {links[3]?.text ?? "Services"}
                    <span aria-hidden="true" style={{ marginLeft: 6, fontSize: "0.85em" }}>▾</span>
                  </a>

                  {/* Dropdown */}
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      display: servicesOpen ? "block" : "none",
                      marginTop: 0,
                      minWidth: 260,
                      background: "#fff",
                      borderRadius: 8,
                      boxShadow: "0 10px 28px rgba(0,0,0,.15)",
                      padding: "8px 0",
                      zIndex: 1050
                    }}
                  >
                    {SERVICES.map(({ icon, label, href }) => (
                      <a
                        key={href}
                        href={withBase(href)}
                        className="dropdown-item"
                        onClick={() => {
                          markActiveAndMaybeClose(href);
                          setServicesOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 16px",
                          textDecoration: "none",
                          color: "#212529",
                          whiteSpace: "nowrap"
                        }}
                      >
                        <span aria-hidden="true" style={{ width: 20, textAlign: "center" }}>{icon}</span>
                        <span>{label}</span>
                      </a>
                    ))}
                  </div>
                </li>

                <li className={`nav-item ${isActive(H_GALLERY) ? "active" : ""}`}>
                  <a href={withBase(H_GALLERY)} className="nav-link" onClick={() => markActiveAndMaybeClose(H_GALLERY)}>
                    {links[4]?.text ?? "Gallery"}
                  </a>
                </li>
                <li className={`nav-item ${isActive(H_BLOG) ? "active" : ""}`}>
                  <a href={withBase(H_BLOG)} className="nav-link" onClick={() => markActiveAndMaybeClose(H_BLOG)}>
                    {links[5]?.text ?? "Blog"}
                  </a>
                </li>
                <li className={`nav-item ${isActive(H_CONTACT) ? "active" : ""}`}>
                  <a href={withBase(H_CONTACT)} className="nav-link" onClick={() => markActiveAndMaybeClose(H_CONTACT)}>
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
                    <li className={`nav-item ${isActive(H_HOME) ? "active" : ""}`}>
                      <a href={withBase(H_HOME)} className="nav-link" onClick={() => markActiveAndMaybeClose(H_HOME)}>
                        {links[1]?.text ?? "Home"}
                      </a>
                    </li>
                    <li className={`nav-item ${isActive(H_ABOUT) ? "active" : ""}`}>
                      <a href={withBase(H_ABOUT)} className="nav-link" onClick={() => markActiveAndMaybeClose(H_ABOUT)}>
                        {links[2]?.text ?? "About"}
                      </a>
                    </li>

                    <li className={`nav-item ${servicesActive ? "active" : ""}`}>
                      <a
                        href={withBase(H_SERVICES)}
                        className="nav-link"
                        role="button"
                        aria-expanded={mobileServicesOpen}
                        aria-controls="mobile-services-submenu"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMobileServicesOpen(v => !v); }}
                        style={{ color: "black" }}
                      >
                        <span>{links[3]?.text ?? "Services"}</span>
                        <span aria-hidden="true" style={{ marginLeft: 8 }}>{mobileServicesOpen ? "–" : "+"}</span>
                      </a>

                      {/* Submenu */}
                      <AnimatePresence initial={false}>
                        {mobileServicesOpen && (
                          <motion.ul
                            id="mobile-services-submenu"
                            className="navbar-nav"
                            initial={{ height: 0, opacity: 0, y: -4 }}
                            animate={{ height: "auto", opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: -4 }}
                            transition={{ duration: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{ overflow: "hidden", margin: 0, padding: "0 0 0 12px" }}
                          >
                            {SERVICES.map(({ icon, label, href }) => (
                              <li key={href} className={`nav-item ${isActive(href) ? "active" : ""}`}>
                                <a
                                  href={withBase(href)}
                                  className="nav-link"
                                  onClick={(e) => { e.stopPropagation(); markActiveAndMaybeClose(href); setMobileServicesOpen(false); }}
                                  style={{ display: "flex", alignItems: "center", padding: ".5rem 1rem", textDecoration: "none", color: "inherit" }}
                                >
                                  <span aria-hidden="true" style={{ marginRight: 8 }}>{icon}</span>
                                  {label}
                                </a>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>

                    <li className={`nav-item ${isActive(H_GALLERY) ? "active" : ""}`}>
                      <a href={withBase(H_GALLERY)} className="nav-link" onClick={() => markActiveAndMaybeClose(H_GALLERY)}>
                        {links[4]?.text ?? "Gallery"}
                      </a>
                    </li>
                    <li className={`nav-item ${isActive(H_BLOG) ? "active" : ""}`}>
                      <a href={withBase(H_BLOG)} className="nav-link" onClick={() => markActiveAndMaybeClose(H_BLOG)}>
                        {links[5]?.text ?? "Blog"}
                      </a>
                    </li>
                    <li className={`nav-item ${isActive(H_CONTACT) ? "active" : ""}`}>
                      <a href={withBase(H_CONTACT)} className="nav-link" onClick={() => markActiveAndMaybeClose(H_CONTACT)}>
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
