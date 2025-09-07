import React, { useEffect, useRef } from "react";
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

/* ---- tiny inline icons (Font-Awesome-ish, no dependency) ---- */
const IconWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ display: "inline-flex", alignItems: "center" }}>{children}</span>
);
const ChevronDown = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const User = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M20 21a8 8 0 0 0-16 0" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const PaperPlane = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22 11 13 2 9 22 2z" />
  </svg>
);
const Calendar = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const Clock = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default function Sec7() {
  const ROUTE = "/home";
  const OVERLAY_KEY = "sec7";
  const { text, images } = useOverlay(ROUTE, OVERLAY_KEY);

  /* ---- ftco-animate mimic ---- */
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
  /* -------------------------------- */

  return (
    <>
      <section
        ref={sectionRef}
        className="ftco-appointment ftco-section ftco-no-pt ftco-no-pb img"
        style={{
          backgroundImage: `url(${images[0]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/bg_3.jpg"})`,
        }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row d-md-flex justify-content-center">
            <div className="col-md-12 col-lg-8 half p-3 py-5 pl-lg-5 ftco-animate" data-animate-effect="fadeInUp">
              <h2 className="mb-4">{text[0]?.value ?? "Free Consultation"}</h2>

              <form action="#" className="appointment">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group ftco-animate" data-animate-effect="fadeInUp">
                      <div className="form-field">
                        <div className="select-wrap">
                          <div className="icon">
                            <IconWrap><ChevronDown /></IconWrap>
                          </div>
                          <select className="form-control">
                            <option>{text[1]?.value ?? "Select services"}</option>
                            <option>{text[2]?.value ?? "House Washing"}</option>
                            <option>{text[3]?.value ?? "Roof Cleaning"}</option>
                            <option>{text[4]?.value ?? "Driveway Cleaning"}</option>
                            <option>{text[5]?.value ?? "Gutter Cleaning"}</option>
                            <option>{text[6]?.value ?? "Patio Cleaning"}</option>
                            <option>{text[7]?.value ?? "Building Cleaning"}</option>
                            <option>{text[8]?.value ?? "Concrete Cleaning"}</option>
                            <option>{text[9]?.value ?? "Sidewal Cleaning"}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group ftco-animate">
                      <div className="input-wrap">
                        <div className="icon"><IconWrap><User /></IconWrap></div>
                        <input type="text" className="form-control" placeholder="Your Name" />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group ftco-animate">
                      <div className="input-wrap">
                        <div className="icon"><IconWrap><PaperPlane /></IconWrap></div>
                        <input type="text" className="form-control" placeholder="Email Address" />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group ftco-animate">
                      <div className="input-wrap">
                        <div className="icon"><IconWrap><Calendar /></IconWrap></div>
                        <input type="text" className="form-control appointment_date" placeholder="Date" />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group ftco-animate">
                      <div className="input-wrap">
                        <div className="icon"><IconWrap><Clock /></IconWrap></div>
                        <input type="text" className="form-control appointment_time" placeholder="Time" />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group ftco-animate">
                      <textarea className="form-control" rows={7} placeholder="Message"></textarea>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group ftco-animate">
                      <input type="submit" value={text[10]?.value ?? "Send message"} className="btn btn-primary py-3 px-4" />
                    </div>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </section>

      <div className="container mt-6">
        <div style={{ position: "sticky", top: "calc(env(safe-area-inset-top, 0px) + 12px)", zIndex: 10, maxHeight: "calc(100svh - 16px)", overflowY: "auto", overflowX: "hidden", overscrollBehavior: "contain", WebkitOverflowScrolling: "touch", paddingBottom: 8, maxWidth: "100%" }}>
          <OverlayEditor route={ROUTE} overlayKey={OVERLAY_KEY} />
        </div>
      </div>
    </>
  );
}
