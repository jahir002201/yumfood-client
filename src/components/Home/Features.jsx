import { FaShoppingCart, FaTags } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { BsShieldLock } from "react-icons/bs";

const Features = () => {
  const features = [
    {
      icon: FaShoppingCart,
      title: "Free Delivery",
      description: "Get your favorite meals delivered to your doorstep fast and free.",
    },
    {
      icon: MdVerified,
      title: "Top Quality",
      description: "We ensure the freshest ingredients and best quality food every time.",
    },
    {
      icon: FaTags,
      title: "Daily Offers",
      description: "Special discounts and offers available every day for YumFood users.",
    },
    {
      icon: BsShieldLock,
      title: "Secure Payment",
      description: "All payments are encrypted and fully secure, shop with confidence.",
    },
  ];

  return (
    <section className="px-4 md:px-8 py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold">Why Choose YumFood?</h2>
        <p className="text-gray-600 mt-2">
          Delicious food, fast delivery, and great offers every day.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {features.map(({ icon: Icon, title, description }, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 rounded-xl shadow-sm hover:shadow-lg transition duration-300 bg-white h-full"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 mb-4">
              {Icon && <Icon className="text-red-500 text-3xl" />}
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-500 text-sm grow line-clamp-3">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;