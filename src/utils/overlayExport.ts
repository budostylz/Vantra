// utils/overlayExport.ts
import { usePreviewStore } from "@/store/previewStore";
/** Safe JSON stringify that drops undefined/functions/symbols */
function safeStringify(obj: unknown, space = 2) {
    const seen = new WeakSet();
    return JSON.stringify(
        obj,
        (_k, v) => {
            if (typeof v === "function" || typeof v === "symbol") return undefined;
            if (v && typeof v === "object") {
                if (seen.has(v as object)) return undefined;
                seen.add(v as object);
            }
            return v === undefined ? undefined : v;
        },
        space
    );
}

/** Build the JSON string we’ll save/export */
export function toOverlayJson(options?: {
    name?: string;          // filename hint (no extension)
    pretty?: boolean;       // default true
    includeMeta?: boolean;  // include dataVersion/timestamp
}) {
    const { name = "overlayMap", pretty = true, includeMeta = true } = options || {};
    const { overlayMap, dataVersion } = usePreviewStore.getState();

    const payload = includeMeta
        ? {
            __meta: {
                kind: "overlayMap",
                dataVersion,
                exportedAt: new Date().toISOString(),
                name,
            },
            overlayMap,
        }
        : overlayMap;

    const json = safeStringify(payload, pretty ? 2 : 0);
    return { json, suggestedName: `${name}.json` };
}

/** Create a Blob (and File, if supported) for uploads to Storage */
export function createOverlayBlobFile(options?: { name?: string; pretty?: boolean; includeMeta?: boolean }) {
    const { json, suggestedName } = toOverlayJson(options);
    const blob = new Blob([json], { type: "application/json;charset=utf-8" });
    // File is handy for some Storage SDKs; fall back to Blob if not supported
    const file = typeof File !== "undefined" ? new File([blob], suggestedName, { type: blob.type }) : null;
    return { blob, file, json, filename: suggestedName };
}

/** Trigger a browser download immediately */
export function downloadOverlayJson(options?: { name?: string; pretty?: boolean; includeMeta?: boolean }) {
    const { blob, filename } = createOverlayBlobFile(options);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    return filename;
}
