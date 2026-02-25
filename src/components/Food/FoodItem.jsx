import { Link } from "react-router";
import defaultImage from "../../assets/default_food.jpg";

const FoodItem = ({ food }) => {
  const image = food?.images?.[0]?.image || defaultImage;
  const isSpecial = food.is_special;
  const finalPrice = isSpecial ? food.price_with_discount : food.price;

  return (
    <Link to={`/foods/${food.id}`} className="group">
      <div className="card bg-base-100 w-full max-w-sm shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden">

        {/* Image */}
        <figure className="relative w-full aspect-square bg-gray-50 flex items-center justify-center p-4">
          {isSpecial && (
            <div className="absolute top-2 left-2 badge badge-error text-white">
              -{food.discount_percent}%
            </div>
          )}
          <img
            src={image}
            alt={food.name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </figure>

        {/* Body */}
        <div className="card-body items-center text-center">
          <h2 className="card-title line-clamp-2">{food.name}</h2>

          {/* Price Section */}
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-xl text-red-600">
              ${finalPrice}
            </h3>

            {isSpecial && (
              <span className="text-sm line-through text-gray-400">
                ${food.price}
              </span>
            )}
          </div>

          <p className="line-clamp-3 text-gray-600">{food.description}</p>

          <div className="card-actions mt-2 w-full">
            <button className="btn btn-secondary w-full">Buy Now</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FoodItem;