// src/lib/aruco/measure.ts

/**
 * OpenCV.js is loaded globally by loadOpenCV(). Declare it for TS.
 * If you prefer a central declaration, move this into a global.d.ts.
 */
declare const cv: any;

export type Corner = { x: number; y: number };

/** Make a 4x1 CV_32FC2 mat from points */
function matFromPoints(pts: Corner[]) {
  const data: number[] = [];
  for (const p of pts) data.push(p.x, p.y);
  // rows = pts.length, cols = 1, type = CV_32FC2
  return new cv.Mat(pts.length, 1, cv.CV_32FC2, new Float32Array(data));
}

/** Compat: get aruco dictionary for DICT_5X5_100 across OpenCV builds */
function getDict() {
  const a = cv.aruco;
  if (a?.getPredefinedDictionary) return a.getPredefinedDictionary(a.DICT_5X5_100);
  if (a?.Dictionary_get) return a.Dictionary_get(a.DICT_5X5_100);
  throw new Error("OpenCV ArUco dictionary API not found");
}

/**
 * Find the largest detected ArUco marker (by perimeter) in a grayscale Mat.
 * Returns its 4 image-space corners (clockwise) or null.
 */
export function detectLargestMarker(grayMat: any): Corner[] | null {
  const a = cv.aruco;
  const dict = getDict();

  // Parameters compat across versions
  const params =
    a?.DetectorParameters?.create?.() ??
    (a?.DetectorParameters ? new a.DetectorParameters() : null);

  if (!params) throw new Error("OpenCV ArUco DetectorParameters not available");

  const cornersVec = new cv.MatVector();
  const ids = new cv.Mat();

  try {
    if (a?.detectMarkers) {
      // Old API
      a.detectMarkers(grayMat, dict, cornersVec, ids, params);
    } else if (a?.ArucoDetector) {
      // New API
      const detector = new a.ArucoDetector(dict, params);
      detector.detectMarkers(grayMat, cornersVec, ids);
    } else {
      throw new Error("OpenCV ArUco detect API not found");
    }

    if (!ids.data || ids.rows < 1 || cornersVec.size() < 1) return null;

    // Pick marker with largest perimeter
    let bestIdx = 0;
    let bestPerimeter = 0;

    for (let i = 0; i < cornersVec.size(); i++) {
      const m: any = cornersVec.get(i); // Mat with 4 points (CV_32FC2)
      const c: Corner[] = [];
      for (let k = 0; k < 4; k++) {
        c.push({ x: m.data32F[k * 2], y: m.data32F[k * 2 + 1] });
      }
      const per =
        Math.hypot(c[1].x - c[0].x, c[1].y - c[0].y) +
        Math.hypot(c[2].x - c[1].x, c[2].y - c[1].y) +
        Math.hypot(c[3].x - c[2].x, c[3].y - c[2].y) +
        Math.hypot(c[0].x - c[3].x, c[0].y - c[3].y);

      if (per > bestPerimeter) {
        bestPerimeter = per;
        bestIdx = i;
      }

      // m is a view; no delete needed in most builds
    }

    const best: any = cornersVec.get(bestIdx);
    const out: Corner[] = [];
    for (let k = 0; k < 4; k++) {
      out.push({ x: best.data32F[k * 2], y: best.data32F[k * 2 + 1] });
    }
    return out;
  } finally {
    cornersVec.delete();
    ids.delete();
  }
}

/**
 * Compute image->meter homography from a detected marker’s corners.
 * `cornersPx` are in image pixels (clockwise), `sideMeters` is the physical side length.
 */
export function buildHomographyFromMarker(cornersPx: Corner[], sideMeters: number) {
  if (cornersPx.length !== 4) throw new Error("Expected 4 marker corners");
  const img = matFromPoints(cornersPx);
  const world = matFromPoints([
    { x: 0, y: 0 },
    { x: sideMeters, y: 0 },
    { x: sideMeters, y: sideMeters },
    { x: 0, y: sideMeters },
  ]);
  const H = cv.getPerspectiveTransform(img, world); // image -> meters
  img.delete();
  world.delete();
  return H; // cv.Mat 3x3
}

/** Map arbitrary image pixel points through H into meter space */
export function mapPixelsToMeters(H: any, pts: Corner[]): Corner[] {
  const src = new cv.Mat(pts.length, 1, cv.CV_32FC2);
  for (let i = 0; i < pts.length; i++) {
    src.data32F[i * 2] = pts[i].x;
    src.data32F[i * 2 + 1] = pts[i].y;
  }

  const dst = new cv.Mat();
  cv.perspectiveTransform(src, dst, H);

  const out: Corner[] = [];
  for (let i = 0; i < pts.length; i++) {
    out.push({ x: dst.data32F[i * 2], y: dst.data32F[i * 2 + 1] });
  }

  src.delete();
  dst.delete();
  return out;
}

/** Polygon area via shoelace formula (meters²) */
export function areaSqM(pointsMeters: Corner[]) {
  if (pointsMeters.length < 3) return 0;
  let s = 0;
  for (let i = 0; i < pointsMeters.length; i++) {
    const a = pointsMeters[i];
    const b = pointsMeters[(i + 1) % pointsMeters.length];
    s += a.x * b.y - b.x * a.y;
  }
  return Math.abs(s) / 2;
}
