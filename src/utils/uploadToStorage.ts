// src/utils/uploadToStorage.ts
export type UploadParams = {
  src: string;                // http(s) url OR data:... base64
  suggestedExt?: string;      // "jpeg" | "png" | ...
  uid: string;                // ✅ required
  templateId: string;         // ✅ required
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
  const urlUpload = import.meta.env.VITE_CF_UPLOAD_FROM_URL as string;     // https://.../firebaseStorageCreateFromURL
  const bufUpload = import.meta.env.VITE_CF_UPLOAD_FROM_BUFFER as string;  // https://.../firebaseStorageCreateFromBuffer

  if (!uid || !templateId) throw new Error("uid and templateId are required");
  if (!urlUpload || !bufUpload) throw new Error("Missing VITE_CF_UPLOAD_FROM_URL / VITE_CF_UPLOAD_FROM_BUFFER");

  // Build a canonical path in your bucket
  const now = Date.now();
  let ext = (suggestedExt ?? "jpeg").toLowerCase().replace("jpg", "jpeg");
  let filePath = `userTemplates/${uid}/${templateId}/img/img-${now}.${ext}`;

  // Branch by src type
  if (src.startsWith("http://") || src.startsWith("https://")) {
    // 🔹 Use the URL-based CF (your function accepts filePath + contentType)
    ext = inferExtFromUrl(src, ext);
    const contentType = `image/${ext}`;
    filePath = `userTemplates/${uid}/${templateId}/img/img-${now}.${ext}`;

    const resp = await fetch(urlUpload, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageUrl: src,
        promptID: `img_${now}`,
        uid,
        contentType,
        filePath,
      }),
    });

    const json = await resp.json();
    if (!resp.ok || !json?.success) throw new Error(json?.error || "Upload-from-URL failed");
    return { url: json.publicUrl as string, filePath, contentType };
  }

  if (src.startsWith("data:")) {
    // 🔹 Use the buffer-based CF (expects raw base64, strips data URL prefix)
    const [, mime, data] = src.match(/^data:(.+?);base64,(.+)$/) || [];
    const extFromMime = mime?.split("/")[1]?.replace("jpg", "jpeg");
    if (extFromMime) ext = extFromMime;

    const base64 = data ?? src; // if it's already clean base64
    const resp = await fetch(bufUpload, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bufferBase64: base64,
        uid,
        // Your current CF ignores filePath and picks its own;
        // if you later add filePath support, include it here.
        // filePath,
      }),
    });

    const json = await resp.json();
    if (!resp.ok || !json?.success) throw new Error(json?.error || "Upload-from-buffer failed");
    return { url: json.publicUrl as string, filePath: json.filePath, contentType: json.contentType };
  }

  throw new Error("Unsupported src format; expected http(s) or data: base64");
}
