import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { geometry } from "maath";
import { extend, useFrame } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  RenderTexture,
} from "@react-three/drei";

extend(geometry);

const Figure = ({
  geometry = new THREE.IcosahedronGeometry(),
  material = new THREE.MeshBasicMaterial(),
}) => {
  const figure = useRef(null);

  useFrame((state, delta) => {
    figure.current.rotation.y += delta;
  });

  useEffect(() => () => geometry?.dispose(), [geometry]);

  return (
    <mesh
      ref={figure}
      geometry={geometry}
      material={material}
      castShadow
      receiveShadow
    />
  );
};

const TvScene = ({ aspect }) => {
  const vars = {
    v1: { color: "pink", roughness: 0.1 },
    v2: { color: "#444", roughness: 0.75 },
    v3: { color: "white", roughness: 0.1 },
    v4: { color: "white", roughness: 0.75 },
  };
  const set = ["v1"];
  const materialsSet = useRef({});

  useLayoutEffect(() => {
    const baseMaterial = new THREE.MeshStandardMaterial({ metalness: 0.1 });

    materialsSet.current = [...new Set(set)].reduce((acc, v) => {
      const mat = baseMaterial.clone();
      mat.color.set(vars[v].color);
      mat.roughness = vars[v].roughness;
      mat.needsUpdate = true;
      acc[v] = mat;
      return acc;
    }, {});

    return () => {
      baseMaterial?.dispose();
      for (const key in materialsSet.current) {
        materialsSet[key]?.dispose();
      }
    };
  }, []);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        manual
        aspect={aspect}
        position={[0, 0, 6]}
      />
      <Environment preset="city" background />
      <ambientLight colorWrite depthWrite />

      {set.map((item, index) => (
        <Figure key={index} material={materialsSet.current[item]} />
      ))}
    </>
  );
};

const TvScreenWebGL = (props) => {
  const { scale, aspect } = useMemo(() => {
    const s =
      props.scale.x > props.scale.y
        ? props.scale.xy.min()
        : props.scale.xy.max();
    const a = props.scale.x / props.scale.y;
    return { scale: s, aspect: a };
  }, [props.scale]);

  return (
    <mesh {...props} scale={[scale, scale, 1]}>
      <roundedPlaneGeometry args={[aspect, 1, 0.02]} />
      <meshBasicMaterial>
        <RenderTexture attach="map">
          <TvScene aspect={aspect} />
        </RenderTexture>
      </meshBasicMaterial>
    </mesh>
  );
};

export default TvScreenWebGL;
