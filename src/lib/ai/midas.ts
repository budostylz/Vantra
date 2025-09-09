import * as ort from "onnxruntime-web";

export async function runMidas(
  session: ort.InferenceSession,
  source: HTMLVideoElement,
  inputSize = 256
) {
  // Resize/frame -> tensor
  const iw = source.videoWidth, ih = source.videoHeight;
  const scale = Math.min(inputSize / iw, inputSize / ih);
  const nw = Math.round(iw * scale), nh = Math.round(ih * scale);

  const c = document.createElement("canvas");
  c.width = inputSize; c.height = inputSize;
  const g = c.getContext("2d")!;
  g.fillStyle = "#000"; g.fillRect(0, 0, inputSize, inputSize);
  g.drawImage(source, 0, 0, iw, ih, Math.floor((inputSize - nw) / 2), Math.floor((inputSize - nh) / 2), nw, nh);

  const img = g.getImageData(0, 0, inputSize, inputSize).data;
  // simple RGB->NCHW normalized
  const chw = new Float32Array(3 * inputSize * inputSize);
  for (let i = 0, p = 0; i < img.length; i += 4, p++) {
    chw[p + 0] = img[i] / 255;                                  // R
    chw[p + inputSize * inputSize] = img[i + 1] / 255;          // G
    chw[p + 2 * inputSize * inputSize] = img[i + 2] / 255;      // B
  }
  const input = new ort.Tensor("float32", chw, [1, 3, inputSize, inputSize]);
  const out = await session.run({ input }); // many MiDaS exports use 'input' as name
  const t = out[Object.keys(out)[0]] as ort.Tensor; // [1,1,h,w]

  const depth = t.data as Float32Array;
  // normalize 0..1 for coloring
  const min = Math.min(...depth);
  const max = Math.max(...depth);
  const range = Math.max(1e-6, max - min);
  const norm = Float32Array.from(depth, v => (v - min) / range);
  return { map: norm, w: t.dims.at(-1) ?? inputSize, h: t.dims.at(-2) ?? inputSize };
}

export function drawDepthOverlay(
  ctx: CanvasRenderingContext2D,
  frameW: number,
  frameH: number,
  depth: { map: Float32Array; w: number; h: number }
) {
  const { map, w, h } = depth;
  const img = ctx.createImageData(w, h);
  for (let i = 0; i < map.length; i++) {
    const v = Math.max(0, Math.min(1, map[i]));
    // simple inferno-like ramp
    const r = Math.floor(255 * v);
    const g = Math.floor(255 * (1 - Math.abs(v - 0.5) * 2));
    const b = Math.floor(255 * (1 - v));
    const k = i * 4;
    img.data[k] = r; img.data[k + 1] = g; img.data[k + 2] = b; img.data[k + 3] = 120;
  }
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  c.getContext("2d")!.putImageData(img, 0, 0);
  ctx.drawImage(c, 0, 0, frameW, frameH);
}
