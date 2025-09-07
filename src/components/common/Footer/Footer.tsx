import React, { useEffect, useRef } from "react";
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";


/* ---------- Tiny inline icons (no external CSS needed) ---------- */
const XIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 512 512" width="1em" height="1em" aria-hidden="true" {...p}>
    <path
      fill="currentColor"
      d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
    />
  </svg>
);

const FacebookIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M22 12.07C22 6.49 17.52 2 12 2S2 6.49 2 12.07c0 5.01 3.66 9.17 8.44 9.93v-7.02H8.08v-2.9h2.36V9.41c0-2.33 1.39-3.62 3.52-3.62.99 0 2.03.18 2.03.18v2.24h-1.14c-1.12 0-1.47.7-1.47 1.42v1.7h2.5l-.4 2.9h-2.1v7.02C18.34 21.24 22 17.08 22 12.07z" />
  </svg>
);

const InstagramIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2A2.8 2.8 0 1 0 12 16 2.8 2.8 0 0 0 12 9.2zm5.5-1.7a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z" />
  </svg>
);

const MapPinIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2a7 7 0 0 0-7 6.9C5 13.6 12 21 12 21s7-7.4 7-12.1A7 7 0 0 0 12 2zm0 9.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4z" />
  </svg>
);

const PhoneIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M21 16.5v3.2c0 .7-.6 1.3-1.3 1.3C9.7 21 3 14.3 2.9 4.3 2.9 3.6 3.5 3 4.2 3h3.2c.7 0 1.3.5 1.3 1.2 0 1.1.2 2.2.6 3.1.2.5 0 1-.3 1.4L7.9 10c1.5 2.9 3.8 5.2 6.7 6.7l1.3-1.1c.4-.3.9-.5 1.4-.3 1 .3 2 .6 3.1.6.7 0 1.6.6 1.6 1.6z" />
  </svg>
);

const PaperPlaneIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M22 2 2.5 10.6a1 1 0 0 0 .1 1.9l6.9 2.3 2.3 6.9c.2.6 1 .7 1.4.1L22 2zM9.8 13.7 19 6.2l-8.4 6.9-.8 3.2z" />
  </svg>
);

const RocketIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M14 3c3.9 0 7 3.1 7 7 0 2.3-1.1 4.5-3 5.9l-.7.6-2.3-2.3a10 10 0 0 1-3.9 3.9l2.3 2.3-.6.7c-1.4 1.9-3.6 3-5.9 3-1 0-2-.2-2.9-.6l3.7-3.7-.9-3.6-3.6-.9L1.5 18c-.4-.9-.6-1.9-.6-2.9 0-2.3 1.1-4.5 3-5.9l.7-.6L7 11.1A10 10 0 0 1 10.9 7L8.6 4.7l.6-.7C9.9 4 12 3 14 3zm-2.1 5.2a2 2 0 1 0 2.9-2.9 2 2 0 0 0-2.9 2.9z" />
  </svg>
);
/* --------------------------------------------------------------- */

