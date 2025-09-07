import React, { useMemo } from "react";
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

export default function MapWrap() {
  const ROUTE = "global";
  const OVERLAY_KEY = "mapWrap";
  const { text, links, variables } = useOverlay(ROUTE, OVERLAY_KEY);

  // Index-based helpers (like Navbar)
  const T = (i, fb = "") => text?.[i]?.value ?? fb;
  const L = (i, fb = "") => links?.[i]?.href ?? fb;
  const V = (k: string, fb = "") =>
    (variables as unknown as { key: string; value: string }[])
      ?.find((v) => v.key === k)?.value ?? fb;
  const DEFAULT_ADDRESS = "66 West Flagler St, Suite 900, Miami, Florida, 33186";

  const {
    heading,
    address,
    addressQ,
    iframeSrc,
    height,
    radius,
    openHref,
    dirHref,
    openLabel,
    dirLabel,
  } = useMemo(() => {
    const addr = T(1, DEFAULT_ADDRESS);
    const encoded = encodeURIComponent(addr).replaceAll("%20", "+");
    const q = V("address_q", encoded);

    return {
      heading: T(0, "Our Office"),
      address: addr,
      addressQ: q,
      iframeSrc: L(0) || `https://www.google.com/maps?q=${q}&output=embed`,
      height: V("mapHeight", "400px"),
      radius: V("mapBorderRadius", "12px"),
      openHref: L(1) || `https://www.google.com/maps/search/?api=1&query=${q}`,
      dirHref: L(2) || `https://www.google.com/maps/dir/?api=1&destination=${q}`,
      openLabel: T(2, "Open in Google Maps"),
      dirLabel: T(3, " Get Directions"),
    };
  }, [text, links, variables]);

  return (
    <>
      <div
        className="map"
        style={{ width: "100%", height, borderRadius: radius, overflow: "hidden" }}
      >
        <iframe
          title="Google Map"
          src={iframeSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {(heading || address) && (
        <div className="mt-4" style={{marginLeft:20}}>
          {heading && <h3 className="text-xl font-semibold">{heading}</h3>}
          {address && <p className="text-sm opacity-80">{address}</p>}
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
            <a href={openHref} target="_blank" rel="noreferrer">
              {openLabel}
            </a>
            <a href={dirHref} target="_blank" rel="noreferrer">
              {dirLabel}
            </a>
          </div>

        </div>
      )}

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
