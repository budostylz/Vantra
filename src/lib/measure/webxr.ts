// src/measure/webxr.ts

export type XRPoint = { x: number; y: number; z: number };
export type XRAreaResult = { squareMeters: number; vertices: XRPoint[] };

/** Minimal local shims so TS stops complaining (runtime objects come from the browser) */
type XRNavigator = Navigator & {
  xr?: {
    isSessionSupported?: (mode: string) => Promise<boolean>;
    requestSession?: (mode: string, opts?: any) => Promise<any>;
  };
};

// Constructor signature only; implementation is provided by the browser at runtime.
type XRWebGLLayerCtor = new (session: any, context: WebGLRenderingContext) => any;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const XRWebGLLayer: XRWebGLLayerCtor | undefined;

/**
 * Minimal WebXR hit-test measurer (Android Chrome, ARCore-capable).
 * Returns area in m² on the X/Z plane of the local-floor space.
 */
export async function measureAreaWebXR(root: HTMLElement): Promise<XRAreaResult> {
  const nav = navigator as XRNavigator;

  const supported =
    !!nav.xr && (await nav.xr.isSessionSupported?.("immersive-ar"));
  if (!supported) {
    throw new Error("WebXR AR not supported on this device/browser.");
  }

  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.touchAction = "none";
  root.appendChild(canvas);

  const gl = canvas.getContext("webgl", { xrCompatible: true }) as WebGLRenderingContext | null;
  if (!gl) throw new Error("WebGL context unavailable");

  const session = await nav.xr!.requestSession!("immersive-ar", {
    requiredFeatures: ["hit-test", "local-floor", "dom-overlay"],
    domOverlay: { root },
  });

  // Use runtime-provided XRWebGLLayer if available
  if (typeof XRWebGLLayer === "undefined") {
    await session.end();
    canvas.remove();
    throw new Error("XRWebGLLayer not available in this environment.");
  }
  const layer = new XRWebGLLayer(session, gl);
  session.updateRenderState({ baseLayer: layer });

  const refSpace = await session.requestReferenceSpace("local-floor");
  const viewerSpace = await session.requestReferenceSpace("viewer");
  // Older TS libs don’t have this typed; use optional chaining at runtime
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hitTestSource = await (session as any).requestHitTestSource?.({ space: viewerSpace });

  const verts: XRPoint[] = [];
  let lastHit: XRPoint | null = null;

  const shoelace = (pts: XRPoint[]) => {
    if (pts.length < 3) return 0;
    let s = 0;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], b = pts[(i + 1) % pts.length];
      s += a.x * b.z - b.x * a.z; // area on X/Z plane
    }
    return Math.abs(s) / 2;
  };

  const onTap = () => { if (lastHit) verts.push(lastHit); };
  const onDbl = () => finish();

  root.addEventListener("click", onTap);
  root.addEventListener("dblclick", onDbl);

  const frameLoop = (_t: number, frame: any) => {
    const pose = frame.getViewerPose(refSpace);
    if (!pose) return session.requestAnimationFrame(frameLoop);

    const glLayer = session.renderState.baseLayer!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, glLayer.framebuffer);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const results = hitTestSource?.getHitTestResults?.(frame) ?? [];
    if (results.length) {
      const hitPose = results[0].getPose(refSpace);
      if (hitPose) {
        const p = hitPose.transform.position; // DOMPointReadOnly
        lastHit = { x: p.x, y: p.y, z: p.z };
      }
    }

    session.requestAnimationFrame(frameLoop);
  };

  session.requestAnimationFrame(frameLoop);

  let resolve!: (v: XRAreaResult) => void;
  let reject!: (e: unknown) => void;

  function finish() {
    try {
      const sqm = shoelace(verts);
      session.end();
      canvas.remove();
      root.removeEventListener("click", onTap);
      root.removeEventListener("dblclick", onDbl);
      resolve({ squareMeters: sqm, vertices: verts });
    } catch (e) {
      reject(e);
    }
  }

  return new Promise<XRAreaResult>((res, rej) => { resolve = res; reject = rej; });
}
