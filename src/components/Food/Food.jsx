import { useEffect, useState } from "react";
import FoodItem from "./FoodItem";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import ErroAlert from "../ErroAlert";
import apiClient from "../../services/api-client";

const Food = () => {
  const [foods, setFoods] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchFoods = async () => {
      try {
        if (isMounted) setLoading(true);
        const res = await apiClient.get("/foods");
        if (isMounted) setFoods(res.data?.results || []);
      } catch (err) {
        console.error(err);
        if (isMounted) setError("Failed to load foods");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFoods();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="mx-auto py-16 bg-gray-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-8 mb-6 gap-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left">
          Trending Foods
        </h2>
        <a
          href="/foods"
          className="btn btn-secondary px-6 py-3 rounded-full text-lg whitespace-nowrap"
        >
          View All
        </a>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-xl text-secondary"></span>
        </div>
      )}

      {/* Error */}
      {!isLoading && error && <ErroAlert error={error} />}

      {/* Foods Carousel */}
      {!isLoading && !error && foods.length > 0 && (
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          navigation
          breakpoints={{
            320: { slidesPerView: 1 },
            480: { slidesPerView: 1.5 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="mt-6 px-4 sm:px-6 lg:px-8"
        >
          {foods.map((food) => (
            <SwiperSlide key={food.id} className="flex justify-center">
              <FoodItem food={food} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Empty State */}
      {!isLoading && !error && foods.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No Foods Available
        </p>
      )}
    </section>
  );
};

export default Food;