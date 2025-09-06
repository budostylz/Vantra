import React from 'react';
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

export default function Sec3() {
  // Overlay wiring (auto-injected)
  const ROUTE = "/home";
  const OVERLAY_KEY = "sec3";
  const { node: sec3Overlay, text, links, images, variables } = useOverlay(ROUTE, OVERLAY_KEY);

  return (
    <>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center pb-5">
            <div className="col-md-7 heading-section text-center ftco-animate">
              <h2>{text[0]?.value ?? "Before & After Services"}</h2>
            </div>
          </div>
          <div className="row tabulation mt-4 ftco-animate">
            <div className="col-md-4 order-md-last">
              <ul className="nav nav-pills nav-fill d-md-flex d-block flex-column">
                <li className="nav-item text-left">
                  <a className="nav-link active py-4" data-toggle="tab" href={links[0]?.href ?? "#services-1"}>{links[0]?.text ?? "House Washing"}</a>
                </li>
                <li className="nav-item text-left">
                  <a className="nav-link py-4" data-toggle="tab" href={links[1]?.href ?? "#services-2"}>{links[1]?.text ?? "Roof Cleaning"}</a>
                </li>
                <li className="nav-item text-left">
                  <a className="nav-link py-4" data-toggle="tab" href={links[2]?.href ?? "#services-3"}>{links[2]?.text ?? "Driveway Cleaning"}</a>
                </li>
                <li className="nav-item text-left">
                  <a className="nav-link py-4" data-toggle="tab" href={links[3]?.href ?? "#services-4"}>{links[3]?.text ?? "Gutter Cleaning"}</a>
                </li>
                <li className="nav-item text-left">
                  <a className="nav-link py-4" data-toggle="tab" href={links[4]?.href ?? "#services-5"}>{links[4]?.text ?? "Patio Cleaning"}</a>
                </li>
                <li className="nav-item text-left">
                  <a className="nav-link py-4" data-toggle="tab" href={links[5]?.href ?? "#services-6"}>{links[5]?.text ?? "Building Cleaning"}</a>
                </li>
              </ul>
            </div>
            <div className="col-md-8">
              <div className="tab-content">
                <div className="tab-pane container p-0 active" id="services-1">
                  <div className="img" style={{ backgroundImage: `url(${images[0]?.src ?? 'https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/services-1.jpg'})` }}></div>
                  <h3><a href={links[6]?.href ?? "#"}>{links[6]?.text ?? "House Washing"}</a></h3>
                  <p>{text[8]?.value ?? "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean."}</p>
                </div>
                <div className="tab-pane container p-0 fade" id="services-2">
                  <div className="img" style={{ backgroundImage: `url(${images[1]?.src ?? 'https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/services-2.jpg'})` }}></div>
                  <h3><a href={links[7]?.href ?? "#"}>{links[7]?.text ?? "Roof Cleaning"}</a></h3>
                  <p>{text[10]?.value ?? "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean."}</p>
                </div>
                <div className="tab-pane container p-0 fade" id="services-3">
                  <div className="img" style={{ backgroundImage: `url(${images[2]?.src ?? 'https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/services-3.jpg'})` }}></div>
                  <h3><a href={links[8]?.href ?? "#"}>{links[8]?.text ?? "Driveway Cleaning"}</a></h3>
                  <p>{text[12]?.value ?? "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean."}</p>
                </div>
                <div className="tab-pane container p-0 fade" id="services-4">
                  <div className="img" style={{ backgroundImage: `url(${images[3]?.src ?? 'https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/services-4.jpg'})` }}></div>
                  <h3><a href={links[9]?.href ?? "#"}>{links[9]?.text ?? "Gutter Cleaning"}</a></h3>
                  <p>{text[14]?.value ?? "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean."}</p>
                </div>
                <div className="tab-pane container p-0 fade" id="services-5">
                  <div className="img" style={{ backgroundImage: `url(${images[4]?.src ?? 'https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/services-5.jpg'})` }}></div>
                  <h3><a href={links[10]?.href ?? "#"}>{links[10]?.text ?? "Patio Cleaning"}</a></h3>
                  <p>{text[16]?.value ?? "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean."}</p>
                </div>
                <div className="tab-pane container p-0 fade" id="services-6">
                  <div className="img" style={{ backgroundImage: `url(${images[5]?.src ?? 'https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/services-6.jpg'})` }}></div>
                  <h3><a href={links[11]?.href ?? "#"}>{links[11]?.text ?? "Building Cleaning"}</a></h3>
                  <p>{text[18]?.value ?? "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean."}</p>
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