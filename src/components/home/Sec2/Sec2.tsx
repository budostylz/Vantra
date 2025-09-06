import React, { useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

// framer-motion typed ease tuple
const easeCb: [number, number, number, number] = [0.22, 1, 0.36, 1];

const arrowVariants: Variants = {
  rest:  { x: 0, opacity: 1, transition: { type: "tween", duration: 0.2 } },
  hover: { x: 6, opacity: 1, transition: { type: "tween", duration: 0.25, ease: easeCb } },
};

function ArrowBtn({ href = "#", label }: { href?: string; label: string }) {
  return (
    <motion.a
      href={href}
      className="btn-custom d-flex align-items-center justify-content-center"
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
    >
      <motion.span aria-hidden={true} variants={arrowVariants}>
        <FontAwesomeIcon icon={faChevronRight} />
      </motion.span>
      <i className="sr-only">{label}</i>
    </motion.a>
  );
}

export default function Sec2() {
  // Overlay wiring (auto-injected)
  const ROUTE = "/home";
  const OVERLAY_KEY = "sec2";
  const { node: sec2Overlay, text, links, images } = useOverlay(ROUTE, OVERLAY_KEY);

  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || typeof window === "undefined") return;

    const applyEffect = (el: HTMLElement) => {
      const effect = (el.getAttribute("data-animate-effect") || "").trim();
      if (effect === "fadeIn") el.classList.add("fadeIn", "ftco-animated");
      else if (effect === "fadeInLeft") el.classList.add("fadeInLeft", "ftco-animated");
      else if (effect === "fadeInRight") el.classList.add("fadeInRight", "ftco-animated");
      else el.classList.add("fadeInUp", "ftco-animated");
      el.classList.remove("item-animate");
    };

    const processBatch = () => {
      const batch = Array.from(root.querySelectorAll<HTMLElement>(".ftco-animate.item-animate"));
      batch.forEach((el, k) => setTimeout(() => applyEffect(el), k * 50));
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

    const targets = Array.from(root.querySelectorAll<HTMLElement>(".ftco-animate"));
    targets.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="ftco-section ftco-intro"
        style={{
          backgroundImage: `url(${
            images[0]?.src ??
            "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/bg_2.jpg"
          })`,
        }}
      >
        <div className="container">
          <div className="row justify-content-center pb-5 mb-3">
            <div className="col-md-7 heading-section heading-section-white text-center ftco-animate">
              <h2>{text[0]?.value ?? "Pressure Washing Services"}</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 d-flex align-self-stretch ftco-animate">
              <div className="d-block services">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="flaticon-cleaning"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">{text[1]?.value ?? "House Washing"}</h3>
                  <p>{text[2]?.value ?? "Far far away, behind the word mountains, far from the countries."}</p>
                  <ArrowBtn href={links[0]?.href ?? "#"} label={links[0]?.text ?? "Read more"} />
                </div>
              </div>
            </div>

            <div className="col-md-3 d-flex align-self-stretch ftco-animate">
              <div className="d-block services">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="flaticon-joist"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">{text[3]?.value ?? "Roof Cleaning"}</h3>
                  <p>{text[4]?.value ?? "Far far away, behind the word mountains, far from the countries."}</p>
                  <ArrowBtn href={links[1]?.href ?? "#"} label={links[1]?.text ?? "Read more"} />
                </div>
              </div>
            </div>

            <div className="col-md-3 d-flex align-self-stretch ftco-animate">
              <div className="d-block services">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="flaticon-road"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">{text[5]?.value ?? "Driveway Cleaning"}</h3>
                  <p>{text[6]?.value ?? "Far far away, behind the word mountains, far from the countries."}</p>
                  <ArrowBtn href={links[2]?.href ?? "#"} label={links[2]?.text ?? "Read more"} />
                </div>
              </div>
            </div>

            <div className="col-md-3 d-flex align-self-stretch ftco-animate">
              <div className="d-block services">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="flaticon-pipe"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">{text[7]?.value ?? "Gutter Cleaning"}</h3>
                  <p>{text[8]?.value ?? "Far far away, behind the word mountains, far from the countries."}</p>
                  <ArrowBtn href={links[3]?.href ?? "#"} label={links[3]?.text ?? "Read more"} />
                </div>
              </div>
            </div>

            <div className="col-md-3 d-flex align-self-stretch ftco-animate">
              <div className="d-block services">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="flaticon-kitchen"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">{text[9]?.value ?? "Patio Cleaning"}</h3>
                  <p>{text[10]?.value ?? "Far far away, behind the word mountains, far from the countries."}</p>
                  <ArrowBtn href={links[4]?.href ?? "#"} label={links[4]?.text ?? "Read more"} />
                </div>
              </div>
            </div>

            <div className="col-md-3 d-flex align-self-stretch ftco-animate">
              <div className="d-block services">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="flaticon-brickwall"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">{text[11]?.value ?? "Building Cleaning"}</h3>
                  <p>{text[12]?.value ?? "Far far away, behind the word mountains, far from the countries."}</p>
                  <ArrowBtn href={links[5]?.href ?? "#"} label={links[5]?.text ?? "Read more"} />
                </div>
              </div>
            </div>

            <div className="col-md-3 d-flex align-self-stretch ftco-animate">
              <div className="d-block services">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="flaticon-wall"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">{text[13]?.value ?? "Concrete Cleaning"}</h3>
                  <p>{text[14]?.value ?? "Far far away, behind the word mountains, far from the countries."}</p>
                  <ArrowBtn href={links[6]?.href ?? "#"} label={links[6]?.text ?? "Read more"} />
                </div>
              </div>
            </div>

            <div className="col-md-3 d-flex align-self-stretch ftco-animate">
              <div className="d-block services">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="flaticon-rajpath"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">{text[15]?.value ?? "Sidewalk Cleaning"}</h3>
                  <p>{text[16]?.value ?? "Far far away, behind the word mountains, far from the countries."}</p>
                  <ArrowBtn href={links[7]?.href ?? "#"} label={links[7]?.text ?? "Read more"} />
                </div>
              </div>
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
