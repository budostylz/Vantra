import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

export default function Sec0() {
  // Overlay wiring (auto-injected)
  const ROUTE = "/home";
  const OVERLAY_KEY = "sec0";
  const { node: sec0Overlay, text, links, images, variables } = useOverlay(ROUTE, OVERLAY_KEY);

  return (
    <>
      <section className="ftco-section ftco-no-pt ftco-no-pb">
        <div className="container">
          <div className="row d-flex no-gutters">
            <div className="col-md-5 d-flex">
              <div
                className="img img-video d-flex align-self-stretch align-items-center justify-content-center justify-content-md-center mb-4 mb-sm-0"
                style={{ backgroundImage: `url(${images[0]?.src ?? "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/pressurewashing-3365cccdb5/images/about-1.jpg"})` }}
              ></div>
            </div>
            <div className="col-md-7 pl-md-5 py-md-5">
              <div className="heading-section pt-md-5">
                <h2 className="mb-4">{text[0]?.value ?? "Why Choose Us?"}</h2>
              </div>
              <div className="row">
                <div className="col-md-6 services-2 w-100 d-flex">
                  <div className="icon d-flex align-items-center justify-content-center">
                    <span className="flaticon-confetti"></span>
                  </div>
                  <div className="text pl-3">
                    <h4>{text[1]?.value ?? "50 Years of Service"}</h4>
                    <p>{text[2]?.value ?? "Far far away, behind the word mountains, far from the countries."}</p>
                  </div>
                </div>
                <div className="col-md-6 services-2 w-100 d-flex">
                  <div className="icon d-flex align-items-center justify-content-center">
                    <span className="flaticon-consult"></span>
                  </div>
                  <div className="text pl-3">
                    <h4>{text[3]?.value ?? "Professional & Experienced Staff"}</h4>
                    <p>{text[4]?.value ?? "Far far away, behind the word mountains, far from the countries."}</p>
                  </div>
                </div>
                <div className="col-md-6 services-2 w-100 d-flex">
                  <div className="icon d-flex align-items-center justify-content-center">
                    <span className="flaticon-winner"></span>
                  </div>
                  <div className="text pl-3">
                    <h4>{text[5]?.value ?? "High Quality & Reliable Service"}</h4>
                    <p>{text[6]?.value ?? "Far far away, behind the word mountains, far from the countries."}</p>
                  </div>
                </div>
                <div className="col-md-6 services-2 w-100 d-flex">
                  <div className="icon d-flex align-items-center justify-content-center">
                    <span className="flaticon-technical"></span>
                  </div>
                  <div className="text pl-3">
                    <h4>{text[7]?.value ?? "Customer Service & Expert Advice"}</h4>
                    <p>{text[8]?.value ?? "Far far away, behind the word mountains, far from the countries."}</p>
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