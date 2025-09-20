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

/* NEW: LinkedIn icon */
const LinkedInIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...p}>
    <path fill="currentColor" d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9h4v12H3zM9 9h3.8v1.9h.05c.53-1 1.82-2.05 3.75-2.05 4.01 0 4.75 2.64 4.75 6.08V21h-4v-5.33c0-1.27-.02-2.9-1.77-2.9-1.78 0-2.05 1.38-2.05 2.8V21H9z" />
  </svg>
);

const InstagramIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...p}>
    <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2A2.8 2.8 0 1 0 12 16a2.8 2.8 0 0 0 0-5.6zm5.5-1.7a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z" />
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
                  <a
                    href={links[4]?.href ?? "https://www.instagram.com/"}
                    aria-label="Instagram"
                    className="d-flex"
                    style={socialBtnStyle}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon />
                  </a>
                  <a
                    href={links[2]?.href ?? "https://www.linkedin.com/company/escape-chores-cleaning-services-llc/"}
                    aria-label="LinkedIn"
                    className="d-flex"
                    style={socialBtnStyle}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedInIcon />
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
