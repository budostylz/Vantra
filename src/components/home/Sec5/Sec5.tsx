import React from 'react';
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

export default function Sec5() {
  // Overlay wiring (auto-injected)
  const ROUTE = "/home";
  const OVERLAY_KEY = "sec5";
  const { node: sec5Overlay, text, links, images, variables } = useOverlay(ROUTE, OVERLAY_KEY);

  return (
    <>
      <section className="ftco-section">
        <div className="container-fluid px-md-4">
          <div className="row">
            <div className="col-md-3 ftco-animate">
              <div
                className="work mb-4 img d-flex align-items-end"
                style={{ backgroundImage: `url(${images[0]?.src ?? 'https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-1.jpg'})` }}
              >
                <a
                  href={links[0]?.href ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-1.jpg"}
                  className="icon image-popup d-flex justify-content-center align-items-center"
                >
                  <span className="fa fa-expand"></span>
                </a>
                <div className="desc w-100 px-4">
                  <div className="text w-100 mb-3">
                    <span>{text[0]?.value ?? "Roof cleaning"}</span>
                    <h2>
                      <a href={links[1]?.href ?? "work-single.html"}>{links[1]?.text ?? "Roof Cleaning"}</a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 ftco-animate">
              <div
                className="work mb-4 img d-flex align-items-end"
                style={{ backgroundImage: `url(${images[1]?.src ?? 'https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-2.jpg'})` }}
              >
                <a
                  href={links[2]?.href ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-2.jpg"}
                  className="icon image-popup d-flex justify-content-center align-items-center"
                >
                  <span className="fa fa-expand"></span>
                </a>
                <div className="desc w-100 px-4">
                  <div className="text w-100 mb-3">
                    <span>{text[2]?.value ?? "Driveway"}</span>
                    <h2>
                      <a href={links[3]?.href ?? "work-single.html"}>{links[3]?.text ?? "Gaston Driveway"}</a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 ftco-animate">
              <div
                className="work mb-4 img d-flex align-items-end"
                style={{ backgroundImage: `url(${images[2]?.src ?? 'https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-3.jpg'})` }}
              >
                <a
                  href={links[4]?.href ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-3.jpg"}
                  className="icon image-popup d-flex justify-content-center align-items-center"
                >
                  <span className="fa fa-expand"></span>
                </a>
                <div className="desc w-100 px-4">
                  <div className="text w-100 mb-3">
                    <span>{text[4]?.value ?? "Gutter Cleaning"}</span>
                    <h2>
                      <a href={links[5]?.href ?? "work-single.html"}>{links[5]?.text ?? "Gutter"}</a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 ftco-animate">
              <div
                className="work mb-4 img d-flex align-items-end"
                style={{ backgroundImage: `url(${images[3]?.src ?? 'https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-4.jpg'})` }}
              >
                <a
                  href={links[6]?.href ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-4.jpg"}
                  className="icon image-popup d-flex justify-content-center align-items-center"
                >
                  <span className="fa fa-expand"></span>
                </a>
                <div className="desc w-100 px-4">
                  <div className="text w-100 mb-3">
                    <span>{text[6]?.value ?? "Patio Cleaning"}</span>
                    <h2>
                      <a href={links[7]?.href ?? "work-single.html"}>{links[7]?.text ?? "Patio Cleaning"}</a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 ftco-animate">
              <div
                className="work mb-4 img d-flex align-items-end"
                style={{ backgroundImage: `url(${images[4]?.src ?? 'https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-5.jpg'})` }}
              >
                <a
                  href={links[8]?.href ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-5.jpg"}
                  className="icon image-popup d-flex justify-content-center align-items-center"
                >
                  <span className="fa fa-expand"></span>
                </a>
                <div className="desc w-100 px-4">
                  <div className="text w-100 mb-3">
                    <span>{text[8]?.value ?? "Building Cleaning"}</span>
                    <h2>
                      <a href={links[9]?.href ?? "work-single.html"}>{links[9]?.text ?? "Building Cleaning"}</a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 ftco-animate">
              <div
                className="work mb-4 img d-flex align-items-end"
                style={{ backgroundImage: `url(${images[5]?.src ?? 'https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-6.jpg'})` }}
              >
                <a
                  href={links[10]?.href ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-6.jpg"}
                  className="icon image-popup d-flex justify-content-center align-items-center"
                >
                  <span className="fa fa-expand"></span>
                </a>
                <div className="desc w-100 px-4">
                  <div className="text w-100 mb-3">
                    <span>{text[10]?.value ?? "Building Cleaning"}</span>
                    <h2>
                      <a href={links[11]?.href ?? "work-single.html"}>{links[11]?.text ?? "Hall Way"}</a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 ftco-animate">
              <div
                className="work mb-4 img d-flex align-items-end"
                style={{ backgroundImage: `url(${images[6]?.src ?? 'https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-7.jpg'})` }}
              >
                <a
                  href={links[12]?.href ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-7.jpg"}
                  className="icon image-popup d-flex justify-content-center align-items-center"
                >
                  <span className="fa fa-expand"></span>
                </a>
                <div className="desc w-100 px-4">
                  <div className="text w-100 mb-3">
                    <span>{text[12]?.value ?? "Patio Cleaning"}</span>
                    <h2>
                      <a href={links[13]?.href ?? "work-single.html"}>{links[13]?.text ?? "Garden Cleaning"}</a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 ftco-animate">
              <div
                className="work mb-4 img d-flex align-items-end"
                style={{ backgroundImage: `url(${images[7]?.src ?? 'https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-8.jpg'})` }}
              >
                <a
                  href={links[14]?.href ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/gallery-8.jpg"}
                  className="icon image-popup d-flex justify-content-center align-items-center"
                >
                  <span className="fa fa-expand"></span>
                </a>
                <div className="desc w-100 px-4">
                  <div className="text w-100 mb-3">
                    <span>{text[14]?.value ?? "Office"}</span>
                    <h2>
                      <a href={links[15]?.href ?? "work-single.html"}>{links[15]?.text ?? "Office Cleaning"}</a>
                    </h2>
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