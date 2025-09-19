// src/components/dev/OverlayEditor.tsx
import React, { useMemo, useEffect, useRef, useCallback, useState } from "react";
import { useOverlay } from "@/store/hooks";
import { usePreviewStore } from "@/store/previewStore";
import { overlayMap as overlayDefaults } from "@/utils/overlayMap";
import { fetchImageInfo } from "@/utils/fetchImageInfo";
import { toast } from "react-hot-toast";
import { auth } from "@/utils/firebase"; 
import { uploadToStorage } from "@/utils/uploadToStorage";



export type Section = "styles" | "text" | "links" | "images";

export type OverlayEditorProps = {
  route: string;
  overlayKey: string;
  sections?: Section[];
  className?: string;
};

export default function OverlayEditor(props: OverlayEditorProps) {
  // Overlay wiring (auto-injected)
  const ROUTE = "/dev";
  const OVERLAY_KEY = "overlayEditor";
  const { node: overlayEditorOverlay } = useOverlay(ROUTE, OVERLAY_KEY);

  const mode = usePreviewStore((s) => s.uiDesignMode);
  if (mode !== "design") return null;
  return <OverlayEditorBody {...props} />;
}

function OverlayEditorBody({
  route,
  overlayKey,
  sections = ["styles", "text", "links", "images"],
  className = "",
}: OverlayEditorProps) {
  const {
    node,
    text,
    links,
    images,
    setTextAt,
    insertTextAt,
    removeTextAt,
    setLinkAt,
    setImageAt,
    upsert,
  } = useOverlay(route, overlayKey);

  // styles (unchanged)
  const styles = (node?.props as any)?.styles ?? {};
  const [local, setLocal] = useState({
    fontFamily: styles.fontFamily || "Inter",
    fontWeight: styles.fontWeight || "Regular",
    fontSize: styles.fontSize || "24px",
    textAlign: (styles.textAlign as "left" | "center" | "right") || "center",
    textColor: styles.textColor || "#000000",
    backgroundColor: styles.backgroundColor ?? "#ffffff",
  });
  useEffect(() => {
    setLocal({
      fontFamily: styles.fontFamily || "Inter",
      fontWeight: styles.fontWeight || "Regular",
      fontSize: styles.fontSize || "24px",
      textAlign: (styles.textAlign as "left" | "center" | "right") || "center",
      textColor: styles.textColor || "#000000",
      backgroundColor: styles.backgroundColor ?? "#ffffff",
    });
  }, [styles.fontFamily, styles.fontWeight, styles.fontSize, styles.textAlign, styles.textColor, styles.backgroundColor]);

  const resetToDefaults = usePreviewStore((s) => s.resetToDefaults);
  const upsertOverlayComponent = usePreviewStore((s) => s.upsertOverlayComponent);
  const hasDefaults = !!node;

  const prevNodeRef = useRef<any | undefined>(undefined);
  const lastNodeJsonRef = useRef<string>("");
  useEffect(() => {
    const curJson = JSON.stringify(node ?? null);
    if (curJson !== lastNodeJsonRef.current) {
      prevNodeRef.current = lastNodeJsonRef.current
        ? JSON.parse(lastNodeJsonRef.current)
        : undefined;
      lastNodeJsonRef.current = curJson;
    }
  }, [node]);

  const onRollbackComponent = useCallback(() => {
    const prev = prevNodeRef.current;
    if (prev) upsertOverlayComponent(route, overlayKey, prev);
  }, [route, overlayKey, upsertOverlayComponent]);

  const onResetComponent = useCallback(() => {
    const defNode = (overlayDefaults as any)?.[route]?.[overlayKey];
    if (defNode) upsert(defNode);
  }, [route, overlayKey, upsert]);

  const onResetSite = useCallback(() => {
    resetToDefaults({ clearPersist: true });
  }, [resetToDefaults]);

  // ---------- NEW: immutable text updater to force subscribers to re-render ----------
  const updateTextImmutable = useCallback(
    (index: number, value: string) => {
      const currentText = Array.isArray(text) ? text : [];
      const nextText = currentText.map((t, i) =>
        i === index
          ? (typeof t === "string" ? value : { ...(t ?? {}), value }) // ⬅ support string or object shape
          : t
      );

      const template = (overlayDefaults as any)?.[route]?.[overlayKey] ?? { component: node?.component ?? "Overlay", props: {} };
      const nextNode = {
        ...(node ?? template),
        props: {
          ...(node?.props ?? template.props ?? {}),
          text: nextText, // ⬅ replace array identity
        },
      };

      upsert(nextNode); // ⬅ broadcast immutable change
      // Optional: keep original helper in case other tools rely on it
      try { setTextAt(index, value as any); } catch {}
    },
    [text, node, route, overlayKey, upsert, setTextAt]
  );

  const header = useMemo(
    () => (
      <div className="oe-header">
        <div className="oe-header__left">
          <div className="oe-kicker">Overlay</div>
          <div className="oe-title">
            {route} · <code className="oe-code">{overlayKey}</code>
          </div>
          {!hasDefaults && (
            <div className="oe-note">
              (No default node found — editor will create entries as you type.)
            </div>
          )}
        </div>

        <div className="oe-header__right" style={{ marginTop: 30, position: "relative", zIndex: 2147483646 }}>
          {/* ⬆ ensure the buttons float above nav if needed */}
          <button className="oe-btn" onClick={onResetComponent} title="Reset only this component">
            Reset component
          </button>
          {/* <button className="oe-btn" onClick={onResetSite} title="Reset entire site overlay">Reset site</button> */}
          {/* <button className="oe-btn oe-btn--ghost" disabled={!prevNodeRef.current} onClick={onRollbackComponent}>Rollback component</button> */}
        </div>
      </div>
    ),
    [route, overlayKey, hasDefaults, onResetComponent, onResetSite, onRollbackComponent]
  );

  return (
    <div className={`oe-card ${className}`}>
      {header}

      {sections.includes("text") && (
        <SectionCard title="Text">
          {text.length === 0 && (
            <EmptyRow label="No text entries" onAdd={() => insertTextAt(text.length, "")} addLabel="Add text" />
          )}

          {text.map((t, i) => {
            const val = typeof t === "string" ? t : (t?.value ?? ""); // ⬅ render both shapes
            return (
              <Row key={`text-${i}`}>
                <label className="oe-label">#{i}</label>
                <input
                  className="oe-input"
                  placeholder={`Text ${i + 1}`}
                  value={val}
                  onChange={(e) => updateTextImmutable(i, e.target.value)} // ⬅ use immutable updater
                />
                <button className="oe-btn oe-btn--ghost" onClick={() => removeTextAt(i)} title="Remove">
                  ✕
                </button>
              </Row>
            );
          })}
        </SectionCard>
      )}

      {sections.includes("links") && (
        <SectionCard title="Links">
          {links.length === 0 && (
            <EmptyRow label="No links" onAdd={() => setLinkAt(links.length, { href: "", text: "" })} addLabel="Add link" />
          )}

          {links.map((lnk, i) => (
            <Row key={`link-${i}`} wrap>
              <label className="oe-label">#{i}</label>
              <input
                className="oe-input"
                placeholder="Text"
                value={lnk?.text ?? ""}
                onChange={(e) => setLinkAt(i, { ...lnk, text: e.target.value })}
              />
              <input
                className="oe-input"
                placeholder="href (or 'to')"
                value={lnk?.href ?? lnk?.to ?? ""}
                onChange={(e) => {
                  const next = { ...(lnk ?? {}), href: e.target.value };
                  delete (next as any).to;
                  setLinkAt(i, next);
                }}
              />
            </Row>
          ))}
        </SectionCard>
      )}

      {sections.includes("images") && (
        <SectionCard title="Images">
          {images.length === 0 && (
            <EmptyRow label="No images" onAdd={() => setImageAt(images.length, { src: "", alt: "", title: "" })} addLabel="Add image" />
          )}

          {images.map((img, i) => (
            <ImageRowEditor key={`img-${i}`} index={i} img={img} setImageAt={(idx, next) => setImageAt(idx, next)} />
          ))}

          

          <div className="oe-actions">
            <button className="oe-btn" onClick={() => setImageAt(images.length, { src: "", alt: "", title: "" })}>
              + Add image
            </button>
          </div>
        </SectionCard>
      )}
    </div>
  );
}

