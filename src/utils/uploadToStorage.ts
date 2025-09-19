// src/utils/uploadToStorage.ts
export type UploadParams = {
  src: string;                // http(s) url OR data:... base64
  suggestedExt?: string;      // "jpeg" | "png" | ...
  uid: string;                // ✅ required
  templateId: string;         // ✅ required (can be hardcoded by caller, e.g., "vantra-123")
};

export type UploadResult = { url: string; filePath?: string; contentType?: string };

function inferExtFromUrl(u: string, fallback = "jpeg") {
  try {
    const p = new URL(u).pathname.toLowerCase();
    const m = p.match(/\.(png|jpe?g|webp|gif|avif)$/);
    return (m?.[1] ?? fallback).replace("jpg", "jpeg");
  } catch {
    return fallback;
  }
}

export async function uploadToStorage(params: UploadParams): Promise<UploadResult> {
  const { src, suggestedExt, uid, templateId } = params;

  // ⚙️ Cloud Function endpoints in .env
  // POINT these to your updated functions:
  // - URL: createStorageFileFromUrl2  (expects { imageUrl, path, contentType? })
  // - BUF: uploadBufferToPath         (expects { bufferBase64, filePath, contentType? })
  const urlUpload = import.meta.env.VITE_CF_UPLOAD_FROM_URL as string;
  const bufUpload = import.meta.env.VITE_CF_UPLOAD_FROM_BUFFER as string;

  if (!uid || !templateId) throw new Error("uid and templateId are required");
  if (!urlUpload || !bufUpload)
    throw new Error("Missing VITE_CF_UPLOAD_FROM_URL / VITE_CF_UPLOAD_FROM_BUFFER");

  // Build canonical directory + filename under the new scheme:
  // users/{uid}/{template-id}/img/img-{ts}.{ext}
  const now = Date.now();
  let ext = (suggestedExt ?? "jpeg").toLowerCase().replace("jpg", "jpeg");
  const dir = `users/${uid}/${templateId}/img`;
  let filePath = `${dir}/img-${now}.${ext}`;

  // Branch by src type
  if (src.startsWith("http://") || src.startsWith("https://")) {
    // 🔹 Upload via URL CF (uses "path" instead of "filePath")
    ext = inferExtFromUrl(src, ext);
    const contentType = `image/${ext}`;
    filePath = `${dir}/img-${now}.${ext}`;

    const resp = await fetch(urlUpload, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageUrl: src,
        path: filePath,          // << updated param name for the new CF
        contentType,            // optional; CF will infer if omitted
      }),
    });

    const json = await resp.json();
    if (!resp.ok || !json?.success) throw new Error(json?.error || "Upload-from-URL failed");
    return { url: json.publicUrl as string, filePath: json.filePath ?? filePath, contentType: json.contentType ?? contentType };
  }

  if (src.startsWith("data:")) {
    // 🔹 Upload via buffer CF (uses "filePath")
    const match = src.match(/^data:(.+?);base64,(.+)$/);
    if (!match) throw new Error("Malformed data: URL");
    const [, mime, data] = match;
    const extFromMime = mime?.split("/")[1]?.replace("jpg", "jpeg");
    if (extFromMime) ext = extFromMime;

    filePath = `${dir}/img-${now}.${ext}`;
    const contentType = mime || `image/${ext}`;
    const base64 = data;

    const resp = await fetch(bufUpload, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bufferBase64: base64,
        filePath,               // << CF expects filePath
        contentType,            // optional; CF can infer, but we pass it
      }),
    });

    const json = await resp.json();
    if (!resp.ok || !json?.success) throw new Error(json?.error || "Upload-from-buffer failed");
    return { url: json.publicUrl as string, filePath: json.filePath ?? filePath, contentType: json.contentType ?? contentType };
  }

  throw new Error("Unsupported src format; expected http(s) or data: base64");
}
