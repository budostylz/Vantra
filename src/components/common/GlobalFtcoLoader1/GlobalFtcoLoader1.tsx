import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";
export default function GlobalFtcoLoader1() {
  // Overlay wiring (auto-injected)
  const ROUTE = "global";
  const OVERLAY_KEY = "globalFtcoLoader1";
  const { node: globalFtcoLoader1Overlay, text, links, images, variables } = useOverlay(ROUTE, OVERLAY_KEY);

  return (
    <>
      <div id="ftco-loader" className="show fullscreen">
        <svg className="circular" width="48px" height="48px">
          <circle className="path-bg" cx="24" cy="24" r="22" fill="none" strokeWidth="4" stroke="#eeeeee"></circle>
          <circle className="path" cx="24" cy="24" r="22" fill="none" strokeWidth="4" strokeMiterlimit="10" stroke="#F96D00"></circle>
        </svg>
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