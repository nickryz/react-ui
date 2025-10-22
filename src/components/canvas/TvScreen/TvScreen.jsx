import { useRef } from "react";
import { ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig";
import TvScreenWebGL from "@/components/canvas/TvScreen/TvScreenWebGL.jsx";

const TvScreen = () => {
  const el = useRef(null);

  return (
    <>
      <div ref={el} className="col-span-full fluid-mt-5/12" />
      <UseCanvas>
        <ScrollScene track={el}>
          {(props) => <TvScreenWebGL {...props} />}
        </ScrollScene>
      </UseCanvas>
    </>
  );
};

export default TvScreen;