/* --------- Images editor (unchanged except for small typings) --------- */

type OverlayImage = {
  src?: string;
  alt?: string;
  title?: string;
  tag?: string;
  path?: string;

  // NEW for dimensions and format
  width?: number;
  height?: number;
  format?: string;
};

const isCloudinaryUrl = (s: string) =>
  /res\.cloudinary\.com\/.+\/image\/upload\//.test(s);

const isDataUrlOrRawB64 = (s: string) =>
  s.startsWith("data:") || /^[A-Za-z0-9+/=]+$/.test(s);

// fetch a URL → base64 data URL (for non-Cloudinary http(s) images)
async function urlToDataUrl(url: string): Promise<string> {
  const resp = await fetch(url, { mode: "cors" });
  const blob = await resp.blob();
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}


function ImageRowEditor({
  index,
  img,
  setImageAt,
}: {
  index: number;
  img?: OverlayImage;
  setImageAt: (i: number, next: OverlayImage) => void;
}) {

  
  const src = img?.src ?? "";
  const [currentDims, setCurrentDims] = React.useState<{ width: number; height: number; format?: string } | null>(null);

    // When the row mounts or the existing src changes, read its intrinsic dims (once).
    useEffect(() => {
      let cancelled = false;

      (async () => {
        // No image
        if (!src) { setCurrentDims(null); return; }

        try {
          // Fast path: use baked-in dims if present
          if (img?.width && img?.height) {
            if (!cancelled) setCurrentDims({ width: img.width, height: img.height, format: img.format });
            return;
          }

          // Decide which input to send
          const isCloudinary = /res\.cloudinary\.com\/.+\/image\/upload\//.test(src);
          const isBase64ish = src.startsWith("data:") || /^[A-Za-z0-9+/=]+$/.test(src);

          if (!isCloudinary && !isBase64ish) {
            // Non-Cloudinary http(s) URLs aren’t supported by the CF right now
            if (!cancelled) setCurrentDims(null);
            return;
          }

          const info = await fetchImageInfo(isCloudinary ? { cloudinaryUrl: src } : { base64: src });

          if (!cancelled) {
            setCurrentDims({ width: info.width, height: info.height, format: info.format });

            // Persist metadata so next time we don’t re-fetch
            if (!img?.width || !img?.height || !img?.format) {
              setImageAt(index, {
                ...(img ?? {}),
                width: info.width,
                height: info.height,
                format: info.format,
              });
            }
          }
        } catch {
          if (!cancelled) setCurrentDims(null);
        }
      })();

  return () => { cancelled = true; };
}, [src, img?.width, img?.height, img?.format, index, img, setImageAt]);

function looksLikeHttpUrl(u: string) {
  try { const x = new URL(u); return x.protocol === "https:" || x.protocol === "http:"; }
  catch { return false; }
}

async function urlToDataURL(url: string): Promise<string> {
  const res = await fetch(url, { mode: "cors" }); // ok for public images; CF upload will avoid GCS CORS
  if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
  const ct = res.headers.get("content-type") || "";
  if (!ct.startsWith("image/")) throw new Error(`Not an image (content-type: ${ct || "unknown"})`);
  const blob = await res.blob();
  const reader = new FileReader();
  return await new Promise<string>((resolve, reject) => {
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}
 
const onURLChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const user = auth.currentUser;
  console.log('CHECKING USER: ', user);
  if (!user) {
    toast.error("Please sign in to save images.");
    return;
  }
  const val = e.target.value.trim();

  if (!val || !looksLikeHttpUrl(val)) {
    toast.error("Please paste a valid image URL (https://…)");
    return;
  }

  // 🔹 READ BASELINE *BEFORE* mutating state (same pattern as handleFiles)
  const baselineInfo = await readCurrentImageInfo(); // may be null
  const baseline = baselineInfo ?? currentDims ?? null;

  // Optional instant preview without committing final URL
  setImageAt(index, { ...(img ?? {}), src: val });


  toast.loading("Validating image URL…", { id: "img-url" });
  const isCloudinary = /res\.cloudinary\.com\/.+\/image\/upload\//.test(val);

  try {
    let info: { width?: number; height?: number; format?: string } = {};
    let uploadSrc = val;
    let displaySrc = val;

    if (isCloudinary) {
      // Get dims from Cloudinary
      info = await fetchImageInfo({ cloudinaryUrl: val });
    } else {
      // Convert to data URL so we can measure + possibly resize
      toast.loading("Reading image data…", { id: "img-url" });
      const dataUrl = await urlToDataURL(val);
      displaySrc = dataUrl;
      info = await fetchImageInfo({ base64: dataUrl });
      uploadSrc = dataUrl;
    }

    // 🔹 If baseline exists and differs, resize to match layout BEFORE upload
    if (baseline && info.width && info.height &&
        (info.width !== baseline.width || info.height !== baseline.height)) {
      toast.loading("Scaling to match layout…", { id: "img-url" });

      // For Cloudinary URLs, first convert to data URL once
      const sourceDataUrl = isCloudinary ? await urlToDataURL(val) : displaySrc;

      const resized = await resizeDataUrlTo(
        sourceDataUrl,
        baseline.width,
        baseline.height,
        "image/jpeg",
        0.9
      );

      displaySrc = resized;
      uploadSrc  = resized;
      info = { width: baseline.width, height: baseline.height, format: "jpeg" };
    }

    // 🔹 Upload (data URL branch triggers buffer CF; URL branch uses URL CF)
    toast.loading("Saving to storage…", { id: "img-url" });
    const { url: publicUrl } = await uploadToStorage({
      src: uploadSrc,
      suggestedExt: (info?.format || "jpeg").toLowerCase(),
      uid: user.uid,
      templateId: "vantra-qSKe8jlhMtNvudBqrdmcYljQMM42",
    });

    // 🔹 Persist final URL + metadata
    setImageAt(index, {
      ...(img ?? {}),
      src: publicUrl,
      ...(info?.width && info?.height ? { width: info.width, height: info.height } : {}),
      ...(info?.format ? { format: info.format } : {}),
    });

    toast.success("Image saved to your template", { id: "img-url" });
  } catch (err: any) {
    console.warn("URL processing failed:", err);
    toast.error(`Could not process that URL: ${err?.message || "Unknown error"}`, { id: "img-url" });
  }
};





  async function readCurrentImageInfo(): Promise<{ width?: number; height?: number; format?: string } | null> {
  // If we already stored dimensions on the image, use those (fast path)
  if (img?.width && img?.height) {
    const info = { width: img.width, height: img.height, format: img.format };
    setCurrentDims(info);
    return info;
  }

  if (!src) return null;

  try {
    // Cloudinary URL → ask CF directly
    if (isCloudinaryUrl(src)) {
      const info = await fetchImageInfo({ cloudinaryUrl: src });
      setCurrentDims({ width: info.width, height: info.height, format: info.format });
      return info;
    }

    // Data URL or raw base64 → ask CF directly
    if (isDataUrlOrRawB64(src)) {
      const info = await fetchImageInfo({ base64: src });
      setCurrentDims({ width: info.width, height: info.height, format: info.format });
      return info;
    }

    // Any other http(s) URL (e.g., Firebase Storage public URL):
    // fetch → convert to data URL → ask CF
    if (/^https?:\/\//i.test(src)) {
      const dataUrl = await urlToDataUrl(src);
      const info = await fetchImageInfo({ base64: dataUrl });
      setCurrentDims({ width: info.width, height: info.height, format: info.format });
      return info;
    }
  } catch (err) {
    console.warn("readCurrentImageInfo failed:", err);
  }

  return null;
  }

  const handleFiles = async (files?: FileList | null) => {
   const user = auth.currentUser;
  console.log('CHECKING USER: ', user);
  if (!user) {
    toast.error("Please sign in to save images.");
    return;
  }
  if (!files) return;
  const file = files.item(0);
  if (!file) return;
  if (!file.type || !file.type.startsWith("image/")) return;

  // 🔹 STEP 1: capture current image dimensions BEFORE applying the new image
  const currentInfo = await readCurrentImageInfo(); // { width?, height?, format? } | null

  // 1) light client resize for UX (your existing step)
  const dataUrl = await fileToDataURL(file, {
    compress: true,
    maxW: 1600,
    maxH: 1600,
    quality: 0.85,
  });

  // 2) ask server for intrinsic dims/format of the *new* image
  let info: { width?: number; height?: number; format?: string } = {};
  try {
    info = await fetchImageInfo({ base64: dataUrl });
  } catch (e) {
    console.warn("fetchImageInfo failed:", e);
  }

  let finalSrc = dataUrl;
  let finalW = info?.width;
  let finalH = info?.height;
  let finalFmt = info?.format || "jpeg";

  // Use step-1 result if available; otherwise fall back to state
  const baseline = currentInfo ?? currentDims;

  // 3) If baseline dims exist and differ, force-match to keep template stable
  if (baseline && finalW && finalH &&
      (finalW !== baseline.width || finalH !== baseline.height)) {
    toast("Scaling image to match template layout…", { icon: "🧩" });

    finalSrc = await resizeDataUrlTo(
      dataUrl,
      baseline.width,
      baseline.height,
      "image/jpeg",
      0.9
    );
    finalW = baseline.width;
    finalH = baseline.height;
    finalFmt = "jpeg";

    toast.success(
      `Kept layout: ${info.width}×${info.height} → ${baseline.width}×${baseline.height}`
    );
  } else if (finalW && finalH) {
    toast.success(`Image set: ${finalW}×${finalH}`);
  }

  // 3.5) Upload to Storage and replace src with a CDN download URL
  try {
    // 🔹 User check before uploading
    const user = auth.currentUser;
    console.log('CHECKING USER: ', user);
    if (!user) {
      toast.error("⚠️ Please sign in before uploading images.");
      return; // abort
    }
    toast.loading("Uploading image to storage…", { id: "img-up" });
    // inside handleFiles (after you've checked user != null)
    const { url } = await uploadToStorage({
      src: finalSrc,
      suggestedExt: (finalFmt || "jpeg").toLowerCase(),
      uid: user.uid,            // ✅ add
      templateId: "vantra-qSKe8jlhMtNvudBqrdmcYljQMM42",  // ✅ temporary hardcode per your note
    });

    finalSrc = url;
    toast.success("Image uploaded!", { id: "img-up" });
  } catch (e) {
    toast.error("Upload failed, keeping local data URL.", { id: "img-up" });
    // We’ll still save the data URL so the user doesn’t lose work.
  }

  // 4) Persist to overlay
  setImageAt(index, {
    ...(img ?? {}),
    src: finalSrc,
    alt: img?.alt ?? file.name,
    title: img?.title ?? file.name,
    ...(finalW && finalH ? { width: finalW, height: finalH } : {}),
    ...(finalFmt ? { format: finalFmt } : {}),
  });
  };




  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    const it = Array.from(items).find((x) => x.kind === "file");
    if (it) {
      const file = it.getAsFile();
      if (file) {
        e.preventDefault();
        handleFiles({ 0: file, length: 1, item: () => file } as unknown as FileList);
      }
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer?.files);
  };

  const inputId = `oe-img-file-${index}`;

  return (
    <div className="oe-imgrow">
      <div className="oe-row">
        <label className="oe-label">#{index}</label>

        <input
          className="oe-input"
          placeholder="Image URL or data:…"
          value={src}
          onChange={onURLChange}
          onPaste={(e) => {
            const text = e.clipboardData.getData("text");
            if (text) {
              e.preventDefault();
              const fakeEvent = { target: { value: text } } as unknown as React.ChangeEvent<HTMLInputElement>;
              onURLChange(fakeEvent);
            }
          }}
        />


        <input
          id={inputId}
          type="file"
          accept="image/*"
          className="oe-hidden-file"
          onChange={(e) => handleFiles(e.currentTarget.files)}
        />
      </div>

       {currentDims && (
      <div className="oe-muted" style={{ marginLeft: 44 }}>
        {currentDims.width}×{currentDims.height}
        {currentDims.format ? ` ${currentDims.format.toUpperCase()}` : ""}
      </div>
    )}

      <div
        className="oe-drop"
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "copy";
        }}
        onDrop={onDrop}
        title="Drop an image, click Upload, or paste into the URL box"
      >
        <div className="oe-thumb">
          {src ? (
            <img
              src={src}
              alt={img?.alt ?? ""}
              className="oe-thumb__img"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.opacity = "0.3")}
            />
          ) : (
            <span className="oe-muted">No preview</span>
          )}
        </div>
        <div className="oe-help">
          Drop image here • or click <b>Upload</b> • or paste into URL box
          <div className="oe-muted">Stored as a Data URL for portability.</div>
        </div>
      </div>
    </div>
  );
}

