import { Link } from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import useCartContext from "../hooks/useCartContext";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  const { user, logoutUser } = useAuthContext();
  const { cart } = useCartContext();

  return (
    <div className="navbar fixed top-0 left-0 w-full bg-teal-500 text-white shadow-md z-30 px-6">
      
      {/* Navbar Start */}
      <div className="navbar-start">
        
        {/* Mobile menu */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden text-white hover:bg-teal-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-3 shadow-lg bg-white text-gray-800 rounded-xl w-52"
          >
            <li><Link className="hover:text-pink-500" to="/">HOME</Link></li>
            <li><Link className="hover:text-pink-500" to="/about">ABOUT</Link></li>
            <li><Link className="hover:text-pink-500" to="/menu">MENU</Link></li>
            <li><Link className="hover:text-pink-500" to="/foods">FOODS</Link></li>
          </ul>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-all duration-300"
        >
          <FiShoppingCart className="h-7 w-7" />
          <h1 className="text-xl font-bold sm:text-2xl tracking-wide">
            YumFood
          </h1>
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium gap-2">
          <li><Link className="hover:text-yellow-200 transition" to="/">HOME</Link></li>
          <li><Link className="hover:text-yellow-200 transition" to="/about">ABOUT</Link></li>
          <li><Link className="hover:text-yellow-200 transition" to="/menu">MENU</Link></li>
          <li><Link className="hover:text-yellow-200 transition" to="/foods">FOODS</Link></li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-3">

        {user ? (
          <>
            {/* Cart */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-circle bg-white text-teal-500 border-none hover:bg-gray-100">
                <div className="indicator">
                  <FiShoppingCart className="h-5 w-5" />
                  <span className="badge badge-sm indicator-item bg-yellow-400 text-gray-800 border-none">
                    {cart?.items?.length || 0}
                  </span>
                </div>
              </label>

              <div
                tabIndex={0}
                className="card card-compact dropdown-content mt-3 w-56 shadow-xl bg-white text-gray-800 rounded-xl"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">
                    {cart?.items?.length || 0} Items
                  </span>
                  <span>
                    Subtotal: ${cart?.total_price || 0}
                  </span>
                  <div className="card-actions mt-2">
                    <Link
                      to="/dashboard/cart"
                      className="btn bg-pink-400 hover:bg-pink-500 text-white border-none w-full rounded-xl"
                    >
                      View Cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* User Avatar */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="bg-white text-teal-500 text-xl font-bold flex items-center justify-center w-10 h-10 rounded-full shadow">
                  {user?.first_name?.charAt(0).toUpperCase()}
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 w-52 shadow-xl bg-white text-gray-800 rounded-xl"
              >
                <li><Link to="/dashboard/profile">Profile</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li>
                  <button
                    onClick={logoutUser}
                    className="text-left hover:text-red-500"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="btn bg-pink-400 hover:bg-pink-500 text-white border-none rounded-xl px-5"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn bg-pink-400 hover:bg-pink-500 text-white border-none rounded-xl px-5"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;