import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import defaultImage from "../../assets/default_food.jpg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const FoodImageGallery = ({ images, foodName }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const displayImages = images?.length > 0 ? images : [{ image: defaultImage }];

  return (
    <div className="rounded-lg bg-white shadow-md overflow-hidden">
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className="food-main-slider"
      >
        {displayImages.map((imageObj, index) => (
          <SwiperSlide key={index}>
            <div className="aspect-square flex items-center justify-center bg-gray-50">
              <img
                src={imageObj.image}
                alt={foodName}
                className="h-full w-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {displayImages.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          slidesPerView={4}
          spaceBetween={10}
          watchSlidesProgress
          className="food-thumbs-slider mt-4"
        >
          {displayImages.map((imageObj, index) => (
            <SwiperSlide key={index} className="h-20 cursor-pointer">
              <div className="h-full w-full overflow-hidden rounded-lg flex items-center justify-center bg-gray-50">
                <img
                  src={imageObj.image}
                  alt={foodName}
                  className="h-full w-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default FoodImageGallery;