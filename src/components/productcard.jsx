'use client'
import { motion } from "motion/react"
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-4 transition hover:scale-105 z-10">
      <motion.div animate={{x:260, y:290, rotate:360  }} drag transition={{duration:2, delay:1, repeat:Infinity }}   className="w-20 h-20 bg-green-300 rounded absolute z-0 opacity-30">
        </motion.div>
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
          className="rounded-xl object-cover w-full h-52 z-20"
        />
      
      <Link href={`/products/${product.id}`}>
        <h2 className="text-xl font-bold mt-3">{product.name}</h2>
      </Link>

      <p className="text-gray-600">{product.title}</p>
      <p className="text-sm mt-1 text-gray-500">{product.description}</p>
      <div className="mt-3 flex justify-between items-center">
        <span className="text-lg font-semibold text-green-600">
          ${product.price}
        </span>
        <span className="text-sm text-gray-700 z-1 font-semibold">
          In stock: {product.quantity}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
