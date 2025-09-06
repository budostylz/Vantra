import React from 'react';
import { useOverlay } from "@/store/hooks";
import OverlayEditor from "@/components/dev/OverlayEditor";

const Navbar: React.FC = () => {
  // Overlay wiring (auto-injected)
  const ROUTE = "global";
  const OVERLAY_KEY = "navbar";
  const { node: navbarOverlay, text, links, images, variables } = useOverlay(ROUTE, OVERLAY_KEY);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
        <div className="container">
          <a className="navbar-brand" href={links[0]?.href ?? "index.html"}>
            {links[0]?.text ?? "Pressure"} <span>{text[1]?.value ?? "Washing"}</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="fa fa-bars"></span> {text[2]?.value ?? "Menu"}
          </button>
          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href={links[1]?.href ?? "index.html"} className="nav-link">
                  {links[1]?.text ?? "Home"}
                </a>
              </li>
              <li className="nav-item">
                <a href={links[2]?.href ?? "about.html"} className="nav-link">
                  {links[2]?.text ?? "About"}
                </a>
              </li>
              <li className="nav-item active">
                <a href={links[3]?.href ?? "services.html"} className="nav-link">
                  {links[3]?.text ?? "Services"}
                </a>
              </li>
              <li className="nav-item">
                <a href={links[4]?.href ?? "gallery.html"} className="nav-link">
                  {links[4]?.text ?? "Gallery"}
                </a>
              </li>
              <li className="nav-item">
                <a href={links[5]?.href ?? "blog.html"} className="nav-link">
                  {links[5]?.text ?? "Blog"}
                </a>
              </li>
              <li className="nav-item">
                <a href={links[6]?.href ?? "contact.html"} className="nav-link">
                  {links[6]?.text ?? "Contact"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
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
};

export default Navbar;