const DEFAULT_OPENCV_URL =
  "https://docs.opencv.org/4.x/opencv.js"; // stable CDN build that includes aruco

let loading: Promise<any> | null = null;

export function loadOpenCV(url = DEFAULT_OPENCV_URL): Promise<any> {
  if ((window as any).cv?.getBuildInformation) return Promise.resolve((window as any).cv);
  if (loading) return loading;

  loading = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = url;
    s.async = true;
    s.onload = () => {
      const _cv = (window as any).cv;
      if (!_cv) return reject(new Error("cv not found on window"));
      // wait for wasm init
      _cv["onRuntimeInitialized"] = () => resolve(_cv);
    };
    s.onerror = () => reject(new Error("Failed to load OpenCV.js"));
    document.head.appendChild(s);
  });

  return loading;
}
