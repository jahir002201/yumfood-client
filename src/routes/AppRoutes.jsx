import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import HomeLayout from "../layouts/HomeLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ActivateAccount from "../components/Registration/ActivateAccount";
import ResendActivation from "../components/Registration/ResendActivation";
import ResetPasswordConfirm from "../components/Registration/ResetPasswordConfirm";
import ResetPassword from "../components/Registration/ResetPassword";
import Profile from "../pages/Profile";
import Orders from "../pages/Orders";
import FoodDetail from "../pages/FoodDetail";
import Cart from "../pages/Cart";
import Foods from "../pages/Foods";
import Menu from "../pages/Menu";
import CategoryList from "../pages/CategoryList";
import FoodList from "../pages/FoodList";
import Users from "../pages/Users";
import Payments from "../pages/Payments";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route path="activate/:uid/:token" element={<ActivateAccount />} />
            <Route path="resend-activation" element={<ResendActivation />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />

            <Route path="foods" element={<Foods />} />
            <Route path="foods/:foodId" element={<FoodDetail />} />
            <Route path="menu" element={<Menu />} />

            </Route>

            <Route path="dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<Orders/>} />
            <Route path="category/add" element={<CategoryList />} />
            <Route path="food/add" element={<FoodList />} />
            <Route path="payments" element={<Payments />} />
            <Route path="users" element={<Users />} />

            </Route>
            <Route path="*" element={<div className="text-center"><p className="text-center mt-20 text-7xl font-extrabold">404 - Page Not Found</p></div>} />
        </Routes>
    );
};

export default AppRoutes;