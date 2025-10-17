const ButtonBase = ({ children, href, className = "" }) => {
  return (
    <button
      className={[
        "block relative h-[3em] px-[1.125em] rounded-full transition duration-300 overflow-hidden cursor-pointer bg-gray-50",
        className,
      ].join(" ")}
    >
      {href && <a href={href} className="absolute inset-0 z-10" />}
      {children}
    </button>
  );
};

export default ButtonBase;
