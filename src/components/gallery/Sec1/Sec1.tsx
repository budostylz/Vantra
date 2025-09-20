import React, { useEffect, useRef } from "react";
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

/** Small inline expand icon (no FA dependency) */
const ExpandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <polyline points="15 3 21 3 21 9" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

export default function Sec1() {
  const ROUTE = "/gallery";
  const OVERLAY_KEY = "sec1";
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

  return (
    <>
      <section ref={sectionRef} className="ftco-section">
        <div className="container-fluid px-md-4">
          <div className="row">
            {/* 1 */}
            <div className="col-md-3 ftco-animate" data-animate-effect="fadeInUp">
              <div
                className="work mb-4 img d-flex align-items-end"
                style={{
                  backgroundImage: `url(${
                    images[0]?.src ??
                    "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-1.jpg"
                  })`,
                }}
              >
                <a
                  href={
                    links[0]?.href ??
                    "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-1.jpg"
                  }
                  className="icon image-popup d-flex justify-content-center align-items-center"
                >
                  <ExpandIcon />
                </a>
                <div className="desc w-100 px-4">
                  <div className="text w-100 mb-3">
                    <span>{text[0]?.value ?? "Roof cleaning"}</span>
                    <h2>
                      <a href={links[1]?.href ?? "work-single.html"}>
                        {links[1]?.text ?? "Roof Cleaning"}
                      </a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* 2 */}
            <div className="col-md-3 ftco-animate" data-animate-effect="fadeInUp">
              <div
                className="work mb-4 img d-flex align-items-end"
                style={{
                  backgroundImage: `url(${
                    images[1]?.src ??
                    "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-2.jpg"
                  })`,
                }}
              >
                <a
                  href={
                    links[2]?.href ??
                    "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-2.jpg"
                  }
                  className="icon image-popup d-flex justify-content-center align-items-center"
                >
                  <ExpandIcon />
                </a>
                <div className="desc w-100 px-4">
                  <div className="text w-100 mb-3">
                    <span>{text[2]?.value ?? "Driveway"}</span>
                    <h2>
                      <a href={links[3]?.href ?? "work-single.html"}>
                        {links[3]?.text ?? "Gaston Driveway"}
                      </a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 */}
            <div className="col-md-3 ftco-animate" data-animate-effect="fadeInUp">
              <div
                className="work mb-4 img d-flex align-items-end"
                style={{
                  backgroundImage: `url(${
                    images[2]?.src ??
                    "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-3.jpg"
                  })`,
                }}
              >
                <a
                  href={
                    links[4]?.href ??
                    "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-3.jpg"
                  }
                  className="icon image-popup d-flex justify-content-center align-items-center"
                >
                  <ExpandIcon />
                </a>
                <div className="desc w-100 px-4">
                  <div className="text w-100 mb-3">
                    <span>{text[4]?.value ?? "Gutter Cleaning"}</span>
                    <h2>
                      <a href={links[5]?.href ?? "work-single.html"}>
                        {links[5]?.text ?? "Gutter"}
                      </a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 */}
            <div className="col-md-3 ftco-animate" data-animate-effect="fadeInUp">
              <div
                className="work mb-4 img d-flex align-items-end"
                style={{
                  backgroundImage: `url(${
                    images[3]?.src ??
                    "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-4.jpg"
                  })`,
                }}
              >
                <a
                  href={
                    links[6]?.href ??
                    "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-4.jpg"
                  }
                  className="icon image-popup d-flex justify-content-center align-items-center"
                >
                  <ExpandIcon />
                </a>
                <div className="desc w-100 px-4">
                  <div className="text w-100 mb-3">
                    <span>{text[6]?.value ?? "Patio Cleaning"}</span>
                    <h2>
                      <a href={links[7]?.href ?? "work-single.html"}>
                        {links[7]?.text ?? "Patio Cleaning"}
                      </a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* 5 */}
            <div className="col-md-3 ftco-animate" data-animate-effect="fadeInUp">
              <div
                className="work mb-4 img d-flex align-items-end"
                style={{
                  backgroundImage: `url(${
                    images[4]?.src ??
                    "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-5.jpg"
                  })`,
                }}
              >
                <a
                  href={
                    links[8]?.href ??
                    "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-5.jpg"
                  }
                  className="icon image-popup d-flex justify-content-center align-items-center"
                >
                  <ExpandIcon />
                </a>
                <div className="desc w-100 px-4">
                  <div className="text w-100 mb-3">
                    <span>{text[8]?.value ?? "Building Cleaning"}</span>
                    <h2>
                      <a href={links[9]?.href ?? "work-single.html"}>
                        {links[9]?.text ?? "Building Cleaning"}
                      </a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* 6 */}
            <div className="col-md-3 ftco-animate" data-animate-effect="fadeInUp">
              <div
                className="work mb-4 img d-flex align-items-end"
                style={{
                  backgroundImage: `url(${
                    images[5]?.src ??
                    "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-6.jpg"
                  })`,
                }}
              >
                <a
                  href={
                    links[10]?.href ??
                    "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-6.jpg"
                  }
                  className="icon image-popup d-flex justify-content-center align-items-center"
                >
                  <ExpandIcon />
                </a>
                <div className="desc w-100 px-4">
                  <div className="text w-100 mb-3">
                    <span>{text[10]?.value ?? "Building Cleaning"}</span>
                    <h2>
                      <a href={links[11]?.href ?? "work-single.html"}>
                        {links[11]?.text ?? "Hall Way"}
                      </a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* 7 */}
            <div className="col-md-3 ftco-animate" data-animate-effect="fadeInUp">
              <div
                className="work mb-4 img d-flex align-items-end"
                style={{
                  backgroundImage: `url(${
                    images[6]?.src ??
                    "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-7.jpg"
                  })`,
                }}
              >
                <a
                  href={
                    links[12]?.href ??
                    "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-7.jpg"
                  }
                  className="icon image-popup d-flex justify-content-center align-items-center"
                >
                  <ExpandIcon />
                </a>
                <div className="desc w-100 px-4">
                  <div className="text w-100 mb-3">
                    <span>{text[12]?.value ?? "Patio Cleaning"}</span>
                    <h2>
                      <a href={links[13]?.href ?? "work-single.html"}>
                        {links[13]?.text ?? "Garden Cleaning"}
                      </a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* 8 */}
            <div className="col-md-3 ftco-animate" data-animate-effect="fadeInUp">
              <div
                className="work mb-4 img d-flex align-items-end"
                style={{
                  backgroundImage: `url(${
                    images[7]?.src ??
                    "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-8.jpg"
                  })`,
                }}
              >
                <a
                  href={
                    links[14]?.href ??
                    "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-8.jpg"
                  }
                  className="icon image-popup d-flex justify-content-center align-items-center"
                >
                  <ExpandIcon />
                </a>
                <div className="desc w-100 px-4">
                  <div className="text w-100 mb-3">
                    <span>{text[14]?.value ?? "Office"}</span>
                    <h2>
                      <a href={links[15]?.href ?? "work-single.html"}>
                        {links[15]?.text ?? "Office Cleaning"}
                      </a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            {/* /grid */}
          </div>

          {/* Pagination */}
          {/*<div className="row mt-5">
            <div className="col text-center">
              <div className="block-27">
                <ul>
                  <li><a href={links[16]?.href ?? "#"}>{links[16]?.text ?? "<"}</a></li>
                  <li className="active"><span>{text[16]?.value ?? "1"}</span></li>
                  <li><a href={links[17]?.href ?? "#"}>{links[17]?.text ?? "2"}</a></li>
                  <li><a href={links[18]?.href ?? "#"}>{links[18]?.text ?? "3"}</a></li>
                  <li><a href={links[19]?.href ?? "#"}>{links[19]?.text ?? "4"}</a></li>
                  <li><a href={links[20]?.href ?? "#"}>{links[20]?.text ?? "5"}</a></li>
                  <li><a href={links[21]?.href ?? "#"}>{links[21]?.text ?? ">"}</a></li>
                </ul>
              </div>
            </div>
          </div> */}
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
}
