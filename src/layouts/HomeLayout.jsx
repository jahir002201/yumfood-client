import Footer from './Footer';
import Navbar from './Navbar';
import { Outlet } from 'react-router';

const HomeLayout = () => {
    return (
    <div className="min-h-screen flex flex-col bg-rose-50">
      <Navbar />
      <div className="flex-1 mt-20 px-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;