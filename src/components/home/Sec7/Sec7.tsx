import React from 'react';
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

export default function Sec7() {
  // Overlay wiring (auto-injected)
  const ROUTE = "/home";
  const OVERLAY_KEY = "sec7";
  const { node: sec7Overlay, text, links, images, variables } = useOverlay(ROUTE, OVERLAY_KEY);

  return (
    <>
      <section className="ftco-appointment ftco-section ftco-no-pt ftco-no-pb img" style={{ backgroundImage: `url(${images[0]?.src ?? 'https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/bg_3.jpg'})` }}>
        <div className="overlay"></div>
        <div className="container">
          <div className="row d-md-flex justify-content-center">
            <div className="col-md-12 col-lg-8 half p-3 py-5 pl-lg-5 ftco-animate">
              <h2 className="mb-4">{text[0]?.value ?? "Free Consultation"}</h2>
              <form action="#" className="appointment">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <div className="form-field">
                        <div className="select-wrap">
                          <div className="icon">
                            <span className="fa fa-chevron-down"></span>
                          </div>
                          <select name="" id="" className="form-control">
                            <option value="">{text[1]?.value ?? "Select services"}</option>
                            <option value="">{text[2]?.value ?? "House Washing"}</option>
                            <option value="">{text[3]?.value ?? "Roof Cleaning"}</option>
                            <option value="">{text[4]?.value ?? "Driveway Cleaning"}</option>
                            <option value="">{text[5]?.value ?? "Gutter Cleaning"}</option>
                            <option value="">{text[6]?.value ?? "Patio Cleaning"}</option>
                            <option value="">{text[7]?.value ?? "Building Cleaning"}</option>
                            <option value="">{text[8]?.value ?? "Concrete Cleaning"}</option>
                            <option value="">{text[9]?.value ?? "Sidewal Cleaning"}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="input-wrap">
                        <div className="icon">
                          <span className="fa fa-user"></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Your Name" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="input-wrap">
                        <div className="icon">
                          <span className="fa fa-paper-plane"></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Email Address" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="input-wrap">
                        <div className="icon">
                          <span className="fa fa-calendar"></span>
                        </div>
                        <input type="text" className="form-control appointment_date" placeholder="Date" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="input-wrap">
                        <div className="icon">
                          <span className="fa fa-clock-o"></span>
                        </div>
                        <input type="text" className="form-control appointment_time" placeholder="Time" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <textarea name="" id="" cols={30} rows={7} className="form-control" placeholder="Message"></textarea>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input type="submit" value={text[10]?.value ?? "Send message"} className="btn btn-primary py-3 px-4" />
                    </div>
                  </div>
                </div>
              </form>
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