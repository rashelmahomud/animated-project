"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
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


const ProductId = () => {
    
const { id } = useParams();



  const product = products.find((item) => item.id === parseInt(id));
  if (!product) {
    return (
      <div className="text-center py-20 text-gray-500">
        <h1 className="text-2xl font-semibold">Product not found.</h1>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={400}
            className="rounded-xl object-cover w-full h-80"
          />
          <div>
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <p className="text-gray-600 mt-1">{product.title}</p>
            <p className="text-sm mt-3 text-gray-500">{product.description}</p>

            <div className="mt-4">
              <p className="text-xl font-semibold text-green-600">${product.price}</p>
              <p className="text-sm text-gray-500 mt-1">
                Quantity: {product.quantity}
              </p>
            </div>

            <button
              onClick={() => alert("Added to cart!")}
              className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductId;
