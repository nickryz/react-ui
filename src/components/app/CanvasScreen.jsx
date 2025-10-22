import { GlobalCanvas } from "@14islands/r3f-scroll-rig";
import { AdaptiveDpr, OrbitControls } from "@react-three/drei";
import GSAPLoopSync from "@/utils/GSAPLoopSync.js";

const CanvasScreen = () => {
  return (
    <>
      <GlobalCanvas
        style={{ zIndex: 0 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
        flat
      >
        {/*Services*/}
        <AdaptiveDpr pixelated />
        <GSAPLoopSync />
        {/*<OrbitControls enableZoom={false} enableDamping={true} />*/}

        {/*WORLD*/}
        {/*<color attach="background" args={["black"]} />*/}
        <ambientLight colorWrite depthWrite />
      </GlobalCanvas>
    </>
  );
};

export default CanvasScreen;
