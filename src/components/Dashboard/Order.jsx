import { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await authApiClient.get("/orders/");
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="mt-6 bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );

  const statusClasses = {
    "Not Paid": "bg-yellow-400 text-gray-800",
    "Ready To Ship": "bg-blue-400 text-white",
    "Shipped": "bg-purple-500 text-white",
    "Delivered": "bg-green-500 text-white",
    "Canceled": "bg-red-500 text-white",
  };

  return (
    <div className="mt-6 bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Orders
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="border-b">
            <tr className="text-gray-500">
              <th className="py-2">Order ID</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Status</th>
              <th className="py-2">Date</th>
              <th className="py-2">Amount</th>
            </tr>
          </thead>

          <tbody>
            {orders.slice(0, 5).map((order) => (
              <tr
                key={order.id}
                className="border-b last:border-none hover:bg-rose-50 transition"
              >
                <td className="py-3 font-medium text-gray-700">
                  #{order.id}
                </td>

                <td className="py-3 text-gray-600">
                  {order.user?.first_name}{" "}
                  {order.user?.last_name || ""}
                </td>

                <td className="py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusClasses[order.status] ||
                      "bg-gray-300 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="py-3 text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>

                <td className="py-3 font-semibold text-gray-800">
                  ${order.total_price?.toFixed(2) || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-gray-400 mt-4 text-center">
            No recent orders found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Order;