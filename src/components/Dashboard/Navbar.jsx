import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

const Navbar = ({ sidebarOpen }) => {
  const { user, logoutUser } = useAuthContext();

  return (
    <div className="navbar bg-white shadow-md px-6">
      <div className="flex-none lg:hidden">
        <label htmlFor="drawer-toggle" className="btn btn-ghost">
          {sidebarOpen ? <FiX /> : <FiMenu />}
        </label>
      </div>

      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800">
          <Link to="/dashboard">Dashboard</Link>
        </h2>
      </div>

      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="bg-teal-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
            {user?.first_name?.charAt(0).toUpperCase()}
          </div>
        </label>

        <ul className="menu dropdown-content mt-3 p-2 shadow-xl bg-white rounded-xl w-52 text-gray-700">
          <li><Link to="/dashboard/profile">Profile</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><button onClick={logoutUser} className="hover:text-red-500">Logout</button></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;