/* helpers (unchanged) */
async function fileToDataURL(
  file: File,
  opts: { compress?: boolean; maxW?: number; maxH?: number; quality?: number } = {}
): Promise<string> {
  const { compress = true, maxW = 1600, maxH = 1600, quality = 0.85 } = opts;

  const rawDataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });

  if (!compress || typeof window === "undefined" || typeof document === "undefined") {
    return rawDataUrl;
  }

  const img = await loadImage(rawDataUrl);
  const { width, height } = fitContain(img.width, img.height, maxW, maxH);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return rawDataUrl;
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", quality);
}

async function resizeDataUrlTo(
  base64OrDataUrl: string,
  targetW: number,
  targetH: number,
  mime: string = "image/jpeg",
  quality = 0.9
): Promise<string> {
  const src = base64OrDataUrl;
  const img = await loadImage(src);

  const canvas = document.createElement("canvas");
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext("2d");
  if (!ctx) return src;

  // Draw scaled (cover exact size, no letterbox since we want layout-stable pixels)
  ctx.drawImage(img, 0, 0, targetW, targetH);
  return canvas.toDataURL(mime, quality);
}


function fitContain(w: number, h: number, maxW: number, maxH: number) {
  const r = Math.min(maxW / w, maxH / h, 1);
  return { width: Math.round(w * r), height: Math.round(h * r) };
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const im = new Image();
    im.onload = () => resolve(im);
    im.onerror = (e) => reject(e);
    im.src = src;
  });
}

