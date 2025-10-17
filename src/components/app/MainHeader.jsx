import ButtonWithDots from "@/components/elements/ButtonWithDots.jsx";
import ButtonWithArrow from "@/components/elements/ButtonWithArrow.jsx";
import { Link } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MainHeader = ({ className }) => {
  const refHeader = useRef(null);

  const animations = () => {
    gsap.from(refHeader.current, {
      opacity: 0,
      duration: 0.3,
      ease: "Power4.easeIn",
    });
    gsap.to(refHeader.current, {
      y: () => gsap.getProperty(refHeader.current, "paddingTop") / -2,
      duration: 0.25,
      // ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: () => `${refHeader.current.clientHeight} top`,
        end: "top",
        toggleActions: "play none reverse none",
        invalidateOnRefresh: true,
      },
    });
  };

  useGSAP(animations);

  return (
    <header
      ref={refHeader}
      className={[
        "section fluid-text-xs/base flex items-center justify-between pointer-events-none z-50",
        className,
      ].join(" ")}
    >
      <Link
        to="/"
        className="pointer-events-auto fluid-text-xl/3xl font-bold text-gray-blue p-[0.3em] leading-none border-dotted border-gray-blue border-1"
      >
        LOGO
      </Link>
      <div className="pointer-events-auto ml-10 flex gap-[1em] fluid-pl-4/10">
        <ButtonWithArrow>LET'S TALK</ButtonWithArrow>
        <ButtonWithDots>MENU</ButtonWithDots>
      </div>
    </header>
  );
};

export default MainHeader;
