import { useLocation, useOutlet } from "react-router";
import React from "react";
import Transition from "@/components/app/Transition.jsx";
import gsap from "gsap";
import { useScrollbar } from "@14islands/r3f-scroll-rig";

const AnimatedOutlet = () => {
  const location = useLocation();
  const element = useOutlet();
  const { __lenis } = useScrollbar();

  const onBeforeLeave = () => {};

  const onLeave = (el, done) => {
    gsap.to([el], {
      opacity: 0,
      duration: 1,
      onStart: () => {
        console.log("onLeaveStart");
      },
      onComplete: () => {
        console.log("onLeaveEnd");
        __lenis.stop();
        done();
      },
    });
  };

  const onBeforeEnter = (el) => {
    gsap.set([el], {
      opacity: 0,
    });
    __lenis.start();
  };

  const onEnter = (el, done) => {
    gsap.to([el], {
      opacity: 1,
      delay: 0.3,
      duration: 1,
      onStart: () => {
        console.log("onEnterStart");
      },
      onComplete: () => {
        done();
        console.log("onEnterEnd");
      },
    });
  };

  return (
    <>
      <Transition
        onLeave={onLeave}
        onEnter={onEnter}
        onBeforeEnter={onBeforeEnter}
        onBeforeLeave={onBeforeLeave}
      >
        <div key={location.pathname}>
          {element && React.cloneElement(element)}
        </div>
      </Transition>
    </>
  );
};

export default AnimatedOutlet;
