import React from 'react';
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

export default function Sec3() {
  // Overlay wiring (auto-injected)
  const ROUTE = "/about";
  const OVERLAY_KEY = "sec3";
  const { node: sec3Overlay, text, links, images, variables } = useOverlay(ROUTE, OVERLAY_KEY);

  return (
    <section className="ftco-section testimony-section bg-light">
      <div className="overlay"></div>
      <div className="container">
        <div className="row justify-content-center pb-5">
          <div className="col-md-7 heading-section text-center ftco-animate">
            <h2>{text[0]?.value ?? "Happy Clients & Feedbacks"}</h2>
          </div>
        </div>
        <div className="row ftco-animate">
          <div className="col-md-12">
            <div className="carousel-testimony owl-carousel">
              <div className="item">
                <div className="testimony-wrap d-flex">
                  <div className="user-img" style={{ backgroundImage: `url(${images[0]?.src ?? 'https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/person_1.jpg'})` }}></div>
                  <div className="text pl-4">
                    <span className="quote d-flex align-items-center justify-content-center">
                      <i className="fa fa-quote-left"></i>
                    </span>
                    <p className="rate">
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                    </p>
                    <p>{text[1]?.value ?? "Far far away, behind the word mountains, far from the countries Vokalia"}</p>
                    <p className="name">{text[2]?.value ?? "Racky Henderson"}</p>
                    <span className="position">{text[3]?.value ?? "Father"}</span>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="testimony-wrap d-flex">
                  <div className="user-img" style={{ backgroundImage: `url(${images[1]?.src ?? 'https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/person_2.jpg'})` }}></div>
                  <div className="text pl-4">
                    <span className="quote d-flex align-items-center justify-content-center">
                      <i className="fa fa-quote-left"></i>
                    </span>
                    <p className="rate">
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                    </p>
                    <p>{text[4]?.value ?? "Far far away, behind the word mountains, far from the countries Vokalia"}</p>
                    <p className="name">{text[5]?.value ?? "Henry Dee"}</p>
                    <span className="position">{text[6]?.value ?? "Businesswoman"}</span>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="testimony-wrap d-flex">
                  <div className="user-img" style={{ backgroundImage: `url(${images[2]?.src ?? 'https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/person_3.jpg'})` }}></div>
                  <div className="text pl-4">
                    <span className="quote d-flex align-items-center justify-content-center">
                      <i className="fa fa-quote-left"></i>
                    </span>
                    <p className="rate">
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                    </p>
                    <p>{text[7]?.value ?? "Far far away, behind the word mountains, far from the countries Vokalia"}</p>
                    <p className="name">{text[8]?.value ?? "Mark Huff"}</p>
                    <span className="position">{text[9]?.value ?? "Businesswoman"}</span>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="testimony-wrap d-flex">
                  <div className="user-img" style={{ backgroundImage: `url(${images[3]?.src ?? 'https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/person_4.jpg'})` }}></div>
                  <div className="text pl-4">
                    <span className="quote d-flex align-items-center justify-content-center">
                      <i className="fa fa-quote-left"></i>
                    </span>
                    <p className="rate">
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                    </p>
                    <p>{text[10]?.value ?? "Far far away, behind the word mountains, far from the countries Vokalia"}</p>
                    <p className="name">{text[11]?.value ?? "Rodel Golez"}</p>
                    <span className="position">{text[12]?.value ?? "Businesswoman"}</span>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="testimony-wrap d-flex">
                  <div className="user-img" style={{ backgroundImage: `url(${images[4]?.src ?? 'https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/person_1.jpg'})` }}></div>
                  <div className="text pl-4">
                    <span className="quote d-flex align-items-center justify-content-center">
                      <i className="fa fa-quote-left"></i>
                    </span>
                    <p className="rate">
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                    </p>
                    <p>{text[13]?.value ?? "Far far away, behind the word mountains, far from the countries Vokalia"}</p>
                    <p className="name">{text[14]?.value ?? "Ken Bosh"}</p>
                    <span className="position">{text[15]?.value ?? "Businesswoman"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    </section>
  );
}