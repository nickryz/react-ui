import ArrowThinSvg from "@/components/atoms/ArrowThinSvg.jsx";
import ButtonBase from "@/components/elements/ButtonBase.jsx";

const ButtonWithArrow = ({ children, ...props }) => {
  return (
    <ButtonBase
      className="group/btn bg-gray-blue hover:bg-accent-blue text-white pl-[1.625em]"
      {...props}
    >
      <div className="flex items-center justify-center gap-[0.5em] leading-none">
        <span className="group-hover/btn:translate-x-0 group-hover/btn:opacity-100 block absolute left-[1em] size-[1em] transition -translate-x-[calc(100%+2em)] duration-300 opacity-0">
          <ArrowThinSvg />
        </span>
        <span className="group-hover/btn:translate-x-[1.25em] transition-transform duration-300">
          {children}
        </span>
        <span className="block size-[1.125em] relative">
          <span className="group-hover/btn:scale-0 scale-[0.99999] group-hover/btn:opacity-0 block absolute size-[0.3125em] top-1/2 left-1/2 -translate-1/2 bg-white rounded-full z-0 transition duration-300" />
        </span>
      </div>
    </ButtonBase>
  );
};

export default ButtonWithArrow;
