import { useEffect, useState } from "react";
import authApiClient from "../services/auth-api-client";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await authApiClient.get("/auth/users/");
        setUsers(res.data || []); // fallback to empty array
      } catch (err) {
        setError(
          err.response?.data?.detail || err.message || "Failed to fetch users"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <p className="text-lg text-gray-500 animate-pulse">Loading users...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  if (users.length === 0)
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <p className="text-gray-500 text-lg">No users found.</p>
      </div>
    );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-teal-500 text-white">
            <tr>
              <th className="py-3 px-6 text-left uppercase">ID</th>
              <th className="py-3 px-6 text-left uppercase">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                key={user.id}
                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-3 px-6 whitespace-nowrap">{user.id}</td>
                <td className="py-3 px-6 whitespace-nowrap">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;