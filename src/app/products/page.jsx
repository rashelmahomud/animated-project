import ProductCard from "@/components/productcard";
import React from "react";

const ProductsPage = () => {

    const products = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    title: "Apple Flagship Phone",
    description: "Experience the power of A16 Bionic and stunning camera.",
    price: 1199,
    quantity: 10,
    image: "/image/image1.jpg",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    title: "Samsung Premium Phone",
    description: "Enjoy a sleek design and powerful performance.",
    price: 999,
    quantity: 8,
    image: "/image/image2.jpg",
  },
  {
    id: 3,
    name: "Google Pixel 8",
    title: "Google AI Phone",
    description: "Smarter photography and pure Android experience.",
    price: 899,
    quantity: 12,
    image: "/image/iimage3.jpg",
  },
  {
    id: 4,
    name: "OnePlus 11",
    title: "Fast & Smooth Flagship",
    description: "Snapdragon 8 Gen 2 with ultra-fast charging.",
    price: 849,
    quantity: 7,
    image: "/image/image4.jpg",
  },
];


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 py-10 px-5">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>  
  );
};

export default ProductsPage;

