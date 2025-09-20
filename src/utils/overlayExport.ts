// utils/overlayExport.ts
import { usePreviewStore } from "@/store/previewStore";
import { auth } from "./firebase";

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

/** Create a Blob (and File, if supported) for local download */
export function createOverlayBlobFile(options?: { name?: string; pretty?: boolean; includeMeta?: boolean }) {
  const { json, suggestedName } = toOverlayJson(options);
  const blob = new Blob([json], { type: "application/json;charset=utf-8" });
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

/* ---------------- Cloud Function Upload ---------------- */

const CFN_URL = "https://us-central1-budoapps-5aacf.cloudfunctions.net/firebaseStorageCreateFromBuffer2";

/** UTF-8 safe base64 (browser) */
function toBase64Utf8(str: string): string {
  // Works well for typical JSON payload sizes
  return btoa(unescape(encodeURIComponent(str)));
}

/**
 * Export the current overlay map JSON to Cloud Storage via CFN.
 * Path format: users/{uid}/{templateId}/overlays/{filename}.json
 */
export async function exportOverlayJsonToStorage(options?: {
  name?: string;          // base filename (no extension)
  pretty?: boolean;
  includeMeta?: boolean;
  templateId?: string;    // defaults to "vantra-123"
}) {
  const { json, suggestedName } = toOverlayJson(options);
  const user = auth.currentUser;
  if (!user) throw new Error("Not signed in. A user must be authenticated to export overlays.");

  // Hardcode for now per request
  const templateId = options?.templateId ?? "vantra-qSKe8jlhMtNvudBqrdmcYljQMM42";
  const uid = user.uid;

  // Use a timestamped filename to avoid collisions, keep original hint in name
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = suggestedName.replace(/\.json$/i, `-${ts}.json`);

  const filePath = `users/${uid}/${templateId}/overlays/${filename}`;
  const bufferBase64 = toBase64Utf8(json);
  const idToken = await user.getIdToken(/* forceRefresh */ true);

  const resp = await fetch(CFN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      bufferBase64,
      filePath,
      contentType: "application/json",
    }),
  });

  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    const msg = data?.error || `Upload failed with status ${resp.status}`;
    throw new Error(msg);
  }

  return {
    success: true as const,
    filePath: data.filePath as string,
    publicUrl: data.publicUrl as string,
    contentType: data.contentType as string,
  };
}
