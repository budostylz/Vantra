import React from 'react';
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

export default function Sec1() {
  // Overlay wiring (auto-injected)
  const ROUTE = "/blog";
  const OVERLAY_KEY = "sec1";
  const { node: sec1Overlay, text, links, images, variables } = useOverlay(ROUTE, OVERLAY_KEY);

  return (
    <>
      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row d-flex">
            <div className="col-md-4 d-flex ftco-animate">
              <div className="blog-entry align-self-stretch">
                <a
                  href={links[0]?.href ?? "blog-single.html"}
                  className="block-20 rounded"
                  style={{ backgroundImage: `url(${images[0]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_1.jpg"})` }}
                ></a>
                <div className="text p-4">
                  <div className="meta mb-2">
                    <div><a href={links[1]?.href ?? "#"}>{links[1]?.text ?? "June 14, 2020"}</a></div>
                    <div><a href={links[2]?.href ?? "#"}>{links[2]?.text ?? "Admin"}</a></div>
                    <div>
                      <a href={links[3]?.href ?? "#"} className="meta-chat">
                        <span className="fa fa-comment"></span> {links[3]?.text ?? "3"}
                      </a>
                    </div>
                  </div>
                  <h3 className="heading">
                    <a href={links[4]?.href ?? "#"}>
                      {links[4]?.text ?? "Even the all-powerful Pointing has no control about the blind texts"}
                    </a>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex ftco-animate">
              <div className="blog-entry align-self-stretch">
                <a
                  href={links[5]?.href ?? "blog-single.html"}
                  className="block-20 rounded"
                  style={{ backgroundImage: `url(${images[1]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_2.jpg"})` }}
                ></a>
                <div className="text p-4">
                  <div className="meta mb-2">
                    <div><a href={links[6]?.href ?? "#"}>{links[6]?.text ?? "June 14, 2020"}</a></div>
                    <div><a href={links[7]?.href ?? "#"}>{links[7]?.text ?? "Admin"}</a></div>
                    <div>
                      <a href={links[8]?.href ?? "#"} className="meta-chat">
                        <span className="fa fa-comment"></span> {links[8]?.text ?? "3"}
                      </a>
                    </div>
                  </div>
                  <h3 className="heading">
                    <a href={links[9]?.href ?? "#"}>
                      {links[9]?.text ?? "Even the all-powerful Pointing has no control about the blind texts"}
                    </a>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex ftco-animate">
              <div className="blog-entry align-self-stretch">
                <a
                  href={links[10]?.href ?? "blog-single.html"}
                  className="block-20 rounded"
                  style={{ backgroundImage: `url(${images[2]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_3.jpg"})` }}
                ></a>
                <div className="text p-4">
                  <div className="meta mb-2">
                    <div><a href={links[11]?.href ?? "#"}>{links[11]?.text ?? "June 14, 2020"}</a></div>
                    <div><a href={links[12]?.href ?? "#"}>{links[12]?.text ?? "Admin"}</a></div>
                    <div>
                      <a href={links[13]?.href ?? "#"} className="meta-chat">
                        <span className="fa fa-comment"></span> {links[13]?.text ?? "3"}
                      </a>
                    </div>
                  </div>
                  <h3 className="heading">
                    <a href={links[14]?.href ?? "#"}>
                      {links[14]?.text ?? "Even the all-powerful Pointing has no control about the blind texts"}
                    </a>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex ftco-animate">
              <div className="blog-entry align-self-stretch">
                <a
                  href={links[15]?.href ?? "blog-single.html"}
                  className="block-20 rounded"
                  style={{ backgroundImage: `url(${images[3]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_4.jpg"})` }}
                ></a>
                <div className="text p-4">
                  <div className="meta mb-2">
                    <div><a href={links[16]?.href ?? "#"}>{links[16]?.text ?? "June 14, 2020"}</a></div>
                    <div><a href={links[17]?.href ?? "#"}>{links[17]?.text ?? "Admin"}</a></div>
                    <div>
                      <a href={links[18]?.href ?? "#"} className="meta-chat">
                        <span className="fa fa-comment"></span> {links[18]?.text ?? "3"}
                      </a>
                    </div>
                  </div>
                  <h3 className="heading">
                    <a href={links[19]?.href ?? "#"}>
                      {links[19]?.text ?? "Even the all-powerful Pointing has no control about the blind texts"}
                    </a>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex ftco-animate">
              <div className="blog-entry align-self-stretch">
                <a
                  href={links[20]?.href ?? "blog-single.html"}
                  className="block-20 rounded"
                  style={{ backgroundImage: `url(${images[4]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_5.jpg"})` }}
                ></a>
                <div className="text p-4">
                  <div className="meta mb-2">
                    <div><a href={links[21]?.href ?? "#"}>{links[21]?.text ?? "June 14, 2020"}</a></div>
                    <div><a href={links[22]?.href ?? "#"}>{links[22]?.text ?? "Admin"}</a></div>
                    <div>
                      <a href={links[23]?.href ?? "#"} className="meta-chat">
                        <span className="fa fa-comment"></span> {links[23]?.text ?? "3"}
                      </a>
                    </div>
                  </div>
                  <h3 className="heading">
                    <a href={links[24]?.href ?? "#"}>
                      {links[24]?.text ?? "Even the all-powerful Pointing has no control about the blind texts"}
                    </a>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex ftco-animate">
              <div className="blog-entry align-self-stretch">
                <a
                  href={links[25]?.href ?? "blog-single.html"}
                  className="block-20 rounded"
                  style={{ backgroundImage: `url(${images[5]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/image_6.jpg"})` }}
                ></a>
                <div className="text p-4">
                  <div className="meta mb-2">
                    <div><a href={links[26]?.href ?? "#"}>{links[26]?.text ?? "June 14, 2020"}</a></div>
                    <div><a href={links[27]?.href ?? "#"}>{links[27]?.text ?? "Admin"}</a></div>
                    <div>
                      <a href={links[28]?.href ?? "#"} className="meta-chat">
                        <span className="fa fa-comment"></span> {links[28]?.text ?? "3"}
                      </a>
                    </div>
                  </div>
                  <h3 className="heading">
                    <a href={links[29]?.href ?? "#"}>
                      {links[29]?.text ?? "Even the all-powerful Pointing has no control about the blind texts"}
                    </a>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col text-center">
              <div className="block-27">
                <ul>
                  <li><a href={links[30]?.href ?? "#"}>{links[30]?.text ?? "<"}</a></li>
                  <li className="active"><span>1</span></li>
                  <li><a href={links[31]?.href ?? "#"}>{links[31]?.text ?? "2"}</a></li>
                  <li><a href={links[32]?.href ?? "#"}>{links[32]?.text ?? "3"}</a></li>
                  <li><a href={links[33]?.href ?? "#"}>{links[33]?.text ?? "4"}</a></li>
                  <li><a href={links[34]?.href ?? "#"}>{links[34]?.text ?? "5"}</a></li>
                  <li><a href={links[35]?.href ?? "#"}>{links[35]?.text ?? ">"}</a></li>
                </ul>
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