import { useEffect, useState } from "react";
import { FiPackage, FiShoppingCart, FiStar, FiUsers } from "react-icons/fi";
import StatCard from "../components/Dashboard/StatCard";
import Order from "../components/Dashboard/Order";
import authApiClient from "../services/auth-api-client";

const Dashboard = () => {
  const [stats, setStats] = useState({
    foods: 0,
    orders: 0,
    users: 0,
    average_rating: 0,
    weekly_orders: 0,
    trending_foods: [],
    most_liked_foods: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await authApiClient.get("/dashboard/stats/");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FiPackage} title="Total Foods" value={stats.foods} />
        <StatCard icon={FiShoppingCart} title="Total Orders" value={stats.orders} />
        <StatCard icon={FiUsers} title="Total Users" value={stats.users} />
        <StatCard icon={FiStar} title="Average Rating" value={stats.average_rating} />
      </div>

      {/* Weekly Orders */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Weekly Orders</h3>
        <p className="text-gray-700">{stats.weekly_orders} orders placed in the last 7 days.</p>
      </div>

      {/* Trending Foods */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Trending Foods</h3>
        <ul className="list-disc list-inside text-gray-700">
          {stats.trending_foods.length > 0 ? (
            stats.trending_foods.map((item) => (
              <li key={item.food__id}>
                {item.food__name} – {item.order_count} orders
              </li>
            ))
          ) : (
            <p>No trending foods yet.</p>
          )}
        </ul>
      </div>

      {/* Most Liked Foods */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Most Liked Foods</h3>
        <ul className="list-disc list-inside text-gray-700">
          {stats.most_liked_foods.length > 0 ? (
            stats.most_liked_foods.map((item) => (
              <li key={item.food__id}>
                {item.food__name} – {item.avg_rating.toFixed(1)}⭐
              </li>
            ))
          ) : (
            <p>No liked foods yet.</p>
          )}
        </ul>
      </div>

      {/* Recent Orders Table */}
      <Order />
    </div>
  );
};

export default Dashboard;