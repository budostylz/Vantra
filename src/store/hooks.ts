// src/store/hooks.ts
import { useEffect, useMemo, useRef, useCallback } from "react";
import { usePreviewStore } from "@/store/previewStore";
import { overlayMap as overlayDefaults } from "@/utils/overlayMap";

/* public-ish type kept tiny */
export type OverlayNode = {
  id: string;
  component: string;
  editable: true;
  props?: {
    text?: Array<{ value: string; tag?: string; path?: string }>;
    links?: Array<{ tag?: string; href?: string; to?: string; text?: string; path?: string }>;
    images?: Array<{ tag?: string; src: string; alt?: string; title?: string; path?: string }>;
    variables?: Array<{ expr: string; path?: string }>;
    [k: string]: unknown;
  };
  position?: { x?: number | string; y?: number | string; width?: number | string; height?: number | string; zIndex?: number };
};

const EMPTY_TEXT   = Object.freeze([]) as ReadonlyArray<{ value: string; tag?: string; path?: string }>;
const EMPTY_LINKS  = Object.freeze([]) as ReadonlyArray<{ tag?: string; href?: string; to?: string; text?: string; path?: string }>;
const EMPTY_IMAGES = Object.freeze([]) as ReadonlyArray<{ tag?: string; src: string; alt?: string; title?: string; path?: string }>;
const EMPTY_VARS   = Object.freeze([]) as ReadonlyArray<{ expr: string; path?: string }>;

/**
 * Overlay reader/writer that:
 *  - returns defaults when the node is missing (e.g., after a bad rehydrate),
 *  - seeds the store once with that default node to make it editable,
 *  - keeps stable references to avoid render/useEffect loops.
 */
export function useOverlay(route: string, key: string) {
  // live node in store (may be undefined if persisted state is stale)
  const node = usePreviewStore(
    useCallback((s: any) => (s.overlayMap as any)?.[route]?.[key] as OverlayNode | undefined, [route, key])
  );

  // default node from the generated overlay map (never updates at runtime)
  const defaultNode = (overlayDefaults as any)?.[route]?.[key] as OverlayNode | undefined;

  // write actions (stable)
  const upsertOverlayComponent = usePreviewStore((s) => s.upsertOverlayComponent);
  const updateComponentProps   = usePreviewStore((s) => s.updateComponentProps);
  const setTextAt              = usePreviewStore((s) => s.setTextAt);
  const insertTextAt           = usePreviewStore((s) => s.insertTextAt);
  const removeTextAt           = usePreviewStore((s) => s.removeTextAt);
  const setLinkAt              = usePreviewStore((s) => s.setLinkAt);
  const setImageAt             = usePreviewStore((s) => s.setImageAt);

  // seed once if needed (prevents undefined + keeps UI editable)
  const seededRef = useRef(false);
  useEffect(() => {
    if (!seededRef.current && !node && defaultNode) {
      upsertOverlayComponent(route, key, defaultNode);
      seededRef.current = true;
    }
  }, [node, defaultNode, route, key, upsertOverlayComponent]);

  const effective = node ?? defaultNode;

  const text      = (effective?.props?.text      ?? EMPTY_TEXT);
  const links     = (effective?.props?.links     ?? EMPTY_LINKS);
  const images    = (effective?.props?.images    ?? EMPTY_IMAGES);
  const variables = (effective?.props?.variables ?? EMPTY_VARS);

  const actions = useMemo(() => ({
    upsert: (partial: Partial<OverlayNode>) => upsertOverlayComponent(route, key, partial),
    updateProps: (propUpdates: Record<string, unknown>) => updateComponentProps(route, key, propUpdates),
    setTextAt:   (i: number, v: string) => setTextAt(route, key, i, v),
    insertTextAt:(i: number, v: string) => insertTextAt(route, key, i, v),
    removeTextAt:(i: number)           => removeTextAt(route, key, i),
    setLinkAt:   (i: number, link: { href?: string; to?: string; text?: string }) =>
      setLinkAt(route, key, i, link),
    setImageAt:  (i: number, img: { src?: string; alt?: string; title?: string }) =>
      setImageAt(route, key, i, img),
  }), [route, key, upsertOverlayComponent, updateComponentProps, setTextAt, insertTextAt, removeTextAt, setLinkAt, setImageAt]);

  return useMemo(() => ({ node: effective, text, links, images, variables, ...actions }),
    [effective, text, links, images, variables, actions]);
}
