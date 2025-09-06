// src/utils/fetchImageInfo.ts
import { toast } from "react-hot-toast";

export type RemoteImageInfo = {
  width: number;
  height: number;
  format: string;
  url?: string;
  base64?: string;
};

type Input = { cloudinaryUrl?: string; base64?: string };

function estimateBase64Bytes(base64?: string) {
  if (!base64) return 0;
  const data = base64.startsWith("data:")
    ? base64.split(",")[1] ?? ""
    : base64;
  // ~3/4 of base64 length is bytes, minus padding
  return Math.floor((data.length * 3) / 4) - (data.endsWith("==") ? 2 : data.endsWith("=") ? 1 : 0);
}

function humanFileSize(bytes: number) {
  if (!bytes) return "—";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

function needsResizeHint(info: RemoteImageInfo) {
  // Tweak to your template’s comfort limits
  const maxComfortW = 1600;
  const maxComfortH = 1600;
  const aspect = info.width / info.height;
  const extremeAspect = aspect > 3 || aspect < 1 / 3;
  const tooLarge = info.width > maxComfortW || info.height > maxComfortH;
  return { tooLarge, extremeAspect, maxComfortW, maxComfortH };
}

export async function fetchImageInfo(input: Input): Promise<RemoteImageInfo> {
  const loadingId = toast.loading("Analyzing image…");

  console.log('VITE_IMAGE_INFO: ', 'https://us-central1-budoapps-5aacf.cloudfunctions.net/imageInfo');

  try {
    const res = await fetch('https://us-central1-budoapps-5aacf.cloudfunctions.net/imageInfo', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    const json = await res.json();
    if (!res.ok || !json?.success) {
      throw new Error(json?.error || "Failed to get image info");
    }

    console.log('Checking json: ', json);

    const data = json.data as RemoteImageInfo;

    console.log('Checking Data: ', data);

    // Build the success message
    const approxBytes =
      input.base64 ? estimateBase64Bytes(input.base64) : 0;

    const sizeLabel = approxBytes ? ` • ~${humanFileSize(approxBytes)}` : "";
    const fmt = (data.format || "").toUpperCase();

    const { tooLarge, extremeAspect, maxComfortW, maxComfortH } = needsResizeHint(data);

    let msg = `Image ${data.width}×${data.height} ${fmt}${sizeLabel}`;

    if (tooLarge || extremeAspect) {
      msg += `\nTip: For best results, try ≤ ${maxComfortW}×${maxComfortH}.`;
      msg += `\nIf the image looks stretched or soft, consider resizing: https://imageresizer.com/`;
    }

    toast.success(msg, { id: loadingId, duration: 6000 });
    return data;
  } catch (err: any) {
    toast.error(`Image analysis failed: ${err?.message ?? "Unknown error"}`, {
      id: loadingId,
      duration: 6000,
    });
    throw err;
  }
}
