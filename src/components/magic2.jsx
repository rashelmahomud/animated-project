"use client";

import { Transition } from "motion/react";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";

export default function Magic2() {
//   const [order, setOrder] = useState(initialOrder);

//   useEffect(() => {
//     const timeout = setTimeout(() => setOrder(shuffle(order)), 1000);
//     return () => clearTimeout(timeout);
//   }, [order]);

  return (
    <ul className="flex flex-wrap justify-center items-center gap-2 w-[300px] p-0 m-0 list-none relative">
      {order.map((backgroundColor) => (

        <motion.div
        
          key={backgroundColor}
          layout
          transition={spring}
          className="w-[100px] h-[100px] rounded-[10px]"
          style={{ backgroundColor }}
        >
             <p className="text-gray-700 dark:text-gray-300">
              Framer Motion's physics-based animations ensure a fluid and natural feel,
              enhancing the user experience.
            </p> 
        </motion.div>

      ))}
    </ul>
  );
}

// const initialOrder = ["#ff0088", "#dd00ee", "#9911ff", "#0d63f8"];

// function shuffle([...array]) {
//   return array.sort(() => Math.random() - 0.5);
// }

// const spring = {
//   type: "spring",
//   damping: 20,
//   stiffness: 300,
// };
