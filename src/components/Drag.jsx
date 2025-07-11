"use client";

import { frame, motion, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

export default function Drag() {
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);

  return (
    <motion.div

      ref={ref}
      style={{
        x,
        y,
      }}
      className="z-10  w-[100px] h-[100px] rounded-full  border-4 border-dotted absolute border-yellow-400 shadow"
    />
  );
}

const spring = { damping: 3, stiffness: 50, restDelta: 0.001 };

function useFollowPointer(ref) {
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = (e) => {
      const { clientX, clientY } = e;
      const element = ref.current;

      frame.read(() => {
        x.set(clientX - element.offsetLeft - element.offsetWidth / 2);
        y.set(clientY - element.offsetTop - element.offsetHeight / 2);
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return { x, y };
}

// ==============   Styles   ================
