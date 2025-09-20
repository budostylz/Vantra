import React, { useEffect, useRef, useState } from "react";
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";
import EmblaCarousel from "@/components/carousel/EmblaCarousel";
import ShareIcon from "@/components/icons/ShareIcon";



export default function Sec1() {
  // Overlay wiring (auto-injected)
  const ROUTE = "/contact";
  const OVERLAY_KEY = "sec1";
  const { text, links, images } = useOverlay(ROUTE, OVERLAY_KEY);
  const [qty, setQty] = useState(1);

  const POST_BUY_WITH_SHOP_URL =
    "https://shop.app/checkout/85233566001/cn/hWN3APYaCFIC7fQOddVqNrDW/en-us/shoppay_login?_cs=3.AMPS&redirect_source=direct_checkout_product&tracking_unique=976c4f68-3683-47b6-b9d2-e4a76f96f93c&tracking_visit=633607ac-810C-4B0D-FA67-09CE3EDA1B70";

  const POST_MORE_PAYMENT_OPTIONS_URL =
    "https://www.escapechores.com/checkouts/cn/hWN3APdIuvFR7vhnWXYtopko/en-us?skip_shop_pay=true";



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
                <div className="row no-gutters">
                  <div className="col-md-7 ftco-animate" data-animate-effect="fadeInLeft">
                    <div className="contact-wrap w-100 p-md-5 p-4">
                      <h3 className="mb-4">{/*text[8]?.value ??*/ "Post Construction Cleaning Quote"}</h3>
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
                              <label className="label" htmlFor="phone">{/*text[10]?.value ??*/"Phone"}</label>
                              <input type="email" className="form-control" name="email" id="phone" placeholder="Phone" />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="label" htmlFor="name">{/*text[9]?.value ??*/ "Company Name"}</label>
                              <input type="text" className="form-control" name="company_name" id="company_name" placeholder="Company Name" />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="label" htmlFor="email">{text[10]?.value ?? "Email Address"}</label>
                              <input type="email" className="form-control" name="email" id="email" placeholder="Email" />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="label" htmlFor="start_date">{/*text[10]?.value ??*/ "Start Date of Project"}</label>
                              <input type="start-date" className="form-control" name="start_date" id="start_date" placeholder="Start Date of Project" />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="label" htmlFor="project_location">{/*text[10]?.value ??*/ "Project Location"}</label>
                              <input type="project_location" className="form-control" name="project_location" id="project_location" placeholder="Project Location" />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="label" htmlFor="#">{/*text[12]?.value ??*/ "Tell Us About Your Project"}</label>
                              <textarea name="project_info" className="form-control" id="project_info" cols={30} rows={4} placeholder="Tell Us About Your Project"></textarea>
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
                        backgroundImage: `url("https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/users/GLelFyrkvyMnLPTfOFY2xS6QT3t2/vantra-qSKe8jlhMtNvudBqrdmcYljQMM42/img/IMG_4162.JPG")`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            {/* Left: details text under the contact form */}
            <div className="col-md-7">
              <div className="p-md-4 p-3 bg-white rounded-3 shadow-sm">
                {/* Quantity + CTAs */}
                <label className="label d-block mb-2" htmlFor="qty">Quantity</label>

                <div className="d-flex align-items-center flex-wrap" style={{ gap: 12 }}>
                  {/* Quantity pill */}
                  <div
                    className="d-inline-flex align-items-center justify-content-between rounded-pill border px-3"
                    style={{ height: 44, minWidth: 140 }}
                  >
                    <button
                      type="button"
                      className="btn btn-link p-0"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                    >
                      –
                    </button>
                    <span className="mx-3">{qty}</span>
                    <button
                      type="button"
                      className="btn btn-link p-0"
                      onClick={() => setQty((q) => q + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Buy with Shop */}
                  <a
                    href={POST_BUY_WITH_SHOP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary py-3 px-4"
                    style={{
                      borderRadius: 999,
                      fontWeight: 700,
                      letterSpacing: 0.4,
                      paddingLeft: 22,
                      paddingRight: 22,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Buy with Shop
                  </a>

                  {/* More payment options */}
                  <a
                    href={POST_MORE_PAYMENT_OPTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#0f1841",
                      textDecoration: "underline",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    More payment options
                  </a>
                </div>


                {/* Description */}
                <div className="mt-4" style={{ color: "#3b3b3b" }}>
                  <p>
                    This cleaning will typically be an in-depth scrub down of the property: washing walls,
                    sweeping, cleaning windows, and any other parts of the construction project that need
                    to be cleaned up. Doing this cleaning helps ensure the building is fully presentable
                    to the client who ordered the construction project.
                  </p>
                  <p className="mb-0">
                    Typically, the construction crew will complete the post-construction cleaning, but
                    sometimes you may want to do the cleaning yourself—whether to save money or because
                    this was a construction project you undertook on your own.
                  </p>
                </div>

                {/* Share */}
                <div className="d-flex align-items-center gap-2 mt-4">
                  <i className="icon-share" aria-hidden="true" />
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      color: "#0f1841",
                      textDecoration: "underline",
                      lineHeight: 1,           // keeps the icon centered to cap-height
                    }}
                  >
                    <ShareIcon
                      size={16}
                      style={{
                        flex: "0 0 auto",
                        position: "relative",
                        top: 1,                // tiny nudge to optically align with text
                      }}
                    />
                    <span style={{ fontWeight: 600 }}>Share</span>
                  </a>

                </div>
              </div>
            </div>

            {/* Right: slider area under the image */}
            <div className="col-md-5">
              <div className="p-md-4 p-3 bg-white rounded-3 shadow-sm h-100">
                <h5 className="mb-3">Project Gallery</h5>
                <EmblaCarousel
                  slides={
                    (!images?.length
                      ? images.map((i) => i?.src).filter(Boolean)
                      : [
                        "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/users/GLelFyrkvyMnLPTfOFY2xS6QT3t2/vantra-qSKe8jlhMtNvudBqrdmcYljQMM42/img/IMG_0117.jpg",
                        "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/users/GLelFyrkvyMnLPTfOFY2xS6QT3t2/vantra-qSKe8jlhMtNvudBqrdmcYljQMM42/img/IMG_4163_VSCO.JPG",
                        "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/users/GLelFyrkvyMnLPTfOFY2xS6QT3t2/vantra-qSKe8jlhMtNvudBqrdmcYljQMM42/img/IMG_2766.jpeg",
                      ]) as string[]
                  }
                  options={{ loop: true, align: "center", containScroll: "trimSnaps" }}
                  height={240}
                  radius={16}
                />

              </div>
            </div>


          </div>

        </div>
      </section >

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
