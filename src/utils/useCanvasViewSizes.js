import { useLayoutEffect, useState } from "react";

const useCanvasViewSizes = (camera) => {
  const [viewSizes, setViewSizes] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!camera) return;

    const distance = camera.position.z;
    const fovInRad = (camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fovInRad / 2) * distance;
    const width = height * camera.aspect;

    setViewSizes(() => ({ width, height }));
  }, [camera, camera?.aspect]);

  return {
    get width() {
      return viewSizes.width;
    },
    get height() {
      return viewSizes.height;
    },
    get sizes() {
      return viewSizes;
    },
  };
};

export default useCanvasViewSizes;
