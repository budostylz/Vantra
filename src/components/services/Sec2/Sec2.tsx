import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

const Sec2: React.FC = () => {
  // Overlay wiring (auto-injected)
  const ROUTE = "/services";
  const OVERLAY_KEY = "sec2";
  const { text, links, images } = useOverlay(ROUTE, OVERLAY_KEY);

  // ---- ftco-animate mimic (IntersectionObserver + stagger) ----
  const sectionRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const apply = (el: HTMLElement) => {
      const eff = (el.getAttribute("data-animate-effect") || "").trim();
      if (eff === "fadeIn") el.classList.add("fadeIn", "ftco-animated");
      else if (eff === "fadeInLeft") el.classList.add("fadeInLeft", "ftco-animated");
      else if (eff === "fadeInRight") el.classList.add("fadeInRight", "ftco-animated");
      else el.classList.add("fadeInUp", "ftco-animated"); // default
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
  // --------------------------------------------------------------

  // React-controlled tabs (no BS data-toggle)
  const [active, setActive] = useState(0);

  const items = [
    {
      id: "services-1",
      pillText: links[0]?.text ?? "House Washing",
      img:
        images[0]?.src ??
        "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/services-1.jpg",
      title: links[6]?.text ?? "House Washing",
      href: links[6]?.href ?? "#",
      desc:
        text[8]?.value ??
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia...",
    },
    {
      id: "services-2",
      pillText: links[1]?.text ?? "Roof Cleaning",
      img:
        images[1]?.src ??
        "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/services-2.jpg",
      title: links[7]?.text ?? "Roof Cleaning",
      href: links[7]?.href ?? "#",
      desc:
        text[10]?.value ??
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia...",
    },
    {
      id: "services-3",
      pillText: links[2]?.text ?? "Driveway Cleaning",
      img:
        images[2]?.src ??
        "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/services-3.jpg",
      title: links[8]?.text ?? "Driveway Cleaning",
      href: links[8]?.href ?? "#",
      desc:
        text[12]?.value ??
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia...",
    },
    {
      id: "services-4",
      pillText: links[3]?.text ?? "Gutter Cleaning",
      img:
        images[3]?.src ??
        "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/services-4.jpg",
      title: links[9]?.text ?? "Gutter Cleaning",
      href: links[9]?.href ?? "#",
      desc:
        text[14]?.value ??
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia...",
    },
    {
      id: "services-5",
      pillText: links[4]?.text ?? "Patio Cleaning",
      img:
        images[4]?.src ??
        "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/services-5.jpg",
      title: links[10]?.text ?? "Patio Cleaning",
      href: links[10]?.href ?? "#",
      desc:
        text[16]?.value ??
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia...",
    },
    {
      id: "services-6",
      pillText: links[5]?.text ?? "Building Cleaning",
      img:
        images[5]?.src ??
        "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/services-6.jpg",
      title: links[11]?.text ?? "Building Cleaning",
      href: links[11]?.href ?? "#",
      desc:
        text[18]?.value ??
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia...",
    },
  ];

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <>
      <section ref={sectionRef} className="ftco-section">
        <div className="container">
          <div className="row justify-content-center pb-5">
            <div className="col-md-7 heading-section text-center ftco-animate">
              <h2>{text[0]?.value ?? "Before & After Services"}</h2>
            </div>
          </div>

          <div className="row tabulation mt-4 ftco-animate">
            {/* Right-side pills */}
            <div className="col-md-4 order-md-last">
              <ul className="nav nav-pills nav-fill d-md-flex d-block flex-column" role="tablist">
                {items.map((it, idx) => (
                  <li className="nav-item text-left" key={it.id}>
                    <a
                      href={`#${it.id}`}
                      className={`nav-link py-4 ${active === idx ? "active" : ""}`}
                      role="tab"
                      aria-selected={active === idx}
                      onClick={(e) => {
                        e.preventDefault();
                        setActive(idx);
                      }}
                    >
                      {it.pillText}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Left-side content */}
            <div className="col-md-8">
              <div className="tab-content" style={{ position: "relative" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    className="tab-pane container p-0 active"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease }}
                  >
                    <motion.div
                      className="img"
                      style={{ backgroundImage: `url(${items[active].img})` }}
                      initial={{ scale: 0.985, opacity: 0.9 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.985, opacity: 0.9 }}
                      transition={{ duration: 0.35, ease }}
                    />
                    <motion.h3
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease }}
                    >
                      <a href={items[active].href}>{items[active].title}</a>
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3, ease }}
                    >
                      {items[active].desc}
                    </motion.p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editor */}
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

export default Sec2;
