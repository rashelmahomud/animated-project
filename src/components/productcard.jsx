"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const ProductCard = ({ product }) => {
  const [showCart, setShowCart] = useState(false);

  const handleClick = () => {
    setShowCart(true);
  };

  const closeCart = () => {
    setShowCart(false);
  };

  return (
    <>
      {/* Product Card */}
      <div
        onClick={handleClick}
        className="cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden p-4 transition hover:scale-105 z-10 relative"
      >
        <motion.div
          animate={{ x: 260, y: 290, rotate: 360 }}
          drag
          transition={{ duration: 2, delay: 1, repeat: Infinity }}
          className="w-20 h-20 bg-green-300 rounded absolute z-0 opacity-30"
        />
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
          <span className="text-sm text-gray-700 font-semibold">
            In stock: {product.quantity}
          </span>
        </div>
      </div>

      {/* Big Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-xl relative">
            <button
              onClick={closeCart}
              className="absolute top-3 right-3 text-red-500 font-bold text-lg"
            >
              ✕
            </button>
            <div className="flex gap-4">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="rounded-xl object-cover"
              />
        
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default ProductCard;
