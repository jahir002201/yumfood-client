import { useEffect, useState } from "react";
import apiClient from "../../../services/api-client";
import CategoryItems from "./CategoryItems";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiClient.get("/categories");
        setCategories(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <p className="text-center text-gray-500">Loading categories...</p>
      </section>
    );
  }

  if (!categories.length) {
    return (
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <p className="text-center text-gray-500">No categories available.</p>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto bg-rose-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Browse Categories</h2>
        <a
          href="#"
          className="btn btn-secondary px-6 py-3 rounded-full text-lg"
        >
          View All
        </a>
      </div>

      {/* Swiper Carousel */}
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
        className="pb-6"
      >
        {categories.map((category, index) => (
          <SwiperSlide key={category.id} className="flex justify-center">
            <CategoryItems index={index} category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Category;