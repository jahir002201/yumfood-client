import {
  FiBarChart2,
  FiPackage,
  FiPlusCircle,
  FiShoppingCart,
  FiUsers,
} from "react-icons/fi";
import { NavLink, Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

const Sidebar = () => {
  const { user } = useAuthContext();

  const menus = user?.is_staff
    ? [
        { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
        { to: "/foods", icon: FiPackage, label: "Foods" },
        { to: "/dashboard/category/add", icon: FiPlusCircle, label: "Add Category" },
        { to: "/dashboard/food/add", icon: FiPlusCircle, label: "Add Food" },
        { to: "/dashboard/cart", icon: FiShoppingCart, label: "Cart" },
        { to: "/dashboard/orders", icon: FiPackage, label: "Orders" },
        { to: "/dashboard/users", icon: FiUsers, label: "Users" },
        { to: "/dashboard/payments", icon: FiPackage, label: "Payments" },
      ]
    : [
        { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
        { to: "/dashboard/cart", icon: FiShoppingCart, label: "Cart" },
        { to: "/dashboard/orders", icon: FiPackage, label: "Orders" },
        { to: "/dashboard/payments", icon: FiPackage, label: "Payments" },
      ];

  return (
    <div className="drawer-side z-20">
      <label htmlFor="drawer-toggle" className="drawer-overlay"></label>

      <aside className="menu bg-white w-64 min-h-full p-6 text-gray-700 flex flex-col shadow-xl">
        <Link to="/" className="mb-8 text-xl font-bold text-teal-600">
          YumFood
        </Link>

        <ul className="flex-1 space-y-2">
          {menus.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-teal-500 text-white shadow"
                      : "hover:bg-rose-100 hover:text-teal-600"
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="text-xs text-gray-400 text-center mt-auto">
          © 2026 YumFood Admin
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;