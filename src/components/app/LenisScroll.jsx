import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";

const LenisScroll = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    lenisRef.current?.lenis?.on("scroll", ScrollTrigger.update);

    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return <ReactLenis ref={lenisRef} root options={{ autoRaf: false }} />;
};

export default LenisScroll;
