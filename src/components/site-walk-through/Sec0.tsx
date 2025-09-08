import React, { useEffect, useRef } from "react";

type Feature = {
  key: string;
  icon: string;
  title: string;
  desc: string;
  note?: string;
};

const FEATURES: Feature[] = [
  {
    key: "camera",
    icon: "📹",
    title: "Live Camera Scan",
    desc:
      "Use the device camera (getUserMedia) to scan the site. Run in-browser YOLOv8 + MiDaS for object + depth. Optional bridge to ARCore (Capacitor) for accurate square footage.",
    note: "Requires camera permission",
  },
  {
    key: "room",
    icon: "🏠",
    title: "Auto Room Detection",
    desc:
      "Identify room type using YOLO or Grounding DINO + Segment Anything. Use prompts like “stove/sink/toilet” to auto-tag kitchen or bath.",
  },
  {
    key: "debris",
    icon: "🧪",
    title: "Debris + Material Detection",
    desc:
      "Fine-tuned YOLO/classifier to detect drywall dust, tape, overspray, residue. Train on real site image examples.",
  },
  {
    key: "measure",
    icon: "📏",
    title: "Auto Measure",
    desc:
      "ARCore + WebXR hit-testing to place anchors and measure. Fallback: detect door/tile, infer scale, estimate dimensions.",
  },
];

const APP_HREF = "/walkthrough-app"; // change if your app entry is different

const s = {
  section: {
    maxWidth: 980,
    margin: "24px auto",
    padding: "16px",
  } as React.CSSProperties,
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 12,
  } as React.CSSProperties,
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    minWidth: 0,
  } as React.CSSProperties,
  h2: { margin: 0, fontSize: 22, fontWeight: 700 } as React.CSSProperties,
  subtitle: { color: "#555", fontSize: 14 } as React.CSSProperties,

  list: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    margin: 0,
    padding: 0,
    listStyle: "none",
  } as React.CSSProperties,

  row: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    border: "1px solid #e6e6e6",
    borderRadius: 12,
    padding: 14,
    background: "#fff",
  } as React.CSSProperties,

  icon: {
    fontSize: 24,
    lineHeight: 1,
    width: 28,
    textAlign: "center",
    userSelect: "none",
    flex: "0 0 auto",
  } as React.CSSProperties,

  title: { margin: 0, fontSize: 16, fontWeight: 700 } as React.CSSProperties,
  desc: {
    margin: "6px 0 0 0",
    color: "#333",
    fontSize: 14,
    lineHeight: 1.4,
  } as React.CSSProperties,

  note: { color: "#888", fontSize: 12, marginTop: 6 } as React.CSSProperties,

  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #111",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 600,
    whiteSpace: "nowrap",
  } as React.CSSProperties,

  footer: {
    marginTop: 16,
    color: "#444",
    fontSize: 13,
  } as React.CSSProperties,

  code: {
    background: "#f5f5f5",
    borderRadius: 6,
    padding: "2px 6px",
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    fontSize: 12,
  } as React.CSSProperties,
};

const Sec0: React.FC = () => {
  const open = (href: string) => {
    window.location.assign(href);
  };

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
  

  return (

    <>
     <section
        ref={sectionRef}
        className="hero-wrap hero-wrap-2"
        style={{
          backgroundImage: `url(${
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
                  <a href={"/"}>
                    {"Home"} <i className="ion-ios-arrow-forward"></i>
                  </a>
                </span>
                <span>
                  {"Services"} <i className="ion-ios-arrow-forward"></i>
                </span>
              </p>
              <h1 className="mb-0 bread">{"Smart Site Walkthrough + AI Estimator"}</h1>
            </div>
          </div>
        </div>
      </section>
          <section style={s.section} aria-label="Smart Site Walkthrough features">
      <header style={s.header}>
        <div style={s.headerLeft}>
          <span aria-hidden="true" style={{ fontSize: 22 }}>🔍</span>
          <div>
            <h2 style={s.h2}>Smart Site Walkthrough + AI Estimator</h2>
            <div style={s.subtitle}>Feature overview</div>
          </div>
        </div>
        <a href={APP_HREF} onClick={(e) => { e.preventDefault(); open(APP_HREF); }} style={s.button}>
          Open App
        </a>
      </header>

      <ul style={s.list}>
        {FEATURES.map((f) => (
          <li key={f.key} style={s.row}>
            <span aria-hidden="true" style={s.icon}>{f.icon}</span>
            <div style={{ minWidth: 0 }}>
              <h3 style={s.title}>{f.title}</h3>
              <p style={s.desc}>{f.desc}</p>
              {f.note && <div style={s.note}>{f.note}</div>}
            </div>
          </li>
        ))}
      </ul>

      <div style={s.footer}>
        <span role="img" aria-label="tools">🛠</span> <strong>Deliverable:</strong>{" "}
        <code style={s.code}>SiteScanCanvas</code> component +{" "}
        <code style={s.code}>RoomScanService</code> backend handler.
      </div>
    </section>
    
    </>

  );
};

export default Sec0;
