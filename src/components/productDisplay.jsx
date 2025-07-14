"use client";

import { motion } from "motion/react";
import { useRef } from "react";

function Image({ id, image }) {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      className="h-screen snap-start flex justify-center items-center relative"
    >
      <div>
        <img className="w-70 h-99 rounded-lg" src={image} alt={`Image ${id}`} />
      </div>
      <motion.h2
        initial={{ visibility: "hidden" }}
        animate={{ visibility: "visible" }}
        className="text-4xl font-semibold ml-5"
      >
        {`#00${id}`}
      </motion.h2>
    </section>
  );
}

export default function ProductDisplay() {
  const images = [
    { id: 1, image: "/image/image1.jpg" },
    { id: 2, image: "/image/image2.jpg" },
    { id: 3, image: "/image/iimage3.jpg" },
    { id: 4, image: "/image/image1.jpg" },
    { id: 5, image: "/image/image4.jpg" },
  ];

  return (
    <div
      className="snap-y snap-mandatory h-screen overflow-y-scroll"
      id="example"
    >
      {images.map((img) => (
        <Image
          key={img.id}
          id={img.id}
          image={img.image}
          className="w-[1000px]"
        />
      ))}
    </div>
  );
}
