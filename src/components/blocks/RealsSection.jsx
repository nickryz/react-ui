import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const RealsSection = () => {
  const titleRef = useRef(null);
  const titleRef_1 = useRef(null);
  const titleRef_2 = useRef(null);

  useGSAP(() => {
    const vars = {
      type: "words",
    };

    const split1 = SplitText.create(titleRef_1.current, vars);
    const split2 = SplitText.create(titleRef_2.current, vars);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top bottom",
        end: "top bottom",
      },
    });

    tl.fromTo(
      split1.words,
      {
        yPercent: 100,
        x: () => -gsap.getProperty(titleRef_1.current, "paddingLeft"),
      },
      {
        duration: 0.5,
        stagger: 0.2,
        yPercent: 0,
        x: () => -gsap.getProperty(titleRef_1.current, "paddingLeft"),
      },
    );
    tl.from(split2.words.reverse(), {
      duration: 0.4,
      yPercent: -100,
      stagger: 0.1,
    });
    tl.to(
      split1.words.reverse(),
      {
        // delay: 0.2,
        duration: 0.5,
        x: 0,
        stagger: 0.05,
      },
      "<",
    );
  });

  return (
    <section className="section">
      <h2
        ref={titleRef}
        className="fluid-text-3xl/11xl leading-[1.15] fluid-mt-12/28"
      >
        <div ref={titleRef_1} className="col-pl-2 overflow-y-hidden">
          Beyond Visions
        </div>
        <div ref={titleRef_2} className="overflow-y-hidden">
          Within Reach
        </div>
      </h2>
    </section>
  );
};

export default RealsSection;
