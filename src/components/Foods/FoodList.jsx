import FoodItem from "../Food/FoodItem";


const FoodList = ({ foods, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 min-h-screen">
        <span className="loading loading-spinner loading-xl text-secondary"></span>
      </div>
    );
  }

  if (!foods || foods.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">No foods found.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {foods.map((food) => (
        <FoodItem key={food.id} food={food} />
      ))}
    </div>
  );
};

export default FoodList;