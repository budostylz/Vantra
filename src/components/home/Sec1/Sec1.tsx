import React, { useEffect, useRef } from "react";
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

export default function Sec1() {
  // Overlay wiring (auto-injected)
  const ROUTE = "/home";
  const OVERLAY_KEY = "sec1";
  const { node: sec1Overlay, text, links } = useOverlay(ROUTE, OVERLAY_KEY);

  const sectionRef = useRef<HTMLElement | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const sectionEl = sectionRef.current;

    // Number formatter (adds commas like jQuery animateNumber separator)
    const fmt = new Intl.NumberFormat("en-US");

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animateValue = (el: HTMLElement, to: number, duration = 7000) => {
      const start = 0;
      const startTime = performance.now();

      const step = (now: number) => {
        const p = Math.min((now - startTime) / duration, 1);
        const eased = easeOutCubic(p);
        const val = Math.floor(start + (to - start) * eased);
        el.textContent = fmt.format(val);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const onIntersect: IntersectionObserverCallback = (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;

          // Counter behavior (simulate #section-counter + .number)
          const nums = Array.from(sectionEl.querySelectorAll<HTMLElement>(".number"));
          nums.forEach((n) => {
            const target = Number(n.dataset.number ?? "0");
            animateValue(n, target, 7000);
          });

          // Minimal ftco-animate mimic (fadeInUp once)
          const anims = Array.from(sectionEl.querySelectorAll<HTMLElement>(".ftco-animate"));
          setTimeout(() => {
            anims.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add("fadeInUp", "ftco-animated");
              }, i * 50);
            });
          }, 100);

          obs.unobserve(entry.target);
        }
      });
    };

    // Trigger near bottom like Waypoints offset: '95%'
    const io = new IntersectionObserver(onIntersect, {
      root: null,
      rootMargin: "0px 0px -5% 0px",
      threshold: 0,
    });

    io.observe(sectionEl);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="ftco-counter" id="section-counter">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-5 mb-md-0 text-center text-md-left">
              <h2 className="font-weight-bold" style={{ color: "#fff", fontSize: "20px" }}>
                {text[0]?.value ?? "We Provide Free Quotation"}
              </h2>
              <a href={links[0]?.href ?? "#"} className="btn btn-white btn-outline-white">
                {links[0]?.text ?? "Free Consultation"}
              </a>
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate">
                  <div className="block-18 text-center">
                    <div className="text">
                      <strong className="number" data-number="50">0</strong>
                    </div>
                    <div className="text">
                      <span>{text[2]?.value ?? "Customer"}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate">
                  <div className="block-18 text-center">
                    <div className="text">
                      <strong className="number" data-number="8500">0</strong>
                    </div>
                    <div className="text">
                      <span>{text[3]?.value ?? "Professionals"}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate">
                  <div className="block-18 text-center">
                    <div className="text">
                      <strong className="number" data-number="20">0</strong>
                    </div>
                    <div className="text">
                      <span>{text[4]?.value ?? "Products"}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate">
                  <div className="block-18 text-center">
                    <div className="text">
                      <strong className="number" data-number="50">0</strong>
                    </div>
                    <div className="text">
                      <span>{text[5]?.value ?? "Pets Hosted"}</span>
                    </div>
                  </div>
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
