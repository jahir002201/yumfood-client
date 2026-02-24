import { useEffect } from "react";
import { useForm } from "react-hook-form";

const FoodForm = ({ initialData, categories, onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  });

  useEffect(() => {
    for (const key in initialData) {
      setValue(key, initialData[key]);
    }
  }, [initialData, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Food Name</label>
        <input
          {...register("name", { required: "Food name is required" })}
          className="input input-bordered w-full"
          placeholder="Food Name"
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          {...register("description", { required: "Description is required" })}
          className="textarea textarea-bordered w-full"
          placeholder="Description"
        />
        {errors.description && (
          <p className="text-red-500 text-xs">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Price</label>
        <input
          type="text"
          {...register("price", {
            required: "Price is required",
            validate: (v) => !isNaN(parseFloat(v)) || "Enter a valid number",
          })}
          className="input input-bordered w-full"
          placeholder="Price"
        />
        {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Stock</label>
        <input
          type="number"
          {...register("stock", { required: "Stock is required" })}
          className="input input-bordered w-full"
          placeholder="Stock"
        />
        {errors.stock && <p className="text-red-500 text-xs">{errors.stock.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Category</label>
        <select
          {...register("category", { required: "Category is required" })}
          className="select select-bordered w-full"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
      </div>

      <button type="submit" className="btn btn-primary w-full">
        {initialData.id ? "Update Food" : "Add Food"}
      </button>
    </form>
  );
};

export default FoodForm;