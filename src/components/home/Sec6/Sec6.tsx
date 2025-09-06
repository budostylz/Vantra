import React from 'react';
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

export default function Sec6() {
  // Overlay wiring (auto-injected)
  const ROUTE = "/home";
  const OVERLAY_KEY = "sec6";
  const { node: sec6Overlay, text, links, images, variables } = useOverlay(ROUTE, OVERLAY_KEY);

  return (
    <>
      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row justify-content-center pb-5 mb-3">
            <div className="col-md-7 heading-section text-center ftco-animate">
              <h2>{text[0]?.value ?? "Latest news from our blog"}</h2>
            </div>
          </div>
          <div className="row d-flex">
            <div className="col-md-4 d-flex ftco-animate">
              <div className="blog-entry align-self-stretch">
                <a href={links[0]?.href ?? "blog-single.html"} className="block-20 rounded" style={{ backgroundImage: `url(${images[0]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_1.jpg"})` }}></a>
                <div className="text p-4">
                  <div className="meta mb-2">
                    <div><a href={links[1]?.href ?? "#"}>{links[1]?.text ?? "June 14, 2020"}</a></div>
                    <div><a href={links[2]?.href ?? "#"}>{links[2]?.text ?? "Admin"}</a></div>
                    <div><a href={links[3]?.href ?? "#"} className="meta-chat"><span className="fa fa-comment"></span> {links[3]?.text ?? "3"}</a></div>
                  </div>
                  <h3 className="heading"><a href={links[4]?.href ?? "#"}>{links[4]?.text ?? "Even the all-powerful Pointing has no control about the blind texts"}</a></h3>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex ftco-animate">
              <div className="blog-entry align-self-stretch">
                <a href={links[5]?.href ?? "blog-single.html"} className="block-20 rounded" style={{ backgroundImage: `url(${images[1]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_2.jpg"})` }}></a>
                <div className="text p-4">
                  <div className="meta mb-2">
                    <div><a href={links[6]?.href ?? "#"}>{links[6]?.text ?? "June 14, 2020"}</a></div>
                    <div><a href={links[7]?.href ?? "#"}>{links[7]?.text ?? "Admin"}</a></div>
                    <div><a href={links[8]?.href ?? "#"} className="meta-chat"><span className="fa fa-comment"></span> {links[8]?.text ?? "3"}</a></div>
                  </div>
                  <h3 className="heading"><a href={links[9]?.href ?? "#"}>{links[9]?.text ?? "Even the all-powerful Pointing has no control about the blind texts"}</a></h3>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex ftco-animate">
              <div className="blog-entry align-self-stretch">
                <a href={links[10]?.href ?? "blog-single.html"} className="block-20 rounded" style={{ backgroundImage: `url(${images[2]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_3.jpg"})` }}></a>
                <div className="text p-4">
                  <div className="meta mb-2">
                    <div><a href={links[11]?.href ?? "#"}>{links[11]?.text ?? "June 14, 2020"}</a></div>
                    <div><a href={links[12]?.href ?? "#"}>{links[12]?.text ?? "Admin"}</a></div>
                    <div><a href={links[13]?.href ?? "#"} className="meta-chat"><span className="fa fa-comment"></span> {links[13]?.text ?? "3"}</a></div>
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