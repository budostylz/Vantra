import React from 'react';
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

const Footer: React.FC = () => {
  // Overlay wiring (auto-injected)
  const ROUTE = "global";
  const OVERLAY_KEY = "footer";
  const { node: footerOverlay, text, links, images, variables } = useOverlay(ROUTE, OVERLAY_KEY);

  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-3 mb-4 mb-md-0">
              <h2 className="footer-heading">{text[0]?.value ?? "Pressure Washing"}</h2>
              <p>{text[1]?.value ?? "A small river named Duden flows by their place and supplies it with the necessary regelialia."}</p>
              <ul className="ftco-footer-social p-0">
                <li className="ftco-animate">
                  <a href={links[0]?.href ?? "#"} data-toggle="tooltip" data-placement="top" title="Twitter">
                    <span className="fa fa-twitter"></span>
                  </a>
                </li>
                <li className="ftco-animate">
                  <a href={links[1]?.href ?? "#"} data-toggle="tooltip" data-placement="top" title="Facebook">
                    <span className="fa fa-facebook"></span>
                  </a>
                </li>
                <li className="ftco-animate">
                  <a href={links[2]?.href ?? "#"} data-toggle="tooltip" data-placement="top" title="Instagram">
                    <span className="fa fa-instagram"></span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-6 col-lg-3 mb-4 mb-md-0">
              <h2 className="footer-heading">{text[2]?.value ?? "Latest News"}</h2>
              <div className="block-21 mb-4 d-flex">
                <a className="img mr-4 rounded" style={{ backgroundImage: `url(${images[0]?.src ?? 'https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_1.jpg'})` }}></a>
                <div className="text">
                  <h3 className="heading">
                    <a href={links[3]?.href ?? "#"}>{links[3]?.text ?? "Even the all-powerful Pointing has no control about"}</a>
                  </h3>
                  <div className="meta">
                    <div><a href={links[4]?.href ?? "#"}>{links[4]?.text ?? "Jun 14, 2020"}</a></div>
                    <div><a href={links[5]?.href ?? "#"}>{links[5]?.text ?? "Admin"}</a></div>
                    <div><a href={links[6]?.href ?? "#"}>{links[6]?.text ?? "19"}</a></div>
                  </div>
                </div>
              </div>
              <div className="block-21 mb-4 d-flex">
                <a className="img mr-4 rounded" style={{ backgroundImage: `url(${images[1]?.src ?? 'https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_2.jpg'})` }}></a>
                <div className="text">
                  <h3 className="heading">
                    <a href={links[7]?.href ?? "#"}>{links[7]?.text ?? "Even the all-powerful Pointing has no control about"}</a>
                  </h3>
                  <div className="meta">
                    <div><a href={links[8]?.href ?? "#"}>{links[8]?.text ?? "Jun 14, 2020"}</a></div>
                    <div><a href={links[9]?.href ?? "#"}>{links[9]?.text ?? "Admin"}</a></div>
                    <div><a href={links[10]?.href ?? "#"}>{links[10]?.text ?? "19"}</a></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 pl-lg-5 mb-4 mb-md-0">
              <h2 className="footer-heading">{text[11]?.value ?? "Quick Links"}</h2>
              <ul className="list-unstyled">
                <li><a href={links[11]?.href ?? "#"} className="py-2 d-block">{links[11]?.text ?? "Home"}</a></li>
                <li><a href={links[12]?.href ?? "#"} className="py-2 d-block">{links[12]?.text ?? "About"}</a></li>
                <li><a href={links[13]?.href ?? "#"} className="py-2 d-block">{links[13]?.text ?? "Services"}</a></li>
                <li><a href={links[14]?.href ?? "#"} className="py-2 d-block">{links[14]?.text ?? "Works"}</a></li>
                <li><a href={links[15]?.href ?? "#"} className="py-2 d-block">{links[15]?.text ?? "Blog"}</a></li>
                <li><a href={links[16]?.href ?? "#"} className="py-2 d-block">{links[16]?.text ?? "Contact"}</a></li>
              </ul>
            </div>
            <div className="col-md-6 col-lg-3 mb-4 mb-md-0">
              <h2 className="footer-heading">{text[18]?.value ?? "Have a Questions?"}</h2>
              <div className="block-23 mb-3">
                <ul>
                  <li>
                    <span className="icon fa fa-map"></span>
                    <span className="text">{text[19]?.value ?? "203 Fake St. Mountain View, San Francisco, California, USA"}</span>
                  </li>
                  <li>
                    <a href={links[17]?.href ?? "#"}>
                      <span className="icon fa fa-phone"></span>
                      <span className="text">{links[17]?.text ?? "+2 392 3929 210"}</span>
                    </a>
                  </li>
                  <li>
                    <a href={links[18]?.href ?? "#"}>
                      <span className="icon fa fa-paper-plane"></span>
                      <span className="text">{links[18]?.text ?? "info@yourdomain.com"}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-12 text-center">
              <p className="copyright">
                {text[22]?.value ?? "© "} {currentYear} {text[23]?.value ?? " Crafted with passion "} <i className="fa fa-rocket" aria-hidden="true" /> {text[24]?.value ?? " on "} &nbsp;
                <a href={links[19]?.href ?? "https://budoboost.ai"} target="_blank">{links[19]?.text ?? "BudoBoost.ai"}</a>
                &nbsp;{text[25]?.value ?? " — Empowering creators to launch beautiful sites in minutes."}
              </p>
            </div>
          </div>
        </div>
      </footer>
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
};

export default Footer;