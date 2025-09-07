import React, { useEffect, useRef } from "react";
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

/** Tiny inline chat-bubble icon (no FA dependency) */
const ChatIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M20 2H4a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h10.6l3.7 2.78a1 1 0 0 0 1.6-.8V19h0A3 3 0 0 0 23 16V5a3 3 0 0 0-3-3Z" />
  </svg>
);

export default function Sec1() {
  const ROUTE = "/blog";
  const OVERLAY_KEY = "sec1";
  const { text, links, images } = useOverlay(ROUTE, OVERLAY_KEY);

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

  // Consistent card + image sizing so the last one won't collapse
  const cardStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  };
  const imgStyle = (src?: string): React.CSSProperties => ({
    display: "block",
    width: "100%",
    aspectRatio: "16 / 9", // consistent size across all cards
    minHeight: 240,         // safety for older browsers
    backgroundImage: `url(${src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden",
  });

  return (
    <>
      <section ref={sectionRef} className="ftco-section bg-light">
        <div className="container">
          <div className="row justify-content-center pb-5 mb-3">
            <div className="col-md-7 heading-section text-center ftco-animate">
              <h2>{text[0]?.value ?? "Latest news from our blog"}</h2>
            </div>
          </div>

          <div className="row d-flex">
            {/* Card 1 */}
            <div className="col-md-4 d-flex ftco-animate">
              <div className="blog-entry align-self-stretch" style={cardStyle}>
                <a
                  href={links[0]?.href ?? "/blog-single"}
                  className="block-20 rounded"
                  style={imgStyle(
                    images[0]?.src ??
                      "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_1.jpg"
                  )}
                />
                <div className="text p-4" style={{ flex: "1 1 auto" }}>
                  <div className="meta mb-2">
                    <div><a href={links[1]?.href ?? "#"}>{links[1]?.text ?? "June 14, 2020"}</a></div>
                    <div><a href={links[2]?.href ?? "#"}>{links[2]?.text ?? "Admin"}</a></div>
                    <div>
                      <a
                        href={links[3]?.href ?? "#"}
                        className="meta-chat"
                        style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                      >
                        <ChatIcon style={{ color: "#2f89fc", width: 16, height: 16 }} />
                        {links[3]?.text ?? "3"}
                      </a>
                    </div>
                  </div>
                  <h3 className="heading"><a href={links[4]?.href ?? "#"}>{links[4]?.text ?? "Even the all-powerful Pointing has no control about the blind texts"}</a></h3>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-4 d-flex ftco-animate">
              <div className="blog-entry align-self-stretch" style={cardStyle}>
                <a
                  href={links[5]?.href ?? "/blog-single"}
                  className="block-20 rounded"
                  style={imgStyle(
                    images[1]?.src ??
                      "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_2.jpg"
                  )}
                />
                <div className="text p-4" style={{ flex: "1 1 auto" }}>
                  <div className="meta mb-2">
                    <div><a href={links[6]?.href ?? "#"}>{links[6]?.text ?? "June 14, 2020"}</a></div>
                    <div><a href={links[7]?.href ?? "#"}>{links[7]?.text ?? "Admin"}</a></div>
                    <div>
                      <a
                        href={links[8]?.href ?? "#"}
                        className="meta-chat"
                        style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                      >
                        <ChatIcon style={{ color: "#2f89fc", width: 16, height: 16 }} />
                        {links[8]?.text ?? "3"}
                      </a>
                    </div>
                  </div>
                  <h3 className="heading"><a href={links[9]?.href ?? "#"}>{links[9]?.text ?? "Even the all-powerful Pointing has no control about the blind texts"}</a></h3>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-4 d-flex ftco-animate">
              <div className="blog-entry align-self-stretch" style={cardStyle}>
                <a
                  href={links[10]?.href ?? "/blog-single"}
                  className="block-20 rounded"
                  style={imgStyle(
                    images[2]?.src ??
                      "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_3.jpg"
                  )}
                />
                <div className="text p-4" style={{ flex: "1 1 auto" }}>
                  <div className="meta mb-2">
                    <div><a href={links[11]?.href ?? "#"}>{links[11]?.text ?? "June 14, 2020"}</a></div>
                    <div><a href={links[12]?.href ?? "#"}>{links[12]?.text ?? "Admin"}</a></div>
                    <div>
                      <a
                        href={links[13]?.href ?? "#"}
                        className="meta-chat"
                        style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                      >
                        <ChatIcon style={{ color: "#2f89fc", width: 16, height: 16 }} />
                        {links[13]?.text ?? "3"}
                      </a>
                    </div>
                  </div>
                  <h3 className="heading"><a href={links[14]?.href ?? "#"}>{links[14]?.text ?? "Even the all-powerful Pointing has no control about the blind texts"}</a></h3>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="col-md-4 d-flex ftco-animate">
              <div className="blog-entry align-self-stretch" style={cardStyle}>
                <a
                  href={links[15]?.href ?? "/blog-single"}
                  className="block-20 rounded"
                  style={imgStyle(
                    images[3]?.src ??
                      "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_4.jpg"
                  )}
                />
                <div className="text p-4" style={{ flex: "1 1 auto" }}>
                  <div className="meta mb-2">
                    <div><a href={links[16]?.href ?? "#"}>{links[16]?.text ?? "June 14, 2020"}</a></div>
                    <div><a href={links[17]?.href ?? "#"}>{links[17]?.text ?? "Admin"}</a></div>
                    <div>
                      <a
                        href={links[18]?.href ?? "#"}
                        className="meta-chat"
                        style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                      >
                        <ChatIcon style={{ color: "#2f89fc", width: 16, height: 16 }} />
                        {links[18]?.text ?? "3"}
                      </a>
                    </div>
                  </div>
                  <h3 className="heading"><a href={links[19]?.href ?? "#"}>{links[19]?.text ?? "Even the all-powerful Pointing has no control about the blind texts"}</a></h3>
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className="col-md-4 d-flex ftco-animate">
              <div className="blog-entry align-self-stretch" style={cardStyle}>
                <a
                  href={links[20]?.href ?? "/blog-single"}
                  className="block-20 rounded"
                  style={imgStyle(
                    images[4]?.src ??
                      "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_5.jpg"
                  )}
                />
                <div className="text p-4" style={{ flex: "1 1 auto" }}>
                  <div className="meta mb-2">
                    <div><a href={links[21]?.href ?? "#"}>{links[21]?.text ?? "June 14, 2020"}</a></div>
                    <div><a href={links[22]?.href ?? "#"}>{links[22]?.text ?? "Admin"}</a></div>
                    <div>
                      <a
                        href={links[23]?.href ?? "#"}
                        className="meta-chat"
                        style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                      >
                        <ChatIcon style={{ color: "#2f89fc", width: 16, height: 16 }} />
                        {links[23]?.text ?? "3"}
                      </a>
                    </div>
                  </div>
                  <h3 className="heading"><a href={links[24]?.href ?? "#"}>{links[24]?.text ?? "Even the all-powerful Pointing has no control about the blind texts"}</a></h3>
                </div>
              </div>
            </div>

            {/* Card 6 */}
            <div className="col-md-4 d-flex ftco-animate">
              <div className="blog-entry align-self-stretch" style={cardStyle}>
                <a
                  href={links[25]?.href ?? "/blog-single"}
                  className="block-20 rounded"
                  style={imgStyle(
                    images[5]?.src ??
                      "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_6.jpg"
                  )}
                />
                <div className="text p-4" style={{ flex: "1 1 auto" }}>
                  <div className="meta mb-2">
                    <div><a href={links[26]?.href ?? "#"}>{links[26]?.text ?? "June 14, 2020"}</a></div>
                    <div><a href={links[27]?.href ?? "#"}>{links[27]?.text ?? "Admin"}</a></div>
                    <div>
                      <a
                        href={links[28]?.href ?? "#"}
                        className="meta-chat"
                        style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                      >
                        <ChatIcon style={{ color: "#2f89fc", width: 16, height: 16 }} />
                        {links[28]?.text ?? "3"}
                      </a>
                    </div>
                  </div>
                  <h3 className="heading"><a href={links[29]?.href ?? "#"}>{links[29]?.text ?? "Even the all-powerful Pointing has no control about the blind texts"}</a></h3>
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
