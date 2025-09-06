import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

export default function Sec1() {
  // Overlay wiring (auto-injected)
  const ROUTE = "/home";
  const OVERLAY_KEY = "sec1";
  const { node: sec1Overlay, text, links, images, variables } = useOverlay(ROUTE, OVERLAY_KEY);

  return (
    <>
      <section className="ftco-counter" id="section-counter">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-5 mb-md-0 text-center text-md-left">
              <h2 className="font-weight-bold" style={{ color: '#fff', fontSize: '20px' }}>
                {text[0]?.value ?? "We Provide Free Quotation"}
              </h2>
              <a href={links[0]?.href ?? "#"} className="btn btn-white btn-outline-white">
                {links[0]?.text ?? "Free Consultation"}
              </a>
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate">
                  <div className="block-18 text-center">
                    <div className="text">
                      <strong className="number" data-number="50">0</strong>
                    </div>
                    <div className="text">
                      <span>{text[2]?.value ?? "Customer"}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate">
                  <div className="block-18 text-center">
                    <div className="text">
                      <strong className="number" data-number="8500">0</strong>
                    </div>
                    <div className="text">
                      <span>{text[3]?.value ?? "Professionals"}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate">
                  <div className="block-18 text-center">
                    <div className="text">
                      <strong className="number" data-number="20">0</strong>
                    </div>
                    <div className="text">
                      <span>{text[4]?.value ?? "Products"}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 d-flex justify-content-center counter-wrap ftco-animate">
                  <div className="block-18 text-center">
                    <div className="text">
                      <strong className="number" data-number="50">0</strong>
                    </div>
                    <div className="text">
                      <span>{text[5]?.value ?? "Pets Hosted"}</span>
                    </div>
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