const Footer: React.FC = () => {
  const ROUTE = "global";
  const OVERLAY_KEY = "footer";
  const { text, links, images } = useOverlay(ROUTE, OVERLAY_KEY);
  const currentYear = new Date().getFullYear();

  // ftco-animate (IO + stagger)
  const footerRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const root = footerRef.current;
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
      <footer ref={footerRef} className="footer">
        <div className="container">
          <div className="row">
            {/* Col 1 */}
            <div className="col-md-6 col-lg-3 mb-4 mb-md-0 ftco-animate" data-animate-effect="fadeInUp">
              <h2 className="footer-heading">{text[0]?.value ?? "Pressure Washing"}</h2>
              <p>
                {text[1]?.value ??
                  "A small river named Duden flows by their place and supplies it with the necessary regelialia."}
              </p>
              <ul className="ftco-footer-social p-0">
                <li className="ftco-animate">
                  <a href={links[0]?.href ?? "#"} title="Twitter" aria-label="Twitter">
                    <XIcon />
                  </a>
                </li>
                <li className="ftco-animate">
                  <a href={links[1]?.href ?? "#"} title="Facebook" aria-label="Facebook">
                    <FacebookIcon />
                  </a>
                </li>
                <li className="ftco-animate">
                  <a href={links[2]?.href ?? "#"} title="Instagram" aria-label="Instagram">
                    <InstagramIcon />
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 2 */}
            <div className="col-md-6 col-lg-3 mb-4 mb-md-0 ftco-animate" data-animate-effect="fadeInUp">
              <h2 className="footer-heading">{text[2]?.value ?? "Latest News"}</h2>
              <div className="block-21 mb-4 d-flex ftco-animate">
                <a
                  className="img mr-4 rounded"
                  style={{
                    backgroundImage: `url(${images[0]?.src ??
                      "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_1.jpg"
                      })`,
                  }}
                ></a>
                <div className="text">
                  <h3 className="heading">
                    <a href={links[3]?.href ?? "#"}>
                      {links[3]?.text ?? "Even the all-powerful Pointing has no control about"}
                    </a>
                  </h3>
                  <div className="meta">
                    <div>
                      <a href={links[4]?.href ?? "#"}>{links[4]?.text ?? "Jun 14, 2020"}</a>
                    </div>
                    <div>
                      <a href={links[5]?.href ?? "#"}>{links[5]?.text ?? "Admin"}</a>
                    </div>
                    <div>
                      <a href={links[6]?.href ?? "#"}>{links[6]?.text ?? "19"}</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="block-21 mb-4 d-flex ftco-animate">
                <a
                  className="img mr-4 rounded"
                  style={{
                    backgroundImage: `url(${images[1]?.src ??
                      "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_2.jpg"
                      })`,
                  }}
                ></a>
                <div className="text">
                  <h3 className="heading">
                    <a href={links[7]?.href ?? "#"}>
                      {links[7]?.text ?? "Even the all-powerful Pointing has no control about"}
                    </a>
                  </h3>
                  <div className="meta">
                    <div>
                      <a href={links[8]?.href ?? "#"}>{links[8]?.text ?? "Jun 14, 2020"}</a>
                    </div>
                    <div>
                      <a href={links[9]?.href ?? "#"}>{links[9]?.text ?? "Admin"}</a>
                    </div>
                    <div>
                      <a href={links[10]?.href ?? "#"}>{links[10]?.text ?? "19"}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 3 */}
            <div className="col-md-6 col-lg-3 pl-lg-5 mb-4 mb-md-0 ftco-animate" data-animate-effect="fadeInUp">
              <h2 className="footer-heading">{text[11]?.value ?? "Quick Links"}</h2>
              <ul className="list-unstyled">
                <li>
                  <a href={links[11]?.href ?? "/"} className="py-2 d-block">
                    {links[11]?.text ?? "Home"}
                  </a>
                </li>
                <li>
                  <a href={links[12]?.href ?? "/about"} className="py-2 d-block">
                    {links[12]?.text ?? "About"}
                  </a>
                </li>
                <li>
                  <a href={links[13]?.href ?? "/services"} className="py-2 d-block">
                    {links[13]?.text ?? "Services"}
                  </a>
                </li>
                <li>
                  <a href={links[14]?.href ?? "/gallery"} className="py-2 d-block">
                    {links[14]?.text ?? "Works"}
                  </a>
                </li>
                <li>
                  <a href={links[15]?.href ?? "/blog"} className="py-2 d-block">
                    {links[15]?.text ?? "Blog"}
                  </a>
                </li>
                <li>
                  <a href={links[16]?.href ?? "/contact"} className="py-2 d-block">
                    {links[16]?.text ?? "Contact"}
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="col-md-6 col-lg-3 mb-4 mb-md-0 ftco-animate" data-animate-effect="fadeInUp">
              <h2 className="footer-heading">{text[18]?.value ?? "Have a Questions?"}</h2>
              <div className="block-23 mb-3">
                <ul>
                  <li>
                    <span className="icon">
                      <MapPinIcon />
                    </span>
                    <span className="text">
                      {text[19]?.value ?? "203 Fake St. Mountain View, San Francisco, California, USA"}
                    </span>
                  </li>
                  <li>
                    <a href={links[17]?.href ?? "#"}>
                      <span className="icon">
                        <PhoneIcon />
                      </span>
                      <span className="text">{links[17]?.text ?? "+2 392 3929 210"}</span>
                    </a>
                  </li>
                  <li>
                    <a href={links[18]?.href ?? "#"}>
                      <span className="icon">
                        <PaperPlaneIcon />
                      </span>
                      <span className="text">{links[18]?.text ?? "info@yourdomain.com"}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="row mt-5">
            <div className="col-md-12 text-center ftco-animate" data-animate-effect="fadeInUp">
              <p className="copyright">
                {text[22]?.value ?? "© "} {currentYear} {text[23]?.value ?? " Crafted with passion "}
                <FontAwesomeIcon
                  icon={faRocket}
                  style={{ fontSize: "1em", verticalAlign: "-0.12em", margin: "0 .25ch" }}
                  aria-hidden="true"
                />
                {text[24]?.value ?? " on "}&nbsp;
                <a href={links[19]?.href ?? "https://budoboost.ai"} target="_blank">
                  {links[19]?.text ?? "BudoBoost.ai"}
                </a>
                &nbsp;{text[25]?.value ?? " — Empowering creators to launch beautiful sites in minutes."}
              </p>
            </div>
          </div>

        </div>
      </footer>

      {/* Overlay editor */}
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
          <OverlayEditor route="global" overlayKey="footer" />
        </div>
      </div>
    </>
  );
};

export default Footer;