/* neutral CSS injector (unchanged) */
(function ensureOverlayEditorCSS() {
  if (typeof document === "undefined") return;
  if (document.getElementById("oe-style")) return;
  const el = document.createElement("style");
  el.id = "oe-style";
  el.textContent = `
  .oe-card{ background:rgba(255,255,255,.85); border:1px solid #e5e7eb; border-radius:8px; padding:16px; margin:16px 16px 0; }
  .oe-header{ display:flex; align-items:flex-start; justify-content:space-between; gap:12px; flex-wrap:wrap; margin-bottom:12px; }
  .oe-header__left{ min-width:200px; }
  .oe-kicker{ font-size:12px; color:#6b7280; }
  .oe-title{ font-size:14px; font-weight:600; }
  .oe-code{ color:#be185d; }
  .oe-note{ margin-top:4px; font-size:12px; color:#b45309; }
  .oe-header__right{ display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
  .oe-actions{ margin-top:8px; display:flex; gap:8px; }
  .oe-label{ width:44px; flex:0 0 44px; font-size:12px; color:#6b7280; }
  .oe-row{ display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:8px; }
  .oe-imgrow{ margin-bottom:12px; }
  .oe-input{ min-width:160px; padding:6px 8px; border:1px solid #d1d5db; border-radius:6px; outline:none; font:inherit; }
  .oe-input:focus{ border-color:#60a5fa; box-shadow:0 0 0 3px rgba(96,165,250,.25); }
  .oe-btn{ padding:6px 10px; border:1px solid #d1d5db; border-radius:6px; background:#fff; cursor:pointer; font:inherit; }
  .oe-btn:hover{ background:#f9fafb; }
  .oe-btn:active{ transform:scale(.99); }
  .oe-btn[disabled]{ opacity:.5; cursor:not-allowed; }
  .oe-btn--ghost{ background:transparent; }
  .oe-drop{ margin:8px 0 12px 44px; border:1px dashed #d1d5db; border-radius:8px; padding:10px; display:flex; align-items:center; gap:12px; }
  .oe-thumb{ width:64px; height:64px; display:flex; align-items:center; justify-content:center; background:#f3f4f6; border-radius:6px; overflow:hidden; }
  .oe-thumb__img{ max-width:64px; max-height:64px; object-fit:contain; }
  .oe-help{ font-size:12px; color:#6b7280; }
  .oe-muted{ color:#9ca3af; font-size:12px; }
  .oe-section{ border:1px solid #e5e7eb; border-radius:8px; padding:12px; margin-top:12px; }
  .oe-section__title{ font-weight:600; margin-bottom:8px; }
  .oe-empty{ display:flex; align-items:center; justify-content:space-between; background:#f9fafb; border-radius:8px; padding:8px 10px; color:#6b7280; }
  .oe-grid{ display:flex; flex-wrap:wrap; gap:12px; }
  .oe-field{ display:flex; flex-direction:column; gap:6px; min-width:220px; }
  .oe-field-label{ font-size:12px; color:#6b7280; }
  .oe-pillrow{ display:flex; gap:6px; }
  .oe-pill{ padding:6px 10px; border:1px solid #d1d5db; border-radius:6px; background:#fff; cursor:pointer; }
  .oe-pill--active{ background:#e5e7eb; }
  .oe-color{ width:100%; height:2rem; padding:0; border:1px solid #d1d5db; border-radius:6px; background:#fff; }
  `;
  document.head.appendChild(el);
})();

/* small UI helpers (unchanged) */
function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="oe-section">
      <div className="oe-section__title">{title}</div>
      {children}
    </div>
  );
}
function Row({ children, wrap = false }: { children: React.ReactNode; wrap?: boolean }) {
  return <div className="oe-row" style={wrap ? { flexWrap: "wrap" } : undefined}>{children}</div>;
}
function EmptyRow({ label, onAdd, addLabel }: { label: string; onAdd: () => void; addLabel: string; }) {
  return (
    <div className="oe-empty">
      <span>{label}</span>
      <button className="oe-btn" onClick={onAdd}>+ {addLabel}</button>
    </div>
  );
}
