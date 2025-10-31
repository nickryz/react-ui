import { useNavigate } from "react-router";
const ButtonBase = ({ children, href, to, className, onClick }) => {
  const navigate = useNavigate();

  function onClickHandler(e) {
    e.preventDefault();

    if (onClick) onClick?.();
    else if (href) window.location.href = href;
    else if (to) navigate(to);
  }

  return (
    <button
      className={[
        "block relative h-[3.2em] px-[1.125em] rounded-3xl transition duration-300 overflow-hidden cursor-pointer bg-gray-50",
        className,
      ].join(" ")}
      onClick={onClickHandler}
    >
      {href && (
        <a
          href={href || "#"}
          className="absolute inset-0 z-10 pointer-events-none"
        />
      )}
      {children}
    </button>
  );
};

export default ButtonBase;
