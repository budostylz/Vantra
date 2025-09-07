import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

export default function Sec3() {
  // Overlay wiring (auto-injected)
  const ROUTE = "/about";
  const OVERLAY_KEY = "sec3";
  const { text, images } = useOverlay(ROUTE, OVERLAY_KEY);

  // ---- ftco-animate mimic (IO + stagger) ----
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
      const list = Array.from(root.querySelectorAll<HTMLElement>(".ftco-animate.item-animate"));
      list.forEach((el, i) => setTimeout(() => apply(el), i * 50));
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
  // ------------------------------------------------

  // ---- responsive slide width ----
  const [slidePct, setSlidePct] = useState(33.3333);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 600) setSlidePct(100);
      else if (w < 1000) setSlidePct(50);
      else setSlidePct(33.3333);
    };
    calc();
    window.addEventListener("resize", calc);
    window.addEventListener("orientationchange", calc);
    return () => {
      window.removeEventListener("resize", calc);
      window.removeEventListener("orientationchange", calc);
    };
  }, []);

  // ---- Embla carousel ----
  const [viewportRef, embla] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,           // free momentum drag
    containScroll: "keepSnaps",
    slidesToScroll: 1,
    duration: 16,
  });

  const [selected, setSelected] = useState(0);

  const handleSelect = useCallback(() => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());

    // toggle "active" on visible slides (keeps theme fade classes from Owl in check)
    const visible = embla.slidesInView();
    embla.slideNodes().forEach((node, i) => node.classList.toggle("active", visible.includes(i)));
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", handleSelect);
    embla.on("reInit", handleSelect);
    handleSelect();
    return () => {
      embla.off("select", handleSelect);
      embla.off("reInit", handleSelect);
    };
  }, [embla, handleSelect]);

  useEffect(() => {
    embla?.reInit();
  }, [embla, slidePct]);

  // ---- slides (mirrors your About template data mapping) ----
  const slides = [
    {
      img: images[0]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/person_1.jpg",
      body: text[1]?.value ?? "Far far away, behind the word mountains, far from the countries Vokalia",
      name: text[2]?.value ?? "Racky Henderson",
      role: text[3]?.value ?? "Father",
    },
    {
      img: images[1]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/person_2.jpg",
      body: text[4]?.value ?? "Far far away, behind the word mountains, far from the countries Vokalia",
      name: text[5]?.value ?? "Henry Dee",
      role: text[6]?.value ?? "Businesswoman",
    },
    {
      img: images[2]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/person_3.jpg",
      body: text[7]?.value ?? "Far far away, behind the word mountains, far from the countries Vokalia",
      name: text[8]?.value ?? "Mark Huff",
      role: text[9]?.value ?? "Businesswoman",
    },
    {
      img: images[3]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/person_4.jpg",
      body: text[10]?.value ?? "Far far away, behind the word mountains, far from the countries Vokalia",
      name: text[11]?.value ?? "Rodel Golez",
      role: text[12]?.value ?? "Businesswoman",
    },
    {
      img: images[4]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/person_1.jpg",
      body: text[13]?.value ?? "Far far away, behind the word mountains, far from the countries Vokalia",
      name: text[14]?.value ?? "Ken Bosh",
      role: text[15]?.value ?? "Businesswoman",
    },
  ];

  return (
    <>
      <section ref={sectionRef} className="ftco-section testimony-section bg-light">
        <div className="overlay"></div>
        <div className="container">
          <div className="row justify-content-center pb-5">
            <div className="col-md-7 heading-section text-center ftco-animate">
              <h2>{text[0]?.value ?? "Happy Clients & Feedbacks"}</h2>
            </div>
          </div>

          <div className="row ftco-animate">
            <div className="col-md-12">
              <div className="carousel-testimony owl-carousel owl-loaded">
                {/* Embla viewport */}
                <div className="owl-stage-outer" ref={viewportRef} style={{ overflow: "hidden" }}>
                  {/* Embla container */}
                  <div className="owl-stage" style={{ display: "flex" }}>
                    {slides.map((s, i) => (
                      <div key={i} className="owl-item" style={{ flex: `0 0 ${slidePct}%`, marginRight: 30 }}>
                        <div className="item">
                          <div className="testimony-wrap d-flex">
                            <div className="user-img" style={{ backgroundImage: `url(${s.img})` }} />
                            <div className="text pl-4">
                              <span className="quote d-flex align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faQuoteLeft} />
                              </span>
                              <p className="rate" style={{ display: "flex", gap: 6 }}>
                                {Array.from({ length: 5 }).map((_, k) => (
                                  <FontAwesomeIcon key={k} icon={faStar} style={{ color: "#F9B233" }} />
                                ))}
                              </p>
                              <p>{s.body}</p>
                              <p className="name">{s.name}</p>
                              <span className="position">{s.role}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dots (match total cards, not pages) */}
                <div className="owl-dots d-flex justify-content-center mt-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`owl-dot ${idx === selected ? "active" : ""}`}
                      onClick={() => embla?.scrollTo(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                    >
                      <span />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* editor panel */}
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
      </section>
    </>
  );
}
