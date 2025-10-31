import { cloneElement, useLayoutEffect, useRef, useState } from "react";

const Transition = ({
  children,
  onBeforeEnter,
  onEnter,
  onAfterEnter,
  onBeforeLeave,
  onLeave,
  onAfterLeave,
}) => {
  const [childToShow, setChildToShow] = useState(children);
  const prevChild = useRef(children);
  const nodeRef = useRef(null);

  useLayoutEffect(() => {
    const newChild = children;
    const oldChild = prevChild.current;

    // === ENTER ===
    if (!oldChild && newChild) {
      setChildToShow(newChild);

      requestAnimationFrame(() => {
        const node = nodeRef.current;
        onBeforeEnter?.(node);

        requestAnimationFrame(() => {
          onEnter?.(node, () => onAfterEnter?.(node));
        });
      });
    }

    // === LEAVE ===
    else if (oldChild && !newChild) {
      const node = nodeRef.current;
      onBeforeLeave?.(node);

      requestAnimationFrame(() => {
        onLeave?.(node, () => {
          onAfterLeave?.(node);
          // setChildToShow(null);
        });
      });
    }

    // === REPLACE ===
    else if (
      oldChild &&
      newChild &&
      (oldChild.key !== newChild.key || oldChild.type !== newChild.type)
    ) {
      const node = nodeRef.current;
      onBeforeLeave?.(node);

      onLeave?.(node, () => {
        onAfterLeave?.(node);
        setChildToShow(newChild);

        requestAnimationFrame(() => {
          const node = nodeRef.current;
          onBeforeEnter?.(node);
          onEnter?.(node, () => onAfterEnter?.(node));
        });
      });
    }

    prevChild.current = newChild;
  }, [children]);

  if (!childToShow) return null;

  return (
    <>
      {cloneElement(childToShow, {
        ref: (el) => {
          nodeRef.current = el;
          const { ref } = childToShow;
          if (typeof ref === "function") ref(el);
          else if (ref && typeof ref === "object") ref.current = el;
        },
      })}
    </>
  );
};

export default Transition;
