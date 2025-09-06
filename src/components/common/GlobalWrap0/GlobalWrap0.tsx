import React from 'react';
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

export default function GlobalWrap0() {
  // Overlay wiring (auto-injected)
  const ROUTE = "global";
  const OVERLAY_KEY = "globalWrap0";
  const { node: globalWrap0Overlay, text, links, images, variables } = useOverlay(ROUTE, OVERLAY_KEY);

  return (
    <>
      <div className="wrap">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center">
              <p className="mb-0 phone pl-md-2">
                <a href={links[0]?.href ?? "#"} className="mr-2">
                  <span className="fa fa-phone mr-1"></span> {links[0]?.text ?? "+00 1234 567"}
                </a>
                <a href={links[1]?.href ?? "#"}>
                  <span className="fa fa-paper-plane mr-1"></span> {links[1]?.text ?? "youremail@email.com"}
                </a>
              </p>
            </div>
            <div className="col-md-6 d-flex justify-content-md-end">
              <div className="social-media">
                <p className="mb-0 d-flex">
                  <a href={links[2]?.href ?? "#"} className="d-flex align-items-center justify-content-center">
                    <span className="fa fa-facebook">
                      <i className="sr-only">{links[2]?.text ?? "Facebook"}</i>
                    </span>
                  </a>
                  <a href={links[3]?.href ?? "#"} className="d-flex align-items-center justify-content-center">
                    <span className="fa fa-twitter">
                      <i className="sr-only">{links[3]?.text ?? "Twitter"}</i>
                    </span>
                  </a>
                  <a href={links[4]?.href ?? "#"} className="d-flex align-items-center justify-content-center">
                    <span className="fa fa-instagram">
                      <i className="sr-only">{links[4]?.text ?? "Instagram"}</i>
                    </span>
                  </a>
                  <a href={links[5]?.href ?? "#"} className="d-flex align-items-center justify-content-center">
                    <span className="fa fa-dribbble">
                      <i className="sr-only">{links[5]?.text ?? "Dribbble"}</i>
                    </span>
                  </a>
                </p>
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
    </>
  );
}