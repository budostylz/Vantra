import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { produce } from "immer";
// TS module export (use JSON import instead if your file is .json)
// import overlayMapDefaultsRaw from "@/utils/overlayMap.json";
import { overlayMap as overlayMapDefaultsRaw } from "@/utils/overlayMap";

/* ------------ sanitize overlay (defensive) ------------ */
function asOverlay(next: unknown) {
  const obj = (typeof next === "object" && next) ? (next as any) : {};
  const out: Record<string, any> = {};
  for (const [route, nodeMap] of Object.entries(obj)) {
    if (!nodeMap || typeof nodeMap !== "object") continue;
    const clean: Record<string, any> = {};
    for (const [k, v] of Object.entries(nodeMap as any)) {
      if (!v || typeof v !== "object") continue;
      const id = typeof (v as any).id === "string" ? (v as any).id : cryptoRandomId();
      const component = typeof (v as any).component === "string" ? (v as any).component : String(k);
      const props = (v as any).props && typeof (v as any).props === "object" ? (v as any).props : {};
      clean[k] = { id, component, props, editable: true as const };
    }
    out[route] = clean;
  }
  return out as typeof overlayMapDefaultsRaw;
}

const overlayMapDefaults = Object.freeze(asOverlay(overlayMapDefaultsRaw));

/* ---------------------- types ------------------------ */
export type OverlayMap = typeof overlayMapDefaults;
export type OverlayRouteKey = keyof OverlayMap | string;
export type OverlayComponentKey = string;

export type OverlayNode = {
  id: string;
  component: string;
  props?: {
    text?: Array<{ value: string; tag?: string; path?: string }>;
    links?: Array<{ tag?: string; href?: string; to?: string; text?: string; path?: string }>;
    images?: Array<{ tag?: string; src: string; alt?: string; title?: string; path?: string }>;
    variables?: Array<{ expr: string; path?: string }>;
    [k: string]: unknown;
  };
  position?: { x?: number | string; y?: number | string; width?: number | string; height?: number | string; zIndex?: number };
  editable: true;
};

type DesignMode = "design" | "preview" | "golive";

type PreviewStore = {
  dataVersion: string;
  overlayMap: OverlayMap;
  activePath: OverlayRouteKey;

  uiDesignMode: DesignMode;
  setDesignMode: (m: DesignMode) => void;
  toggleDesignMode: () => void;

  // selectors
  getOverlayNode: (route: OverlayRouteKey, key: OverlayComponentKey) => OverlayNode | undefined;
  getOverlayProps: (route: OverlayRouteKey, key: OverlayComponentKey) => OverlayNode["props"] | undefined;

  // structure + editors
  upsertOverlayComponent: (route: OverlayRouteKey, key: OverlayComponentKey, node: Partial<OverlayNode>) => void;
  updateComponentProps: (route: OverlayRouteKey, key: OverlayComponentKey, propUpdates: Record<string, unknown>) => void;

  setTextAt: (route: OverlayRouteKey, key: OverlayComponentKey, index: number, value: string) => void;
  insertTextAt: (route: OverlayRouteKey, key: OverlayComponentKey, index: number, value: string) => void;
  removeTextAt: (route: OverlayRouteKey, key: OverlayComponentKey, index: number) => void;

  setLinkAt: (route: OverlayRouteKey, key: OverlayComponentKey, index: number, link: { href?: string; to?: string; text?: string }) => void;
  setImageAt: (route: OverlayRouteKey, key: OverlayComponentKey, index: number, img: { src?: string; alt?: string; title?: string }) => void;

  replaceOverlayMap: (next: unknown) => void;
  mergeOverlayMap: (partial: unknown) => void;

  setActivePath: (route: OverlayRouteKey) => void;
  resetToDefaults: (opts?: { clearPersist?: boolean }) => void;
};

