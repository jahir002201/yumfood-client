import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router";


const CategoryItems = ({ index, category }) => {

  const gradients = [
    "from-pink-100 to-blue-100",
    "from-blue-100 to-purple-100",
    "from-purple-100 to-pink-100",
    "from-pink-100 to-blue-100",
    "from-blue-100 to-purple-100",
    "from-purple-100 to-pink-100",
  ];

  const gradientClass = `bg-gradient-to-br ${gradients[index % gradients.length]}`;

  // Truncate description safely
  const description =
    category.description?.length > 26
      ? category.description.slice(0, 26) + "..."
      : category.description || "";

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer ${gradientClass}`}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="h-10 w-10 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-xl">
            {category?.name?.charAt(0)}
          </div>
          <span className="text-sm text-gray-600 bg-white/70 px-2 py-1 rounded-full">
            {category.food_count || 0} Items
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2">{category.name}</h3>

        <p className="text-gray-600 text-sm mb-4 grow">{description}</p>

        <button className="text-pink-500 font-bold hover:text-pink-600 transition-colors flex items-center gap-1">
          <Link to={`/menu?category=${category.id}`}> Explore <FaAngleRight /> </Link> 
        </button>
      </div>
    </div>
  );
};

export default CategoryItems;