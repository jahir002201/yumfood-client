import { motion as Motion } from "framer-motion";
import img1 from "../../assets/images/about/about_1_1.png";
import img2 from "../../assets/images/about/about-shape-1.1.png";
import img3 from "../../assets/images/about/about-shape-1.2.png";

// Text fade-up animation
const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Floating animation for shapes
const floatVariant = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

const AboutSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 md:px-8 lg:py-20 bg-rose-50 shadow-2xl overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* LEFT SIDE IMAGES */}
        <div className="relative flex justify-center md:justify-end">
          {/* Main Image */}
          <Motion.img
            src={img1}
            alt="About"
            className="w-3/4 sm:w-2/3 md:w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />

          {/* Top Small Decorative Image */}
          <Motion.img
            src={img2}
            alt="Decoration"
            className="absolute top-0 right-0 w-1/3 sm:w-1/4 md:w-28 lg:w-36"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            viewport={{ once: true }}
          />
        </div>

        {/* RIGHT SIDE CONTENT */}
        <Motion.div
          className="relative space-y-4 md:space-y-6 lg:space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Motion.span
            className="text-red-500 font-semibold uppercase tracking-widest text-sm sm:text-base"
            variants={fadeUpVariant}
          >
            About Our Restaurant
          </Motion.span>

          <Motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug mt-2"
            variants={fadeUpVariant}
          >
            We invite you to visit our Fast Food Restaurant
          </Motion.h2>

          <Motion.p
            className="text-gray-600 mt-4 sm:mt-6 text-sm sm:text-base md:text-lg leading-relaxed"
            variants={fadeUpVariant}
          >
            At the heart of our kitchen are bold flavors, high-quality ingredients,
            and a commitment to consistency. From juicy burgers, crispy fries,
            and cheesy pizzas to spicy wraps and refreshing drinks, every item
            on our menu is made to order and packed with taste.
          </Motion.p>

          {/* Owner Info */}
          <Motion.div className="mt-6 sm:mt-8" variants={fadeUpVariant}>
            <h4 className="text-lg sm:text-xl font-semibold">Parvez Hossain Imon</h4>
            <p className="text-gray-500 text-sm sm:text-base">Restaurant Owner</p>
          </Motion.div>

          {/* Bottom Right Floating Image */}
          <Motion.img
            src={img3}
            alt="Shape"
            className="absolute -bottom-10 right-0 w-24 sm:w-32 md:w-40 lg:w-48 opacity-90"
            animate="animate"
            variants={floatVariant}
          />
        </Motion.div>
      </div>
    </section>
  );
};

export default AboutSection;