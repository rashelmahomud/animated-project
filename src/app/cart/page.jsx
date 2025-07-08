"use client";

import { useCart } from "./CartProvider";

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">🛒 Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="bg-white text-gray-500 p-6 rounded-lg shadow text-center">
          <p>Your cart is currently empty.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-200"
            >
              {/* Left: Image and Info */}
              <div className="flex items-center gap-4 w-full md:w-2/3">
                <img
                  src={item.image || "/images/placeholder.jpg"}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md border"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-700">{item.name}</h2>
                  <p className="text-gray-500 text-sm">{item.title || "No description."}</p>
                  <p className="mt-1 text-sm font-medium text-gray-700">
                    Price: <span className="text-blue-600">${item.price}</span>
                  </p>
                </div>
              </div>

              {/* Right: Quantity and Remove */}
              <div className="flex flex-col items-end mt-4 md:mt-0 gap-2">
                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                  Qty: {item.quantity}
                </span>
                <p className="text-right text-lg font-bold text-green-600">
                  Total: ${item.price * item.quantity}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-1.5 text-sm rounded-full transition"
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
