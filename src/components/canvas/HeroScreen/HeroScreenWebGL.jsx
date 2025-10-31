import { extend, useFrame } from "@react-three/fiber";
import { easing, geometry } from "maath";
import {
  Environment,
  MeshTransmissionMaterial,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";
import { useContext, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
} from "@react-three/rapier";
import useCanvasViewSizes from "@/utils/useCanvasViewSizes.js";
import { N8AOPostPass } from "n8ao";
import RenderTexturePlus from "@/components/canvas/RenderTexturePlus.jsx";
import HeroFrameContext from "@/components/canvas/HeroScreen/HeroFrameContext.jsx";
import HeroIsInViewportContext from "@/components/canvas/HeroScreen/HeroFrameContext.jsx";

extend(geometry, easing);

const Pointer = ({
  vec = new THREE.Vector3(),
  range = { width: 0, height: 0 },
}) => {
  const ref = useRef(null);
  const isInViewport = useContext(HeroIsInViewportContext);

  useFrame(({ pointer }) => {
    if (!isInViewport) return;
    ref.current?.setNextKinematicTranslation(
      vec.set((pointer.x * range.width) / 2, (pointer.y * range.height) / 2, 0),
    );
  });

  return (
    <RigidBody
      position={[0, 0, 0]}
      ref={ref}
      type="kinematicPosition"
      linearDamping={20}
    >
      <BallCollider args={[0.1]} />
    </RigidBody>
  );
};

const Figure = ({
  children,
  geometry,
  material = new THREE.MeshBasicMaterial(),
  ...props
}) => {
  const geo = useMemo(() => geometry || new THREE.IcosahedronGeometry(), []);

  useEffect(() => () => geometry?.dispose(), [geometry, material]);

  return (
    <mesh
      geometry={geo}
      material={material || null}
      castShadow
      receiveShadow
      {...props}
    >
      {children}
    </mesh>
  );
};

function Model({ children, ...props }) {
  const { nodes } = useGLTF("/c-transformed.glb");

  return (
    <Figure {...props} geometry={nodes.connector.geometry}>
      {children}
    </Figure>
  );
}

const RigidFigure = ({
  position,
  r = THREE.MathUtils.randFloatSpread,
  ...props
}) => {
  const isInViewport = useContext(HeroIsInViewportContext);

  const body = useRef(null);
  const pos = useMemo(() => position || [r(10), r(10), 0], []);
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (body.current && isInViewport) {
      const pos = body.current.translation();
      const dir = new THREE.Vector3()
        .subVectors(target, pos)
        .multiplyScalar(0.02);

      body.current.applyImpulse(dir, true);
      body.current?.applyTorqueImpulse({ x: 0.01, y: 0.01, z: 0.01 }, true);
    }
  });

  return (
    <RigidBody
      ref={body}
      colliders={false}
      position={pos}
      linearDamping={10}
      angularDamping={10}
      scale={5}
    >
      <Model {...props} />
      <CuboidCollider args={[0.038, 0.127, 0.038]} />
      <CuboidCollider args={[0.127, 0.038, 0.038]} />
      <CuboidCollider args={[0.038, 0.038, 0.127]} />
    </RigidBody>
  );
};

const vars = {
  v1: { color: "white", roughness: 0 },
  v2: { color: "#444", roughness: 0.75 },
  v3: { color: "red", roughness: 0.75 },
  v4: { color: "black", roughness: 0 },
};

const set = ["v1", "v2", "v3", "v4", "v1", "v3", "v1", "v2", "v3", "v4"];

const FiguresSet = () => {
  const isInViewport = useContext(HeroIsInViewportContext);

  const baseMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ metalness: 0.1 }),
    [],
  );

  const materialsSet = useMemo(() => {
    const mats = {};
    [...new Set(set)].forEach((v) => {
      const mat = baseMaterial.clone();
      mat.roughness = vars[v].roughness;
      mats[v] = mat;
    });
    return mats;
  }, []);

  useEffect(() => {
    return () => {
      baseMaterial?.dispose();
      for (const key in materialsSet) {
        materialsSet[key]?.dispose();
      }
    };
  }, []);

  useFrame((state, delta) => {
    if (!isInViewport) return;
    Object.entries(materialsSet).forEach(([key, value]) => {
      easing.dampC(value.color, vars[key]?.color, 0.3, delta);
    });
  });

  return (
    <group>
      {set.map((item, index) => (
        <RigidFigure key={index} material={materialsSet[item]} />
      ))}

      <RigidFigure>
        <MeshTransmissionMaterial
          clearcoat={1}
          thickness={0.1}
          anisotropicBlur={0.1}
          chromaticAberration={0.1}
          samples={8}
          distortionScale={1}
        />
      </RigidFigure>
    </group>
  );
};

const HeroScene = () => {
  return (
    <>
      <color attach="background" args={["#6c6c6c"]} />
      <ambientLight intensity={0.8} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <Environment preset="sunset" />
      <FiguresSet />
    </>
  );
};

const ScreenHeroWebGL = (props) => {
  const camera = useRef(null);

  const { scale } = props;
  const aspect = scale.x / scale.y;

  const { sizes } = useCanvasViewSizes(camera.current);

  const effects = (scene, camera) => {
    const effectsList = [];

    const N8AO = new N8AOPostPass(scene, camera);
    N8AO.configuration.distanceFalloff = 1;
    N8AO.configuration.aoRadius = 2;
    N8AO.configuration.intensity = 4;
    effectsList.push(N8AO);

    return effectsList;
  };

  return (
    <>
      <mesh {...props} scale={[scale.y, scale.y, 1]}>
        <roundedPlaneGeometry args={[aspect, 1, 0.02]} />
        <meshBasicMaterial>
          <RenderTexturePlus
            attach="map"
            width={scale.x}
            height={scale.y}
            effectsCallback={effects}
            frames={props.inViewport ? Infinity : 0}
          >
            <Physics gravity={[0, 0, 0]}>
              <HeroFrameContext value={props.inViewport}>
                <PerspectiveCamera
                  ref={camera}
                  position={[0, 0, 12]}
                  aspect={aspect}
                  fov={12}
                  manual
                  makeDefault
                />
                <HeroScene />
                <Pointer range={sizes} {...props} />
              </HeroFrameContext>
            </Physics>
          </RenderTexturePlus>
        </meshBasicMaterial>
      </mesh>
    </>
  );
};

export default ScreenHeroWebGL;
