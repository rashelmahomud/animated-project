"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [purchased, setPurchased] = useState([]);
  const [totalOrders, setTotalOrders] = useState(11);
  const [totalRevenue, setTotalRevenue] = useState(120);


  useEffect(() => {
    const data = localStorage.getItem("purchasedProducts");

    if (data) {
        const items =  JSON.parse(data)
        setPurchased(items)

        // total order items
      setTotalOrders(items.length)

      // revenue price
      const revenue = items.reduce((acc,item) => acc + item.price * item.quantity,0)
      setTotalRevenue(revenue)
    };

  }, []);



  return (
    <main className="bg-white dark:bg-gray-800 min-h-screen bg-gray-50 p-6 md:p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 Dashboard</h1>

      {/* Summary Cards */}
    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-sm text-gray-500">Total Orders</h2>
          <p className="text-2xl font-bold text-blue-600 mt-1">{totalOrders}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-sm text-gray-500">Revenue</h2>
          <p className="text-2xl font-bold text-green-600 mt-1">${totalRevenue}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-sm text-gray-500">New Customers</h2>
          <p className="text-2xl font-bold text-purple-600 mt-1">125</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-sm text-gray-500">Refunds</h2>
          <p className="text-2xl font-bold text-red-500 mt-1">5</p>
        </div>
      </div> 

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 dark:text-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
          Recent Orders
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: "#001",
                  customer: "Rafi",
                  total: "$120",
                  status: "Completed",
                },
                {
                  id: "#002",
                  customer: "Sumaiya",
                  total: "$99",
                  status: "Pending",
                },
                {
                  id: "#003",
                  customer: "Hasan",
                  total: "$49",
                  status: "Shipped",
                },
              ].map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.customer}</td>
                  <td className="px-4 py-2">{order.total}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
