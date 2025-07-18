"use client";

import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";
import { toast } from "react-toastify";

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();
const router = useRouter();
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleProceedToBuy = () => {
    
    if (cartItems.length === 0) return;
    // Save purchased products in localStorage
    const previous = JSON.parse(localStorage.getItem("purchasedProducts") || "[]");
    const updated = [...previous, ...cartItems];
    localStorage.setItem("purchasedProducts", JSON.stringify(updated));

    // Optional: clear the cart
    cartItems.forEach((item) => removeFromCart(item.id));

    // Redirect to dashboard
    toast("order confirm this product")
    router.push("/dashboard");
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 min-h-screen py-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
          Your cart is empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row justify-between items-center bg-white p-5 rounded-xl shadow"
              >
                <div className="flex items-center gap-4 w-full md:w-2/3">
                  <img
                    src={item.image || "/images/placeholder.jpg"}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded border"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-500">{item.title}</p>
                    <p className="text-sm text-blue-600 font-medium mt-1">
                      Price: ${item.price}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end mt-4 md:mt-0">
                  <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium mb-2">
                    Qty: {item.quantity}
                  </span>
                  <p className="text-green-600 font-semibold">
                    Total: ${item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-2 text-sm text-red-500 hover:underline"
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Buying Section */}
          <div className="bg-white p-6 rounded-xl shadow sticky top-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">🧾 Order Summary</h2>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Items ({cartItems.length})</span>
              <span className="font-semibold">${totalPrice}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold text-green-600">Free</span>
            </div>
            <div className="flex justify-between py-2 font-bold text-lg">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>

            <button
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-lg font-semibold transition"
              onClick={handleProceedToBuy}
            >
              🛍️ Proceed to Buy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
