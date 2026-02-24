import { motion as Motion } from "framer-motion";
import { FaShoppingCart, FaTags } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { BsShieldLock } from "react-icons/bs";

import imgMain from "../assets/images/about/about_1_1.png";
import shapeTop from "../assets/images/about/about-shape-1.1.png";
import shapeBottom from "../assets/images/about/about-shape-1.2.png";

import workImg1 from "../assets/images/dish/1.png";
import workImg2 from "../assets/images/dish/2.png";
import workImg3 from "../assets/images/dish/3.png";
import workImg4 from "../assets/images/dish/4.png";
import workImg5 from "../assets/images/dish/5.png";
import workImg6 from "../assets/images/dish/6.png";

import chef1 from "../assets/images/chef/c1.jpg";
import chef2 from "../assets/images/chef/c2.jpg";
import chef3 from "../assets/images/chef/c3.jpg";
import chef4 from "../assets/images/chef/c4.jpg";
import chef5 from "../assets/images/chef/c5.jpg";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const floatVariant = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

const features = [
  { id: 1, icon: FaShoppingCart, title: "Fast Delivery", desc: "Get your favorite dishes delivered quickly and safely." },
  { id: 2, icon: FaTags, title: "Discount Voucher", desc: "Grab special discounts and offers with our vouchers." },
  { id: 3, icon: MdVerified, title: "Quality Guaranteed", desc: "We ensure the freshest ingredients and top quality." },
  { id: 4, icon: BsShieldLock, title: "Secure Payment", desc: "Your payments are protected and fully secure." },
];

const workProcess = [
  { id: 1, img: workImg1, step: "01", title: "Order Your Favorites", desc: "Browse our menu filled with delicious dishes, from signature specials to classic foods." },
  { id: 2, img: workImg2, step: "02", title: "Freshly Prepared with Care", desc: "Our chefs get to work, preparing your meal with fresh, high-quality ingredients." },
  { id: 3, img: workImg3, step: "03", title: "Enjoy & Savor Every Bite", desc: "Relax and enjoy your food in our cozy restaurant, or take it to-go." },
  { id: 4, img: workImg4, step: "04", title: "Secure Payment", desc: "Your payments are protected and fully secure." },
  { id: 5, img: workImg5, step: "05", title: "Order Your Favorites", desc: "Browse our menu filled with delicious dishes, from signature specials to classic foods." },
  { id: 6, img: workImg6, step: "06", title: "Freshly Prepared with Care", desc: "Our chefs get to work, preparing your meal with fresh, high-quality ingredients." },
];

const chefs = [
  { id: 1, img: chef1, name: "Alina Morish", role: "Expert Chef" },
  { id: 2, img: chef2, name: "Michel Clark", role: "Expert Chef" },
  { id: 3, img: chef3, name: "Esa Elizabed", role: "Expert Chef" },
  { id: 4, img: chef4, name: "William Latham", role: "Expert Chef" },
  { id: 5, img: chef5, name: "Alina Morish", role: "Expert Chef" },
];

const About = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 md:px-8 bg-rose-50 overflow-hidden">
      {/* Top About Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
        <div className="relative flex justify-center md:justify-end">
          <Motion.img
            src={imgMain}
            alt="About"
            className="w-full max-w-md sm:max-w-lg md:max-w-full object-contain"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
          <Motion.img
            src={shapeTop}
            alt="Shape"
            className="absolute top-0 right-0 w-1/3 sm:w-1/4 md:w-28 lg:w-36"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            viewport={{ once: true }}
          />
        </div>

        <Motion.div
          className="space-y-6 md:space-y-8 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Motion.span className="text-teal-500 font-semibold uppercase tracking-widest text-sm sm:text-base" variants={fadeUpVariant}>
            About Our Restaurant
          </Motion.span>
          <Motion.h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug text-gray-800" variants={fadeUpVariant}>
            We invite you to visit our Fast Food Restaurant
          </Motion.h2>
          <Motion.p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed" variants={fadeUpVariant}>
            At the heart of our kitchen are bold flavors, high-quality ingredients, and a commitment to consistency. From juicy burgers, crispy fries, and cheesy pizzas to spicy wraps and refreshing drinks, every item on our menu is made to order and packed with taste.
          </Motion.p>
          <Motion.div className="mt-4" variants={fadeUpVariant}>
            <h4 className="text-lg sm:text-xl font-semibold text-gray-800">Parvez Hossain Imon</h4>
            <p className="text-gray-500 text-sm sm:text-base">Restaurant Owner</p>
          </Motion.div>
          <Motion.img
            src={shapeBottom}
            alt="Shape"
            className="absolute -bottom-10 right-0 w-24 sm:w-32 md:w-40 lg:w-48 opacity-90"
            variants={floatVariant}
            animate="animate"
          />
        </Motion.div>
      </div>

      {/* Features Section */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6">
        {features.map(f => {
          const Icon = f.icon;
          return (
            <div key={f.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center text-center">
              <Icon className="text-4xl text-teal-500 mb-4" />
              <h3 className="font-bold text-lg mb-2 text-gray-800">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Work Process Section */}
      <div className="mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">How We Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {workProcess.map(w => (
            <div key={w.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center">
              <img src={w.img} alt={w.title} className="w-48 h-48 sm:w-56 sm:h-56 md:w-56 md:h-56 mb-4 object-cover rounded-full" />
              <span className="text-teal-500 font-bold text-2xl">{w.step}</span>
              <h3 className="font-semibold text-lg mt-2 text-gray-800">{w.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chef Team Section */}
      <div className="mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">Meet Our Expert Chefs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {chefs.map(c => (
            <div key={c.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-center">
              <img src={c.img} alt={c.name} className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 mx-auto rounded-full mb-4 object-cover" />
              <h4 className="font-semibold text-gray-800">{c.name}</h4>
              <p className="text-gray-500 text-sm">{c.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;