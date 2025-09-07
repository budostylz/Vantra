import React, { useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

const easeCb: [number, number, number, number] = [0.22, 1, 0.36, 1];

const arrowVariants: Variants = {
  rest: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.2 } },
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
      <motion.span aria-hidden variants={arrowVariants}>
        <FontAwesomeIcon icon={faChevronRight} />
      </motion.span>
      <i className="sr-only">{label}</i>
    </motion.a>
  );
}

export default function Sec1() {
  // Overlay wiring (auto-injected)
  const ROUTE = "/services";
  const OVERLAY_KEY = "sec1";
  const { text, links } = useOverlay(ROUTE, OVERLAY_KEY);

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

  return (
    <>
      <section ref={sectionRef} className="ftco-section ftco-intro bg-light">
        <div className="container">
          <div className="row justify-content-center pb-5 mb-3">
            <div className="col-md-7 heading-section text-center ftco-animate" data-animate-effect="fadeInUp">
              <h2>{text[0]?.value ?? "Pressure Washing Services"}</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3 d-flex align-self-stretch ftco-animate" data-animate-effect="fadeInUp">
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

            <div className="col-md-3 d-flex align-self-stretch ftco-animate" data-animate-effect="fadeInUp">
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

            <div className="col-md-3 d-flex align-self-stretch ftco-animate" data-animate-effect="fadeInUp">
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

            <div className="col-md-3 d-flex align-self-stretch ftco-animate" data-animate-effect="fadeInUp">
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

            <div className="col-md-3 d-flex align-self-stretch ftco-animate" data-animate-effect="fadeInUp">
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

            <div className="col-md-3 d-flex align-self-stretch ftco-animate" data-animate-effect="fadeInUp">
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

            <div className="col-md-3 d-flex align-self-stretch ftco-animate" data-animate-effect="fadeInUp">
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

            <div className="col-md-3 d-flex align-self-stretch ftco-animate" data-animate-effect="fadeInUp">
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

      {/* Editor panel */}
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