/* ---------------------- store ------------------------ */
export const usePreviewStore = create<PreviewStore>()(
  devtools(
    persist(
      (set, get) => ({
        dataVersion: "overlay-v2",
        overlayMap: overlayMapDefaults,
        activePath: "/",

        // add "golive" to your DesignMode union elsewhere:
        // type DesignMode = "design" | "preview" | "golive";

        uiDesignMode: "design",
        setDesignMode: (m: DesignMode) =>
          set((s) => (s.uiDesignMode === m ? s : { uiDesignMode: m })),

        // cycle through Design → Preview → Go Live → (back to) Design
        toggleDesignMode: () =>
          set((s) => {
            const order: DesignMode[] = ["design", "preview", "golive"];
            const i = order.indexOf(s.uiDesignMode as DesignMode);
            return { uiDesignMode: order[(i + 1) % order.length] };
          }),

        getOverlayNode: (route, key) => (get().overlayMap as any)?.[route]?.[key],
        getOverlayProps: (route, key) => (get().overlayMap as any)?.[route]?.[key]?.props,

        upsertOverlayComponent: (route, key, node) =>
          set(produce((state: PreviewStore) => {
            const routeMap = ((state.overlayMap as any)[route] ||= {});
            const existing: OverlayNode = routeMap[key] ?? { id: cryptoRandomId(), component: key, editable: true };
            routeMap[key] = {
              ...existing,
              ...node,
              props: { ...(existing.props || {}), ...(node.props || {}) },
            };
          })),

        updateComponentProps: (route, key, propUpdates) =>
          set(produce((state: PreviewStore) => {
            const comp: OverlayNode | undefined = (state.overlayMap as any)?.[route]?.[key];
            if (!comp) return;
            comp.props = { ...(comp.props || {}), ...propUpdates };
          })),

        setTextAt: (route, key, index, value) =>
          set(produce((state: PreviewStore) => {
            const comp: OverlayNode | undefined = (state.overlayMap as any)?.[route]?.[key];
            if (!comp) return;
            const arr = (comp.props ||= {}).text ||= [];
            (arr[index] ||= { value: "" }).value = value;
          })),

        insertTextAt: (route, key, index, value) =>
          set(produce((state: PreviewStore) => {
            const comp: OverlayNode | undefined = (state.overlayMap as any)?.[route]?.[key];
            if (!comp) return;
            const arr = (comp.props ||= {}).text ||= [];
            arr.splice(index, 0, { value });
          })),

        removeTextAt: (route, key, index) =>
          set(produce((state: PreviewStore) => {
            const comp: OverlayNode | undefined = (state.overlayMap as any)?.[route]?.[key];
            if (!comp || !comp.props?.text) return;
            comp.props.text.splice(index, 1);
          })),

        setLinkAt: (route, key, index, link) =>
          set(produce((state: PreviewStore) => {
            const comp: OverlayNode | undefined = (state.overlayMap as any)?.[route]?.[key];
            if (!comp) return;
            const arr = (comp.props ||= {}).links ||= [];
            arr[index] = { ...(arr[index] || {}), ...link };
          })),

        setImageAt: (route, key, index, img) =>
          set(produce((state: PreviewStore) => {
            const comp: OverlayNode | undefined = (state.overlayMap as any)?.[route]?.[key];
            if (!comp) return;
            const arr = (comp.props ||= {}).images ||= [];
            arr[index] = { ...(arr[index] || { src: "" }), ...img };
          })),

        replaceOverlayMap: (next) => set(() => ({ overlayMap: Object.freeze(asOverlay(next)) as OverlayMap })),

        mergeOverlayMap: (partial) =>
          set(produce((state: PreviewStore) => {
            const inc = (typeof partial === "object" && partial) ? (partial as Record<string, Record<string, OverlayNode | undefined>>) : {};
            for (const [route, nodeMap] of Object.entries(inc)) {
              const dst = ((state.overlayMap as any)[route] ||= {});
              for (const [k, v] of Object.entries(nodeMap || {})) {
                const existing = dst[k] as OverlayNode | undefined;
                const vObj = (v && typeof v === "object") ? v as OverlayNode : ({} as OverlayNode);
                dst[k] = existing
                  ? { ...existing, ...vObj, props: { ...(existing.props ?? {}), ...(vObj.props ?? {}) } }
                  : vObj;
              }
            }
          })),

        setActivePath: (route) => set((s) => (s.activePath === route ? s : { activePath: route })),

        resetToDefaults: ({ clearPersist } = {}) => {
          set({
            overlayMap: Object.freeze(asOverlay(overlayMapDefaultsRaw)) as OverlayMap,
            activePath: "/",
          });
          if (clearPersist) {
            try { localStorage.removeItem("preview-store"); } catch { }
          }
        },
      }),
      {
        name: "preview-store",
        version: 2,
        storage: createJSONStorage(() => localStorage),
        partialize: (s) => ({
          dataVersion: s.dataVersion,
          overlayMap: s.overlayMap,
          activePath: s.activePath,
          uiDesignMode: s.uiDesignMode,
        }),
        migrate: (persisted, version) => {
          if (typeof persisted !== "object" || persisted === null) return persisted as any;
          if (version < 2) {
            return { ...(persisted as Record<string, unknown>), dataVersion: "overlay-v2" } as any;
          }
          return persisted as any;
        },
      }
    )
  )
);

/* util */
function cryptoRandomId(): string {
  const c: any = (globalThis as any).crypto;
  if (c?.randomUUID) return c.randomUUID().replace(/-/g, "").slice(0, 10);
  if (c?.getRandomValues) {
    const buf = new Uint32Array(2);
    c.getRandomValues(buf);
    const a0 = buf[0] ?? 0;
    const a1 = buf[1] ?? 0;
    return (a0.toString(16) + a1.toString(16)).slice(0, 10);
  }
  return Math.random().toString(16).slice(2, 12);
}
