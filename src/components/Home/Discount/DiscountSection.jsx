import { motion as Motion } from "framer-motion";
import bgImg from "../../../assets/images/cta-bg-1-1.png";
import leftImg from "../../../assets/images/coming-left-1.png";
import rightImg from "../../../assets/images/coming-right.png";
import DiscountTimer from "./DiscountTimer";

const DiscountSection = () => {
  return (
    <section
      className="relative w-full min-h-162.5 bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-amber-200 z-0"></div>

      <div className="relative container mx-auto px-6 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10">

          {/* Left Image */}
          <Motion.div
            initial={{ x: -20, opacity: 0.5 }}
            whileInView={{ x: 0, opacity: 1 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="flex justify-center"
          >
            <img
              src={leftImg}
              alt="Left Burger"
              className="w-7xl drop-shadow-2xl"
            />
          </Motion.div>

          {/* Center Content */}
          <Motion.div
            initial={{ y: 80, opacity: 0.5 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center text-center text-white"
          >
            <div className="max-w-125 w-full">

              <p className="uppercase tracking-widest text-red-600 mb-4 text-bold">
                Special Offer
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black leading-tight mb-6">
                30% Discount On
                <span className="block text-2xl sm:text-3xl md:text-4xl font-extrabold">All YumFood Items!</span>
              </h1>
              <DiscountTimer />

              <button className="mt-6 bg-pink-600 hover:bg-pink-700 transition px-8 py-3 rounded-full font-semibold shadow-lg">
                Food Collection
              </button>

            </div>
          </Motion.div>

          {/* Right Image */}
          <Motion.div
            initial={{ x: 20, opacity: 0.5 }}
            whileInView={{ x: 0, opacity: 1 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="flex justify-center"
          >
            <img
              src={rightImg}
              alt="Right Burger"
              className="w-7xl drop-shadow-2xl"
            />
          </Motion.div>

        </div>
      </div>
    </section>
  );
};

export default DiscountSection;