// src/lib/ai/runtime.ts
import * as ort from "onnxruntime-web";

let initOnce: Promise<void> | null = null;

export async function initOrt() {
  if (initOnce) return initOnce;

  initOnce = (async () => {
    // Compute base for subpath deploys (e.g. /enter-business-name/)
    const BASE = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "/");
    const ORT_BASE = `${BASE}ort/`;

    // Tell ORT exactly where to fetch its WASM binaries
    // (file names come from node_modules/onnxruntime-web/dist)
    (ort.env.wasm as any).wasmPaths = {
      "ort-wasm.wasm": `${ORT_BASE}ort-wasm.wasm`,
      "ort-wasm-simd.wasm": `${ORT_BASE}ort-wasm-simd.wasm`,
      "ort-wasm-threaded.wasm": `${ORT_BASE}ort-wasm-threaded.wasm`,
      "ort-wasm-simd-threaded.wasm": `${ORT_BASE}ort-wasm-simd-threaded.wasm`,
    };

    // Keep it simple & broadly compatible:
    // - enable SIMD (works on modern Chrome/Safari)
    // - avoid multi-threaded path unless cross-origin isolated
    ort.env.wasm.simd = true;
    ort.env.wasm.numThreads = (self as any).crossOriginIsolated
      ? Math.min(navigator.hardwareConcurrency || 4, 4)
      : 1;

    // Optional WebGPU hint – safe if unsupported
    try {
      const n = navigator as any;
      if (n.gpu) {
        ort.env.webgpu.adapter = await n.gpu.requestAdapter();
        if (ort.env.webgpu.adapter) {
          ort.env.webgpu.device = await ort.env.webgpu.adapter.requestDevice();
        }
      }
    } catch {
      /* ignore – WASM will be used */
    }
  })();

  return initOnce;
}

export async function createSession(modelUrl: string) {
  await initOrt();
  // Prefer WASM first (always available when paths are correct); WebGPU if ready
  return await ort.InferenceSession.create(modelUrl, {
    executionProviders: ["wasm", "webgpu"],
    graphOptimizationLevel: "all",
  });
}
