import { useState } from "react";
import useFetchFoods from "../../hooks/useFetchFoods";
import useFetchCategories from "../../hooks/useFetchCategories";
import MenuItem from "./MenuItem";
import Pagination from "./Pagination";

const MenuGrid = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange] = useState([0, 1000]);
  const [searchQuery] = useState("");
  const [sortOrder] = useState("");

  const { foods, loading, totalPages } = useFetchFoods(
    currentPage,
    priceRange,
    activeCategory,
    searchQuery,
    sortOrder
  );

  const categories = useFetchCategories();

  return (
    <section className="py-16 bg-rose-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Our Fast Foods
        </h2>
        <p className="text-center text-gray-500 mt-2 mb-8">
          Delicious dishes made to order
        </p>

        {/* Category Tabs */}
        <div className="flex justify-center flex-wrap gap-4 mb-10">
          <button
            onClick={() => setActiveCategory("")}
            className={`px-5 py-2 rounded-full font-medium transition ${
              activeCategory === ""
                ? "bg-secondary text-white shadow"
                : "bg-white border hover:bg-secondary hover:text-white"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full font-medium transition ${
                activeCategory === cat.id
                  ? "bg-secondary text-white shadow"
                  : "bg-white border hover:bg-secondary hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-secondary"></span>
          </div>
        )}

        {/* Food Grid */}
        {!loading && foods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {foods.map((food) => (
              <MenuItem key={food.id} food={food} />
            ))}
          </div>
        ) : (
          !loading && (
            <p className="text-center text-gray-500 mt-10">No foods found.</p>
          )
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={setCurrentPage}
          />
        )}
      </div>
    </section>
  );
};

export default MenuGrid;