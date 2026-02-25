import { motion as Motion } from "framer-motion";
import heroBg from "../../assets/images/hero-1-bg.png";
import heroImg from "../../assets/images/hero-img.png";
import hero12 from "../../assets/images/hero-1-2.png";
import hero13 from "../../assets/images/hero-1-3.png";

const Hero = () => {
  return (
    <section className="relative bg-rose-50 overflow-hidden">
      {/* Background */}
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full top-90 object-cover z-0"
      />

      {/* Decorative images with subtle floating animation */}
      <Motion.img
        src={hero13}
        alt=""
        className="hidden sm:block absolute top-0 right-5 w-92 md:w-96 z-10"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <Motion.img
        src={hero12}
        alt=""
        className="hidden sm:block absolute bottom-0 left-5 w-120 md:w-xl z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hero content */}
      <div className="relative z-20 container mx-auto px-4 md:px-8 pt-32 text-center flex flex-col justify-between h-full">
        <div>
          <span className="text-red-700 uppercase font-semibold tracking-widest text-sm md:text-base">
            Fast Food Restaurant
          </span>

          <Motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Delicious Fast Food<br /> For Today
          </Motion.h1>

          <Motion.a
            href="#"
            className="inline-block mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Order Your Burger
          </Motion.a>
        </div>

        {/* Hero main image (bigger now) with fade-in + float */}
        <Motion.div
          className="mt-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <Motion.img
            src={heroImg}
            alt="Delicious Food"
            className="mx-auto w-80 sm:w-96 md:w-120 lg:w-xl max-w-7xl"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </Motion.div>
      </div>
    </section>
  );
};

export default Hero;