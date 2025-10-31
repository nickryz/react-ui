import * as THREE from "three";
import * as React from "react";
import { createPortal, useFrame, useThree } from "@react-three/fiber";
import { WebGLRenderTarget } from "three";
import {
  CopyPass,
  EffectComposer,
  RenderPass,
  EffectPass,
  SMAAEffect,
  SMAAPreset,
} from "postprocessing";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";

/**
 * 🧩 RenderTexturePlus
 * --------------------------------
 * A fully self-contained render-to-texture component
 * similar to Drei's <RenderTexture />, but supports:
 * - custom cameras (inside children)
 * - postprocessing (EffectComposer)
 * - precise texture resolution
 * - refraction-friendly setup for MeshTransmissionMaterial
 */
const RenderTexturePlus = ({
  attach = "map",
  children,
  compute,
  width,
  height,
  renderPriority = 0,
  eventPriority = 0,
  frames = Infinity,
  effectsCallback,
  ...props
}) => {
  const { gl, size, viewport } = useThree();

  // 🧮 Define final FBO resolution (can be custom or scaled)
  const sizes = useMemo(
    () => ({
      width: (width || size.width) * viewport.dpr,
      height: (height || size.height) * viewport.dpr,
    }),
    [width, size.width, size.height, viewport.dpr, height],
  );

  // 🧱 Separate scene and render target (FBO)
  const [scene] = useState(() => new THREE.Scene());
  const [fbo] = useState(
    () => new WebGLRenderTarget(sizes.width, sizes.height),
  );

  const composer = useRef(null);
  const camera = useRef(null);

  // ⚙️ Setup EffectComposer with passes
  useLayoutEffect(() => {
    // Try to find the camera defined inside children
    camera.current = scene.children.find((c) => c?.isCamera);
    if (!camera.current) return;

    // Create composer for this FBO
    const composerInstance = new EffectComposer(gl, fbo);
    composerInstance.autoRenderToScreen = false;

    // Base render pass
    const renderPass = new RenderPass(scene, camera.current);
    composerInstance.addPass(renderPass);

    // Custom postprocessing passes
    if (effectsCallback) {
      const effects = effectsCallback(scene, camera.current) || [];
      effects.forEach((effect) => composerInstance.addPass(effect));
    }

    // Add SMAA anti-aliasing by default (optional)
    const smaa = new SMAAEffect({ preset: SMAAPreset.LOW });
    const smaaPass = new EffectPass(camera.current, smaa);
    // composerInstance.addPass(smaaPass);

    // Copy final output to our target FBO
    const copyPass = new CopyPass(fbo);
    composerInstance.addPass(copyPass);

    composer.current = composerInstance;

    return () => {
      composerInstance?.dispose();
      fbo?.dispose();
    };
  }, [gl, fbo, sizes.width, sizes.height, scene, effectsCallback]);

  // 🎯 Compute pointer ray intersections for events
  const uvCompute = useCallback(
    (event, state, previous) => {
      let parent = fbo.texture?.__r3f?.parent?.object;
      while (parent && !(parent instanceof THREE.Object3D)) {
        parent = parent.__r3f?.parent?.object;
      }
      if (!parent) return false;

      // Call previous layer (for nested portals)
      if (!previous.raycaster.camera)
        previous.events.compute(
          event,
          previous,
          previous.previousRoot?.getState(),
        );

      const [intersection] = previous.raycaster.intersectObject(parent);
      if (!intersection || !intersection.uv) return false;

      const uv = intersection.uv;
      state.raycaster.setFromCamera(
        state.pointer.set(uv.x * 2 - 1, uv.y * 2 - 1),
        state.camera,
      );
    },
    [fbo],
  );

  return (
    <>
      {/*
        Create a nested portal (isolated scene) that will be rendered
        into this component's FBO texture.
      */}
      {createPortal(
        <Container
          renderPriority={renderPriority}
          frames={frames}
          fbo={fbo}
          composer={composer}
        >
          {children}
          {/* Dummy group ensures the event system activates */}
          <group onPointerOver={() => null} />
        </Container>,
        scene,
        {
          events: {
            compute: compute || uvCompute,
            priority: eventPriority,
          },
        },
      )}

      {/* This is the actual texture output */}
      <primitive object={fbo.texture} attach={attach} {...props} />
    </>
  );
};

export default RenderTexturePlus;

/**
 * 🧰 Container
 * --------------------------------
 * This component renders the internal scene to the texture
 * using the custom composer setup above.
 *
 * It needs to be a separate component so `useFrame()` hooks
 * get access to the *portal’s own fiber context* (and not the parent’s).
 */
function Container({ frames, renderPriority, children, composer }) {
  let count = 0;

  useFrame((state) => {
    if (!composer.current) return;
    if (frames !== Infinity && count >= frames) return;

    // Save original renderer states
    const oldAutoClear = state.gl.autoClear;
    const oldRenderTarget = state.gl.getRenderTarget();
    const oldXrEnabled = state.gl.xr.enabled;
    const oldIsPresenting = state.gl.xr.isPresenting;

    // Temporarily disable XR and clear the buffer
    state.gl.autoClear = true;
    state.gl.xr.enabled = false;
    state.gl.xr.isPresenting = false;

    // Perform postprocessed render
    composer.current.render();

    // Restore renderer state
    state.gl.setRenderTarget(oldRenderTarget);
    state.gl.autoClear = oldAutoClear;
    state.gl.xr.enabled = oldXrEnabled;
    state.gl.xr.isPresenting = oldIsPresenting;

    count++;
  }, renderPriority);

  return <>{children}</>;
}
