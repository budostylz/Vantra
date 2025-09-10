// src/apps/walkthrough/components/MeasureAR8thWall.tsx
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { toast } from "react-hot-toast";

type Hit = { position: { x:number; y:number; z:number }, rotation?: number[] }; // minimal
declare const XR8: any; // 8th Wall global

const toVec3 = (p:any) => new THREE.Vector3(p.x, p.y, p.z);

// 2D polygon area (shoelace), expects points in a single plane coordinate system (meters)
function polygonArea2D(pts: THREE.Vector2[]) {
  if (pts.length < 3) return 0;
  let s = 0;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    s += (pts[j].x * pts[i].y) - (pts[i].x * pts[j].y);
  }
  return Math.abs(s) * 0.5;
}

export default function MeasureAR8thWall({
  onResult,
}: {
  onResult: (result: { areaM2: number; areaFt2: number; worldPoints: {x:number,y:number,z:number}[] }) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);
  const [worldPoints, setWorldPoints] = useState<THREE.Vector3[]>([]);
  const planeRef = useRef<{ origin: THREE.Vector3; u: THREE.Vector3; v: THREE.Vector3 } | null>(null);

  // map world points to planar 2D using a plane basis
  const toPlane2D = (p: THREE.Vector3) => {
    const basis = planeRef.current!;
    const rel = p.clone().sub(basis.origin);
    return new THREE.Vector2(rel.dot(basis.u), rel.dot(basis.v));
  };

  const recomputeArea = () => {
    if (!planeRef.current || worldPoints.length < 3) return { m2: 0, ft2: 0 };
    const pts2 = worldPoints.map(toPlane2D);
    const m2 = polygonArea2D(pts2);
    return { m2, ft2: m2 * 10.7639 };
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const onxrloaded = () => {
      XR8.addCameraPipelineModules([
        XR8.GlTextureRenderer.pipelineModule(),
        XR8.Threejs.pipelineModule(),
        XR8.XrController.pipelineModule(),
        {
          name: "measure-module",
          onStart: () => {
            const { scene, camera } = XR8.Threejs.xrScene();
            // simple dot material
            const dotMat = new THREE.MeshBasicMaterial({ color: 0x00e0ff });
            const dotGeo = new THREE.SphereGeometry(0.02, 12, 12); // ~2 cm dot
            const dots: THREE.Mesh[] = [];

            // helper to draw a dot at a world point
            const addDot = (pos: THREE.Vector3) => {
              const dot = new THREE.Mesh(dotGeo, dotMat);
              dot.position.copy(pos);
              scene.add(dot);
              dots.push(dot);
            };

            // first tap defines plane basis from hit normal; subsequent taps project onto that plane
            const onTap = async (ev: MouseEvent | TouchEvent) => {
              const { renderer, camera } = XR8.Threejs.xrScene();
              const size = renderer.getSize(new THREE.Vector2());
              const x = ev instanceof TouchEvent ? ev.touches[0].clientX : (ev as MouseEvent).clientX;
              const y = ev instanceof TouchEvent ? ev.touches[0].clientY : (ev as MouseEvent).clientY;
              const nx = x / size.x;
              const ny = y / size.y;

              const hits: Hit[] = XR8.XrController.hitTest(nx, ny) || [];
              if (!hits.length) {
                toast("Aim at the floor until you see a surface, then tap.");
                return;
              }

              // choose first hit
              const h = hits[0];
              const pos = toVec3(h.position);

              // when defining the plane, build orthonormal basis (u,v) in that plane
              if (!planeRef.current) {
                // derive normal from camera to hit position (good enough in practice)
                const camWorldPos = new THREE.Vector3();
                camera.getWorldPosition(camWorldPos);
                const normal = pos.clone().sub(camWorldPos).normalize(); // approx plane normal
                // make normal more "upright" by blending toward +Y to prefer floors
                normal.lerp(new THREE.Vector3(0,1,0), 0.5).normalize();

                // build basis u,v
                const tmp = new THREE.Vector3(1,0,0);
                if (Math.abs(normal.dot(tmp)) > 0.9) tmp.set(0,0,1);
                const u = tmp.clone().cross(normal).normalize();
                const v = normal.clone().cross(u).normalize();
                planeRef.current = { origin: pos.clone(), u, v };
              }

              // project the tap world point to our plane
              const basis = planeRef.current;
              const n = basis!.u.clone().cross(basis!.v).normalize();
              const t = (basis!.origin.clone().sub(pos)).dot(n);
              const projected = pos.clone().add(n.clone().multiplyScalar(t * -1)); // closest point on plane

              addDot(projected);
              setWorldPoints(prev => {
                const next = [...prev, projected];
                const { m2, ft2 } = recomputeArea();
                toast.success(`Vertices: ${next.length} • Area: ${m2.toFixed(2)} m² (${ft2.toFixed(0)} ft²)`, { duration: 1500 });
                return next;
              });
            };

            // wire events
            const cvs = renderer.domElement;
            cvs.addEventListener("click", onTap);
            cvs.addEventListener("touchstart", onTap, { passive: true });

            setReady(true);
          },
        },
      ]);

      XR8.run({ canvas: canvasRef.current });
    };

    if (document.readyState === "complete") onxrloaded();
    else window.addEventListener("xrloaded", onxrloaded);

    return () => {
      try { XR8 && XR8.stop(); } catch {}
    };
  }, []);

  const finish = () => {
    const { m2, ft2 } = recomputeArea();
    onResult({
      areaM2: m2,
      areaFt2: ft2,
      worldPoints: worldPoints.map(p => ({ x: p.x, y: p.y, z: p.z })),
    });
  };

  return (
    <div style={{ position: "relative", width: "100%", height: 480, borderRadius: 12, overflow: "hidden", background: "#000" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", display: "flex", alignItems:"flex-end", justifyContent:"space-between", padding: 12 }}>
        <div style={{ pointerEvents: "auto" }} className="pill">Tap floor to add points</div>
        <button disabled={!ready || worldPoints.length < 3} onClick={finish} style={{ pointerEvents: "auto" }} className="btn-primary">
          Save Area
        </button>
      </div>
    </div>
  );
}
