import React from "react";
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

/* === Inline Icons (inherit currentColor) === */
const PhoneIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...p}>
    <path fill="currentColor" d="M21 16.5v3.2c0 .7-.6 1.3-1.3 1.3C9.7 21 3 14.3 2.9 4.3 2.9 3.6 3.5 3 4.2 3h3.2c.7 0 1.3.5 1.3 1.2 0 1.1.2 2.2.6 3.1.2.5 0 1-.3 1.4L7.9 10c1.5 2.9 3.8 5.2 6.7 6.7l1.3-1.1c.4-.3.9-.5 1.4-.3 1 .3 2 .6 3.1.6.7 0 1.6.6 1.6 1.6z" />
  </svg>
);

const PaperPlaneIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...p}>
    <path fill="currentColor" d="M22 2 2.5 10.6a1 1 0 0 0 .1 1.9l6.9 2.3 2.3 6.9c.2.6 1 .7 1.4.1L22 2zM9.8 13.7 19 6.2l-8.4 6.9-.8 3.2z" />
  </svg>
);

const FacebookIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...p}>
    <path fill="currentColor" d="M22 12.07C22 6.49 17.52 2 12 2S2 6.49 2 12.07c0 5.01 3.66 9.17 8.44 9.93v-7.02H8.08v-2.9h2.36V9.41c0-2.33 1.39-3.62 3.52-3.62.99 0 2.03.18 2.03.18v2.24h-1.14c-1.12 0-1.47.7-1.47 1.42v1.7h2.5l-.4 2.9h-2.1v7.02C18.34 21.24 22 17.08 22 12.07z" />
  </svg>
);

/* NEW: X (formerly Twitter) icon */
const XIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 512 512" width="1em" height="1em" aria-hidden="true" {...p}>
    <path
      fill="currentColor"
      d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
    />
  </svg>
);

const InstagramIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...p}>
    <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2A2.8 2.8 0 1 0 12 16a2.8 2.8 0 0 0 0-5.6zm5.5-1.7a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z" />
  </svg>
);

const DribbbleIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...p}>
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M4 8.5c4 .5 9 .2 14-3.5M3.5 12.5c5.5-1.2 9 0 12 7M9 3.6c3.2 3.8 5.7 8.5 6.8 16.8" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

/* ===== Component ===== */
export default function GlobalWrap0() {
  const ROUTE = "global";
  const OVERLAY_KEY = "globalWrap0";
  const { text, links } = useOverlay(ROUTE, OVERLAY_KEY);

  const iconStyle: React.CSSProperties = {
    width: "1.05em",
    height: "1.05em",
    verticalAlign: "-0.15em",
    marginRight: 8,
  };
  const socialBtnStyle: React.CSSProperties = {
    width: 34,
    height: 34,
    borderRadius: "50%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 14,
  };

  return (
    <>
      <div className="wrap">
        <div className="container">
          <div className="row">
            {/* Left: phone + email */}
            <div className="col-md-6 d-flex align-items-center">
              <p className="mb-0 phone pl-md-2">
                <a href={links[0]?.href ?? "#"} className="mr-3 d-inline-flex align-items-center">
                  <PhoneIcon style={iconStyle} />
                  <span>{links[0]?.text ?? "+00 1234 567"}</span>
                </a>
                <a href={links[1]?.href ?? "#"} className="d-inline-flex align-items-center">
                  <PaperPlaneIcon style={iconStyle} />
                  <span>{links[1]?.text ?? "youremail@email.com"}</span>
                </a>
              </p>
            </div>

            {/* Right: social icons */}
            <div className="col-md-6 d-flex justify-content-md-end">
              <div className="social-media">
                <p className="mb-0 d-flex align-items-center">
                  <a href={links[2]?.href ?? "#"} aria-label="Facebook" className="d-flex" style={socialBtnStyle}>
                    <FacebookIcon />
                  </a>
                  {/* Replaced Twitter with X */}
                  <a href={links[3]?.href ?? "https://x.com/"} aria-label="X (Twitter)" className="d-flex" style={socialBtnStyle}>
                    <XIcon />
                  </a>
                  <a href={links[4]?.href ?? "https://www.instagram.com/"} aria-label="Instagram" className="d-flex" style={socialBtnStyle}>
                    <InstagramIcon />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editor */}
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
