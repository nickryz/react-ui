import * as THREE from "three";
import { useThree, extend, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  Environment,
  Float,
  MeshPortalMaterial,
  PerspectiveCamera,
  RenderTexture,
} from "@react-three/drei";
import { geometry } from "maath";
import { ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig";

extend(geometry);

// const CeneGL = (props) => {
//   const { camera } = useThree();
//
//   console.log(camera);
//
//   const box = useRef(null);
//
//   useFrame((state, delta) => {
//     box.current.rotation.y += delta;
//     box.current.rotation.x += delta;
//   });
//
//   const { scale, aspect } = useMemo(() => {
//     const s =
//       props.scale.x > props.scale.y
//         ? props.scale.xy.min()
//         : props.scale.xy.max();
//     const a = props.scale.x / props.scale.y;
//     return { scale: s, aspect: a };
//   }, [props.scale]);
//
//   return (
//     <mesh {...props} scale={[scale, scale, 1]}>
//       <roundedPlaneGeometry args={[aspect, 1, 0.02]} />
//       <meshStandardMaterial>
//         <RenderTexture attach="map">
//           <PerspectiveCamera
//             makeDefault
//             manual
//             aspect={aspect}
//             position={[0, 0, 6]}
//           />
//           <Environment preset="city" background />
//           {/*<color attach="background" args={["pink"]} />*/}
//           <mesh ref={box} castShadow receiveShadow>
//             <icosahedronGeometry />
//             <meshStandardMaterial
//               color={"red"}
//               roughness={0.1}
//               metalness={0.2}
//             />
//           </mesh>
//         </RenderTexture>
//       </meshStandardMaterial>
//
//       {/*<MeshPortalMaterial*/}
//       {/*  side={THREE.DoubleSide}*/}
//       {/*  key={camera.fov}*/}
//       {/*  renderPriority={1001}*/}
//       {/*>*/}
//       {/*  /!*<ambientLight intensity={0.4} />*!/*/}
//       {/*  <Environment preset="city" background />*/}
//       {/*  <color attach="background" args={["pink"]} />*/}
//       {/*  <Float>*/}
//       {/*    <mesh ref={box} scale={0.1} castShadow receiveShadow>*/}
//       {/*      <icosahedronGeometry />*/}
//       {/*      <meshStandardMaterial*/}
//       {/*        color={"red"}*/}
//       {/*        roughness={0.1}*/}
//       {/*        metalness={0.2}*/}
//       {/*      />*/}
//       {/*    </mesh>*/}
//       {/*  </Float>*/}
//       {/*</MeshPortalMaterial>*/}
//     </mesh>
//   );
// };

const TestScene = () => {
  const refEl = useRef(null);

  return (
    <>
      <div
        ref={refEl}
        className="col-span-full border-1 rounded-3xl fluid-mt-5/12"
      />
      <UseCanvas>
        <ScrollScene track={refEl}>
          {(props) => <CeneGL {...props} />}
        </ScrollScene>
      </UseCanvas>
    </>
  );
};

export default TestScene;
