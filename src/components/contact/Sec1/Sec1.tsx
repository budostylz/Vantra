import React, { useEffect, useRef } from "react";
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

/** Inline SVGs (no FA dependency) */
const PinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden focusable="false" {...props}>
    <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
  </svg>
);
const PhoneIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden focusable="false" {...props}>
    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.1.37 2.28.57 3.5.57a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C10.4 22 2 13.6 2 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.22.2 2.4.57 3.5a1 1 0 0 1-.24 1.01l-2.2 2.28Z" />
  </svg>
);
const PaperPlaneIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden focusable="false" {...props}>
    <path d="M22 2 2.5 11.2a1 1 0 0 0 .08 1.84L9 15.5l2.46 6.45a1 1 0 0 0 1.85-.02L22 2Z" />
  </svg>
);
const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden focusable="false" {...props}>
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 0 1 0-16v16Zm2.7-1.2c.8-1.25 1.3-3.05 1.3-4.8s-.5-3.55-1.3-4.8c1.9.55 3.3 2.6 3.3 4.8s-1.4 4.25-3.3 4.8Zm-5.4 0C7.5 17.55 7 15.75 7 14s.5-3.55 1.3-4.8C6.4 9.75 5 11.8 5 14s1.4 4.25 3.3 4.8Z" />
  </svg>
);

export default function Sec1() {
  // Overlay wiring (auto-injected)
  const ROUTE = "/contact";
  const OVERLAY_KEY = "sec1";
  const { text, links, images } = useOverlay(ROUTE, OVERLAY_KEY);

  // ftco-animate (IO + stagger)
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

  return (
    <>
      <section ref={sectionRef} className="ftco-section bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="wrapper">
                <div className="row mb-5">
                  <div className="col-md-3 ftco-animate" data-animate-effect="fadeInUp">
                    <div className="dbox w-100 text-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <PinIcon style={{ color: "#fff", width: 28, height: 28 }} />
                      </div>
                      <div className="text">
                        <p><span>{text[0]?.value ?? "Address:"}</span> {text[1]?.value ?? "198 West 21th Street, Suite 721 New York NY 10016"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3 ftco-animate" data-animate-effect="fadeInUp">
                    <div className="dbox w-100 text-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <PhoneIcon style={{ color: "#fff", width: 28, height: 28 }} />
                      </div>
                      <div className="text">
                        <p>
                          <span>{text[2]?.value ?? "Phone:"}</span>
                          <a href={links[0]?.href ?? "tel://1234567920"}>{links[0]?.text ?? "+ 1235 2355 98"}</a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3 ftco-animate" data-animate-effect="fadeInUp">
                    <div className="dbox w-100 text-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <PaperPlaneIcon style={{ color: "#fff", width: 28, height: 28 }} />
                      </div>
                      <div className="text">
                        <p>
                          <span>{text[4]?.value ?? "Email:"}</span>
                          <a href={links[1]?.href ?? "mailto:info@yoursite.com"}>{links[1]?.text ?? "info@yoursite.com"}</a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3 ftco-animate" data-animate-effect="fadeInUp">
                    <div className="dbox w-100 text-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <GlobeIcon style={{ color: "#fff", width: 28, height: 28 }} />
                      </div>
                      <div className="text">
                        <p>
                          <span>{text[6]?.value ?? "Website "}</span>
                          <a href={links[2]?.href ?? "#"}>{links[2]?.text ?? "yoursite.com"}</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row no-gutters">
                  <div className="col-md-7 ftco-animate" data-animate-effect="fadeInLeft">
                    <div className="contact-wrap w-100 p-md-5 p-4">
                      <h3 className="mb-4">{text[8]?.value ?? "Contact Us"}</h3>
                      <form method="POST" id="contactForm" name="contactForm" className="contactForm">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="label" htmlFor="name">{text[9]?.value ?? "Full Name"}</label>
                              <input type="text" className="form-control" name="name" id="name" placeholder="Name" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="label" htmlFor="email">{text[10]?.value ?? "Email Address"}</label>
                              <input type="email" className="form-control" name="email" id="email" placeholder="Email" />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="label" htmlFor="subject">{text[11]?.value ?? "Subject"}</label>
                              <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="label" htmlFor="#">{text[12]?.value ?? "Message"}</label>
                              <textarea name="message" className="form-control" id="message" cols={30} rows={4} placeholder="Message"></textarea>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <input type="submit" value={text[13]?.value ?? "Send Message"} className="btn btn-primary" />
                              <div className="submitting"></div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="col-md-5 d-flex align-items-stretch ftco-animate" data-animate-effect="fadeInRight">
                    <div
                      className="info-wrap w-100 p-5 img"
                      style={{
                        backgroundImage: `url(${
                          images[0]?.src ??
                          "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/about-1.jpg"
                        })`,
                      }}
                    />
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
