import gsap from "gsap";
import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";

const GSAPLoopSync = () => {
  useFrame((state) => {
    gsap.updateRoot(state.clock.elapsedTime);
  });

  useEffect(() => {
    gsap.ticker.remove(gsap.updateRoot);

    return () => {
      gsap.ticker.add(gsap.updateRoot);
    };
  }, []);
};

export default GSAPLoopSync;
