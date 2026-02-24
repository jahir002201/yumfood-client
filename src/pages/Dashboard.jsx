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
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FiPackage} title="Total Foods" value={stats.foods} />
        <StatCard icon={FiShoppingCart} title="Total Orders" value={stats.orders} />
        <StatCard icon={FiUsers} title="Total Users" value={stats.users} />
        <StatCard icon={FiStar} title="Average Rating" value={stats.average_rating} />
      </div>

      <Order />
    </div>
  );
}

export default Dashboard