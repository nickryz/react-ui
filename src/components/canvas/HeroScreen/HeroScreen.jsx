import { useRef } from "react";
import { ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig";
import HeroScreenWebGL from "@/components/canvas/HeroScreen/HeroScreenWebGL.jsx";

const HeroScreen = () => {
  const el = useRef(null);

  return (
    <>
      <div ref={el} className="col-span-full fluid-mt-5/12" />
      <UseCanvas>
        <ScrollScene track={el}>
          {(props) => <HeroScreenWebGL {...props} />}
        </ScrollScene>
      </UseCanvas>
    </>
  );
};

export default HeroScreen;
