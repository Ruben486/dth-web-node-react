export const motionProps = {
    layout: true,
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8 },
    exit: { opacity: 0 },
  };

export const animationBlur = {
    initial: { filter: "blur(10px)", opacity: 0, y: 12 },
    animate: { filter: "blur(0)", opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };
  