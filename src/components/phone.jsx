'use client'; // This directive is necessary for client-side functionality in frameworks like Next.js

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";
// import { wrap } from "@motionone/utils"; // This import caused the error

/**
 * Inlined `wrap` utility function from @motionone/utils
 * This function ensures a value continuously cycles within a given range.
 * It's inlined here to resolve the "Could not resolve" error for the external dependency.
 *
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @param {number} v - The value to wrap.
 * @returns {number} The wrapped value.
 */
function wrap(min, max, v) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

/**
 * ParallaxText Component
 * Creates a horizontally scrolling text effect that reacts to scroll velocity.
 * The text repeats to give the illusion of infinite scrolling.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The text content to be displayed and repeated.
 * @param {number} [props.baseVelocity=100] - The base speed at which the text scrolls.
 */
function ParallaxText({ children, baseVelocity = 100 }) {
  // `baseX` is a MotionValue that controls the base X position of the text.
  const baseX = useMotionValue(0);

  // `scrollY` tracks the vertical scroll position of the window.
  const { scrollY } = useScroll();

  // `scrollVelocity` calculates the instantaneous velocity of the scroll.
  const scrollVelocity = useVelocity(scrollY);

  // `smoothVelocity` smooths out the scroll velocity using a spring animation.
  // This makes the parallax effect feel more fluid and natural.
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });


  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);


  const directionFactor = useRef(1);

  // `useAnimationFrame` runs a function on every animation frame,
  // allowing for continuous updates to the text's position.
  useAnimationFrame((t, delta) => {
    // Calculate the base movement based on `baseVelocity` and time elapsed (`delta`).
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    // Add the amplified movement based on `velocityFactor`.
    // This makes the text speed up or slow down with scroll intensity.
    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    // Update the `baseX` MotionValue, which in turn updates the `x` transform.
    baseX.set(baseX.get() + moveBy);
  });

  return (

    <div className="parallax overflow-hidden whitespace-nowrap flex text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase font-extrabold py-4 px-0">

      <motion.div className="scroller flex" style={{ x, willChange: 'transform' }}>

        <span className="block mr-8 text-indigo-600 dark:text-indigo-400 drop-shadow-lg">{children} </span>
        <span className="block mr-8 text-purple-600 dark:text-purple-400 drop-shadow-lg">{children} </span>
        <span className="block mr-8 text-pink-600 dark:text-pink-400 drop-shadow-lg">{children} </span>
        <span className="block mr-8 text-red-600 dark:text-red-400 drop-shadow-lg">{children} </span>
      </motion.div>
    </div>
  );
}


export default function App() {
  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 font-inter text-gray-900 dark:text-gray-100 overflow-x-hidden">
      {/* Tailwind CSS CDN for styling */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Google Fonts - Inter */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />

      {/* Main content section */}
      <section className="relative z-10 py-16 px-4 md:px-8 lg:px-16 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Dynamic Scroll Effects
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mb-12 text-gray-700 dark:text-gray-300">
          Experience fluid animations driven by scroll velocity using Framer Motion.
          This example showcases a responsive parallax text effect that adapts to user interaction.
        </p>
      </section>

      {/* Parallax text sections */}
      <div className="relative z-0">
        {/* First parallax text: scrolls left (negative baseVelocity) */}
        <ParallaxText baseVelocity={-5}>Framer Motion</ParallaxText>
        {/* Second parallax text: scrolls right (positive baseVelocity) */}
        <ParallaxText baseVelocity={5}>Scroll velocity</ParallaxText>
      </div>

      {/* Placeholder content to ensure there's enough vertical scroll */}
      <div className="py-24 px-4 md:px-8 lg:px-16 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Scroll Down to See the Magic!
        </h2>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-400 mb-8">
          This section provides ample vertical space, allowing you to scroll and observe
          how the parallax text above reacts to your scrolling speed and direction.
          Framer Motion handles the intricate physics, making the animation smooth and interactive.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400">Responsive Design</h3>
            <p className="text-gray-700 dark:text-gray-300">
              The layout is fully responsive, adapting seamlessly to different screen sizes,
              from mobile devices to large desktops.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-3 text-purple-600 dark:text-purple-400">Smooth Animations</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Framer Motion's physics-based animations ensure a fluid and natural feel,
              enhancing the user experience.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-3 text-pink-600 dark:text-pink-400">Interactive Experience</h3>
            <p className="text-gray-700 dark:text-gray-300">
              The parallax effect directly responds to your scroll input, creating an engaging
              and dynamic interaction.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-3 text-red-600 dark:text-red-400">Modern Web Tech</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Built with React and Tailwind CSS, demonstrating modern web development practices
              for high-performance UIs.
            </p>
          </div>
        </div>
      </div>

      {/* Footer or more content to ensure continued scrollability */}
      <div className="py-16 px-4 md:px-8 lg:px-16 text-center bg-gray-100 dark:bg-gray-800">
        <p className="text-gray-600 dark:text-gray-400">
          Explore more possibilities with Framer Motion and create stunning web animations.
        </p>
      </div>
    </div>
  );
}