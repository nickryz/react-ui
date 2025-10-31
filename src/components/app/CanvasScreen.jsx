import { GlobalCanvas } from "@14islands/r3f-scroll-rig";
import { AdaptiveDpr, Environment, OrbitControls } from "@react-three/drei";
import GSAPLoopSync from "@/utils/GSAPLoopSync.js";
import { Stats } from "@react-three/drei";

const CanvasScreen = ({ ref }) => {
  return (
    <>
      <GlobalCanvas
        ref={ref}
        style={{ zIndex: -1 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
        flat
      >
        {/*Services*/}
        <AdaptiveDpr pixelated />
        <GSAPLoopSync />
        <Stats />
        {/*<OrbitControls enableZoom={false} enableDamping={true} />*/}
        {/*WORLD*/}
        <ambientLight colorWrite depthWrite intensity={2.5} />
      </GlobalCanvas>
    </>
  );
};

export default CanvasScreen;
