// src/apps/walkthrough/components/MeasureARZappar.tsx
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import * as ZapparThree from "@zappar/zappar-threejs";
import { toast } from "react-hot-toast";

function polygonArea2D(pts: THREE.Vector2[]) {
  if (pts.length < 3) return 0;
  let s = 0;
  for (let i=0,j=pts.length-1;i<pts.length;j=i++) s += (pts[j].x*pts[i].y - pts[i].x*pts[j].y);
  return Math.abs(s)*0.5;
}

export default function MeasureARZappar({
  onResult,
}: { onResult: (r:{ areaM2:number; areaFt2:number; worldPoints:{x:number,y:number,z:number}[] })=>void }) {
  const mountRef = useRef<HTMLDivElement|null>(null);
  const [ready, setReady] = useState(false);
  const pointsRef = useRef<THREE.Vector3[]>([]);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<ZapparThree.Camera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const anchorRef = useRef<THREE.Group>();
  const floorPlane = new THREE.Plane(new THREE.Vector3(0,1,0), 0); // assume horizontal floor

  useEffect(() => {
    if (!mountRef.current) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, 480);
    mountRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new ZapparThree.Camera({ rearCamera: true });
    scene.add(camera);

    const tracker = new ZapparThree.InstantWorldTracker();
    const anchor = new ZapparThree.InstantWorldAnchorGroup(camera, tracker);
    scene.add(anchor);

    const light = new THREE.HemisphereLight(0xffffff, 0x222233, 1.0);
    scene.add(light);

    // draw small dots for points
    const dotMat = new THREE.MeshBasicMaterial({ color: 0x00e0ff });
    const dotGeo = new THREE.SphereGeometry(0.02, 12, 12);

    const addPoint = (p: THREE.Vector3) => {
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(p);
      anchor.add(dot);
      pointsRef.current.push(p.clone());
      const a = computeArea();
      toast.success(`Pts: ${pointsRef.current.length} • ${a.m2.toFixed(2)} m² (${a.ft2.toFixed(0)} ft²)`, { duration: 1400 });
    };

    const computeArea = () => {
      if (pointsRef.current.length < 3) return { m2: 0, ft2: 0 };
      // project to plane y=0 in anchor space (tracker defines world scale ~ meters)
      const pts2 = pointsRef.current.map(p => new THREE.Vector2(p.x, p.z));
      const m2 = polygonArea2D(pts2);
      return { m2, ft2: m2 * 10.7639 };
    };

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      camera.updateFrame(renderer);
      renderer.render(scene, camera);
    };
    animate();

    const onTap = (ev: MouseEvent | TouchEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const client = ev instanceof TouchEvent ? ev.touches[0] : (ev as MouseEvent);
      const ndc = new THREE.Vector2(
        ((client.clientX - rect.left) / rect.width) * 2 - 1,
        -(((client.clientY - rect.top) / rect.height) * 2 - 1)
      );

      // raycast to assumed floor plane in anchor space
      const raycaster = new THREE.Raycaster();
      const cam = camera as unknown as THREE.Camera;
      raycaster.setFromCamera(ndc, cam);
      const pt = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(floorPlane, pt)) {
        addPoint(pt);
      } else {
        toast("Point not on floor plane, try again");
      }
    };

    renderer.domElement.addEventListener("click", onTap);
    renderer.domElement.addEventListener("touchstart", onTap, { passive: true });

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    anchorRef.current = anchor;
    setReady(true);

    return () => {
      renderer.domElement.remove();
      renderer.dispose();
    };
  }, []);

  const finish = () => {
    // compute area in anchor space (meters)
    const pts = pointsRef.current;
    const m2 = pts.length >= 3 ? polygonArea2D(pts.map(p => new THREE.Vector2(p.x, p.z))) : 0;
    onResult({
      areaM2: m2,
      areaFt2: m2 * 10.7639,
      worldPoints: pts.map(p => ({ x:p.x, y:p.y, z:p.z })),
    });
  };

  return (
    <div>
      <div ref={mountRef} style={{ width: "100%", height: 480, borderRadius: 12, overflow: "hidden", background: "#000" }} />
      <div style={{ display:"flex", gap:8, marginTop:8 }}>
        <button disabled={!ready} onClick={finish} className="btn-primary">Save Area</button>
      </div>
    </div>
  );
}
