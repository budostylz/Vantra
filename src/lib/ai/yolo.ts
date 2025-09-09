import * as ort from "onnxruntime-web";

type LetterboxMeta = { sx: number; sy: number; dx: number; dy: number; iw: number; ih: number; };

function letterbox(
  img: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement,
  size = 640
): { tensor: ort.Tensor; meta: LetterboxMeta } {
  const iw = (img as HTMLVideoElement).videoWidth || (img as HTMLImageElement).naturalWidth || (img as HTMLCanvasElement).width;
  const ih = (img as HTMLVideoElement).videoHeight || (img as HTMLImageElement).naturalHeight || (img as HTMLCanvasElement).height;

  const scale = Math.min(size / iw, size / ih);
  const nw = Math.round(iw * scale);
  const nh = Math.round(ih * scale);
  const dx = Math.floor((size - nw) / 2);
  const dy = Math.floor((size - nh) / 2);

  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  g.fillStyle = "#000";
  g.fillRect(0, 0, size, size);
  g.drawImage(img as CanvasImageSource, 0, 0, iw, ih, dx, dy, nw, nh);

  const data = g.getImageData(0, 0, size, size).data;
  const chw = new Float32Array(3 * size * size);
  // RGB, 0..1
  for (let i = 0, p = 0, q = 0; i < data.length; i += 4) {
    const r = data[i] / 255, g1 = data[i + 1] / 255, b = data[i + 2] / 255;
    chw[p + 0] = r; chw[p + size * size] = g1; chw[p + 2 * size * size] = b;
    p++;
  }
  const tensor = new ort.Tensor("float32", chw, [1, 3, size, size]);
  return { tensor, meta: { sx: scale, sy: scale, dx, dy, iw, ih } };
}

export type YoloDet = { x: number; y: number; w: number; h: number; score: number; cls: number };

export function postprocess(
  output: Float32Array, // shape [1, N, C] flattened
  meta: LetterboxMeta,
  size = 640,
  confThreshold = 0.28,
  iouThreshold = 0.5
): YoloDet[] {
  // YOLOv8 export typically [1, N, 84] => [x,y,w,h, conf, ...classProbs]
  const n = output.length / 84; // assumes 80 classes
  const dets: YoloDet[] = [];

  for (let i = 0; i < n; i++) {
    const off = i * 84;
    const bx = output[off + 0], by = output[off + 1];
    const bw = output[off + 2], bh = output[off + 3];
    const obj = output[off + 4];

    // best class
    let bestC = 0, bestP = 0;
    for (let c = 5; c < 84; c++) {
      const p = output[off + c];
      if (p > bestP) { bestP = p; bestC = c - 5; }
    }
    const score = obj * bestP;
    if (score < confThreshold) continue;

    // map box back to original image
    const cx = (bx - meta.dx) / meta.sx;
    const cy = (by - meta.dy) / meta.sy;
    const ww = bw / meta.sx;
    const hh = bh / meta.sy;

    dets.push({ x: cx - ww / 2, y: cy - hh / 2, w: ww, h: hh, score, cls: bestC });
  }

  // simple NMS
  dets.sort((a, b) => b.score - a.score);
  const keep: YoloDet[] = [];
  const iou = (a: YoloDet, b: YoloDet) => {
    const x1 = Math.max(a.x, b.x);
    const y1 = Math.max(a.y, b.y);
    const x2 = Math.min(a.x + a.w, b.x + b.w);
    const y2 = Math.min(a.y + a.h, b.y + b.h);
    const inter = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
    const ua = a.w * a.h + b.w * b.h - inter;
    return ua <= 0 ? 0 : inter / ua;
  };
  for (const d of dets) {
    if (keep.every(k => iou(k, d) < iouThreshold)) keep.push(d);
  }
  return keep;
}

export async function runYolo(
  session: ort.InferenceSession,
  source: HTMLVideoElement | HTMLCanvasElement | HTMLImageElement
) {
  const size = 640;
  const { tensor, meta } = letterbox(source, size);
  const out = await session.run({ images: tensor }); // common YOLOv8 input name
  const first = out[Object.keys(out)[0]] as ort.Tensor;
  const dets = postprocess(first.data as Float32Array, meta, size);
  return dets;
}
