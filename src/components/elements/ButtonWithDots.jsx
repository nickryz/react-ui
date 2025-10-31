import ButtonBase from "@/components/elements/ButtonBase.jsx";

const ButtonWithDots = ({ children, ...props }) => {
  return (
    <ButtonBase
      {...props}
      className="group/btn pl-[1.625em] bg-light-gray hover:bg-light-gray/50 text-gray-blue"
    >
      <div className="flex items-center justify-center gap-[0.5em] leading-none">
        <span>{children}</span>
        <div className="relative size-[0.725em] z-0 shrink-0 transition group-hover/btn:rotate-90 duration-300">
          <span className="absolute left-0 top-1/2 -translate-y-1/2 size-[0.3125em] bg-gray-blue rounded-full block z-0 scale-[0.99999]" />
          <span className="absolute right-0 top-1/2 -translate-y-1/2 size-[0.3125em] bg-gray-blue rounded-full block z-0 scale-[0.99999]" />
        </div>
      </div>
    </ButtonBase>
  );
};

export default ButtonWithDots;
