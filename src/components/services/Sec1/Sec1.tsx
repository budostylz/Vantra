import React from 'react';
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

export default function Sec1() {
  // Overlay wiring (auto-injected)
  const ROUTE = "/services";
  const OVERLAY_KEY = "sec1";
  const { node: sec1Overlay, text, links, images, variables } = useOverlay(ROUTE, OVERLAY_KEY);

  return (
    <>
      <section className="ftco-section ftco-intro bg-light">
        <div className="container">
          <div className="row justify-content-center pb-5 mb-3">
            <div className="col-md-7 heading-section text-center ftco-animate">
              <h2>{text[0]?.value ?? "Pressure Washing Services"}</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 d-flex align-self-stretch ftco-animate">
              <div className="d-block services">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="flaticon-cleaning"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">{text[1]?.value ?? "House Washing"}</h3>
                  <p>{text[2]?.value ?? "Far far away, behind the word mountains, far from the countries."}</p>
                  <a href={links[0]?.href ?? "#"} className="btn-custom d-flex align-items-center justify-content-center">
                    <span className="fa fa-chevron-right"></span>
                    <i className="sr-only">{links[0]?.text ?? "Read more"}</i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3 d-flex align-self-stretch ftco-animate">
              <div className="d-block services">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="flaticon-joist"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">{text[3]?.value ?? "Roof Cleaning"}</h3>
                  <p>{text[4]?.value ?? "Far far away, behind the word mountains, far from the countries."}</p>
                  <a href={links[1]?.href ?? "#"} className="btn-custom d-flex align-items-center justify-content-center">
                    <span className="fa fa-chevron-right"></span>
                    <i className="sr-only">{links[1]?.text ?? "Read more"}</i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3 d-flex align-self-stretch ftco-animate">
              <div className="d-block services">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="flaticon-road"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">{text[5]?.value ?? "Driveway Cleaning"}</h3>
                  <p>{text[6]?.value ?? "Far far away, behind the word mountains, far from the countries."}</p>
                  <a href={links[2]?.href ?? "#"} className="btn-custom d-flex align-items-center justify-content-center">
                    <span className="fa fa-chevron-right"></span>
                    <i className="sr-only">{links[2]?.text ?? "Read more"}</i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3 d-flex align-self-stretch ftco-animate">
              <div className="d-block services">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="flaticon-pipe"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">{text[7]?.value ?? "Gutter Cleaning"}</h3>
                  <p>{text[8]?.value ?? "Far far away, behind the word mountains, far from the countries."}</p>
                  <a href={links[3]?.href ?? "#"} className="btn-custom d-flex align-items-center justify-content-center">
                    <span className="fa fa-chevron-right"></span>
                    <i className="sr-only">{links[3]?.text ?? "Read more"}</i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3 d-flex align-self-stretch ftco-animate">
              <div className="d-block services">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="flaticon-kitchen"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">{text[9]?.value ?? "Patio Cleaning"}</h3>
                  <p>{text[10]?.value ?? "Far far away, behind the word mountains, far from the countries."}</p>
                  <a href={links[4]?.href ?? "#"} className="btn-custom d-flex align-items-center justify-content-center">
                    <span className="fa fa-chevron-right"></span>
                    <i className="sr-only">{links[4]?.text ?? "Read more"}</i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3 d-flex align-self-stretch ftco-animate">
              <div className="d-block services">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="flaticon-brickwall"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">{text[11]?.value ?? "Building Cleaning"}</h3>
                  <p>{text[12]?.value ?? "Far far away, behind the word mountains, far from the countries."}</p>
                  <a href={links[5]?.href ?? "#"} className="btn-custom d-flex align-items-center justify-content-center">
                    <span className="fa fa-chevron-right"></span>
                    <i className="sr-only">{links[5]?.text ?? "Read more"}</i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3 d-flex align-self-stretch ftco-animate">
              <div className="d-block services">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="flaticon-wall"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">{text[13]?.value ?? "Concrete Cleaning"}</h3>
                  <p>{text[14]?.value ?? "Far far away, behind the word mountains, far from the countries."}</p>
                  <a href={links[6]?.href ?? "#"} className="btn-custom d-flex align-items-center justify-content-center">
                    <span className="fa fa-chevron-right"></span>
                    <i className="sr-only">{links[6]?.text ?? "Read more"}</i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3 d-flex align-self-stretch ftco-animate">
              <div className="d-block services">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="flaticon-rajpath"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">{text[15]?.value ?? "Sidewalk Cleaning"}</h3>
                  <p>{text[16]?.value ?? "Far far away, behind the word mountains, far from the countries."}</p>
                  <a href={links[7]?.href ?? "#"} className="btn-custom d-flex align-items-center justify-content-center">
                    <span className="fa fa-chevron-right"></span>
                    <i className="sr-only">{links[7]?.text ?? "Read more"}</i>
                  </a>
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