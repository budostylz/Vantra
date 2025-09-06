import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";
export default function MapWrap() {
  // Overlay wiring (auto-injected)
  const ROUTE = "global";
  const OVERLAY_KEY = "mapWrap";
  const { node: mapWrapOverlay, text, links, images, variables } = useOverlay(ROUTE, OVERLAY_KEY);

  return (
    <>
      <div id="map" className="map"></div>
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