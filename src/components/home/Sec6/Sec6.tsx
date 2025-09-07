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

export default function Sec6() {
  const ROUTE = "/home";
  const OVERLAY_KEY = "sec6";
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
              <div className="blog-entry align-self-stretch">
                <a
                  href={links[0]?.href ?? "blog-single.html"}
                  className="block-20 rounded"
                  style={{
                    backgroundImage: `url(${images[0]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_1.jpg"})`,
                  }}
                />
                <div className="text p-4">
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
              <div className="blog-entry align-self-stretch">
                <a
                  href={links[5]?.href ?? "blog-single.html"}
                  className="block-20 rounded"
                  style={{
                    backgroundImage: `url(${images[1]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_2.jpg"})`,
                  }}
                />
                <div className="text p-4">
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
              <div className="blog-entry align-self-stretch">
                <a
                  href={links[10]?.href ?? "blog-single.html"}
                  className="block-20 rounded"
                  style={{
                    backgroundImage: `url(${images[2]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_3.jpg"})`,
                  }}
                />
                <div className="text p-4">
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
