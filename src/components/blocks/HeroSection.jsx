import { useLenis } from "lenis/react";

const HeroSection = () => {
  const lenis = useLenis();

  return (
    <section className="section main-grid grid-rows-[auto_1fr_auto] h-full-screen">
      <h1 className="col-start-3 col-span-6 fluid-text-sm/5xl leading-none font-light">
        We help brands create digital experiences that connect with their
        audience
      </h1>
      <div className="col-span-full bg-amber-300 rounded-2xl fluid-mt-5/12"></div>
      <div className="col-span-full relative ">
        <div className="absolute left-0 top-0 fluid-h-6/12 w-full fluid-text-xs/2xl flex items-center justify-between gap-0.5 leading-none">
          {Array(4)
            .fill("+")
            .map((item, index) => {
              return (
                <span className="inline-block select-none" key={index}>
                  {item}
                </span>
              );
            })}
          <button
            onClick={() => lenis?.scrollTo(0)}
            className="block absolute uppercase fluid-text-xs/sm left-1/2 top-1/2 -translate-1/2 z-10 leading-none cursor-pointer"
          >
            Scroll to explore
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
