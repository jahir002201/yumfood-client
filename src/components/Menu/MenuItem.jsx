import { Link } from "react-router";
import defaultImage from "../../assets/default_food.jpg";

const MenuItem = ({ food }) => {
  const image = food?.images?.length > 0 ? food.images[0].image : defaultImage;

  return (
    <Link to={`/foods/${food.id}`} className="group">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
        {/* Image */}
        <div className="w-full h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
          <img
            src={image}
            alt={food.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between text-center">
          <div>
            <h3 className="text-lg font-semibold line-clamp-2 text-gray-800">{food.name}</h3>

            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="text-sm text-gray-500">Price:</span>
              <span className="text-xl font-bold text-secondary">${food.price}</span>
            </div>

            <p className="text-gray-600 text-sm mt-2 line-clamp-3">
              {food.description}
            </p>
          </div>

          <button className="btn btn-secondary w-full mt-4 transition-transform hover:scale-105">
            Buy Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default MenuItem;