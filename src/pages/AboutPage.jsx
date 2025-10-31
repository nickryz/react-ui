import { useState } from "react";
import Transition from "@/components/app/Transition.jsx";
import gsap from "gsap";

const AboutPage = () => {
  const [isShow, setIsShow] = useState(true);

  const onLeave = (el, done) => {
    gsap.to(el, { opacity: 0, onComplete: done });
  };

  const onBeforeEnter = (el) => {
    gsap.set(el, { opacity: 0, translateY: -10 });
  };

  const onEnter = (el, done) => {
    gsap.to(el, { opacity: 1, translateY: 0, delay: 0.11, onComplete: done });
  };

  return (
    <div style={{ height: "200vh" }} className="py-32 text-center">
      <Transition
        onLeave={onLeave}
        onBeforeEnter={onBeforeEnter}
        onEnter={onEnter}
      >
        {isShow ? <h1 key={1}> About page</h1> : <h1 key={2}>About page 2</h1>}
      </Transition>

      <button
        onClick={() => setIsShow(!isShow)}
        className="cursor-pointer border-2"
      >
        Toggle
      </button>
    </div>
  );
};

export default AboutPage;
