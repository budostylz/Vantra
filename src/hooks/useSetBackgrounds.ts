import { useEffect, useRef, RefObject } from "react";
function applySetBg(root: Document | HTMLElement) {
  const nodes = root.querySelectorAll<HTMLElement>("[data-setbg]");
  nodes.forEach((n) => {
    const url = n.getAttribute("data-setbg");
    if (!url) return;
    const cur = n.style.backgroundImage?.replace(/["']/g, "");
    const next = `url(${url})`;
    if (cur !== next) n.style.backgroundImage = next;
    if (!n.style.backgroundSize) n.style.backgroundSize = "cover";
    if (!n.style.backgroundPosition) n.style.backgroundPosition = "center";
    if (!n.style.backgroundRepeat) n.style.backgroundRepeat = "no-repeat";
  });
}
export default function useSetBackgrounds(root: RefObject<HTMLElement>) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const apply = () => applySetBg(el);
    apply();
    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.type === "childList") { apply(); break; }
        if (m.type === "attributes" && m.attributeName === "data-setbg") { apply(); break; }
      }
    });
    mo.observe(el, { subtree: true, childList: true, attributes: true, attributeFilter: ["data-setbg"] });
    return () => mo.disconnect();
  }, [root]);
}
export function useSetBackgroundsGlobal() {
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const root: Document = document;
    const apply = () => applySetBg(root);
    apply();
    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.type === "childList") { apply(); break; }
        if (m.type === "attributes" && m.attributeName === "data-setbg") { apply(); break; }
      }
    });
    mo.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["data-setbg"],
    });
    window.addEventListener("load", apply);
    const id = window.setInterval(apply, 250);
    return () => {
      window.removeEventListener("load", apply);
      clearInterval(id);
      mo.disconnect();
    };
  }, []);
}
