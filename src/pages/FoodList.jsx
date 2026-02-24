import { useEffect, useState } from "react";
import authApiClient from "../services/auth-api-client";
import apiClient from "../services/api-client";
import FoodForm from "../components/FoodForm";
import useCategory from "../hooks/useCategory";

const FoodList = () => {
  const { categories } = useCategory();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingFood, setEditingFood] = useState(null);
  const [creating, setCreating] = useState(false);

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Fetch all foods
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await apiClient.get("/foods/");
        setFoods(res.data?.results || []);
      } catch (err) {
        setError("Failed to fetch foods");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  // Delete food
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food?")) return;
    try {
      await authApiClient.delete(`/foods/${id}/`);
      setFoods((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete food");
    }
  };

  // Create / Update food
  const handleSubmit = async (data) => {
    try {
      if (editingFood) {
        const res = await authApiClient.put(`/foods/${editingFood.id}/`, data);
        setFoods((prev) =>
          prev.map((f) => (f.id === editingFood.id ? res.data : f))
        );
        setEditingFood(null);
      } else {
        const res = await authApiClient.post("/foods/", data);
        setFoods((prev) => [...prev, res.data]);
      }
      setCreating(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save food");
    }
  };

  // Image upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleUpload = async (foodId) => {
    if (!images.length) return alert("Select images first");
    setUploading(true);
    try {
      for (const img of images) {
        const formData = new FormData();
        formData.append("image", img);
        await authApiClient.post(`/foods/${foodId}/images/`, formData);
      }
      setImages([]);
      setPreviewImages([]);
      alert("Images uploaded successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading foods...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Food Management</h1>

      {/* Create Button */}
      <div className="text-center mb-6">
        <button
          onClick={() => setCreating(true)}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Add New Food
        </button>
      </div>

      {/* Food List */}
      <div className="space-y-4">
        {foods.map((food) => (
          <div
            key={food.id}
            className="bg-white shadow rounded p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{food.name}</h2>
              <p className="text-gray-600">{food.description}</p>
              <p className="text-gray-800 font-medium">Price: ${food.price}</p>
              <p className="text-gray-800 font-medium">Stock: {food.stock}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingFood(food)}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(food.id)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {(creating || editingFood) && (
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/30">
          <div className="bg-white rounded shadow-lg w-full max-w-lg p-6 relative z-50">
            <button
              onClick={() => {
                setCreating(false);
                setEditingFood(null);
                setImages([]);
                setPreviewImages([]);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>

            <FoodForm
              key={editingFood ? editingFood.id : "new-food"}
              initialData={
                editingFood || { name: "", description: "", price: "", stock: "", category: "" }
              }
              categories={categories || []}
              onSubmit={handleSubmit}
            />

            {/* Image Upload Section */}
            {editingFood && (
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Upload Images</h3>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  onChange={handleImageChange}
                />
                {previewImages.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {previewImages.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt="Preview"
                        className="w-16 h-16 rounded-md object-cover"
                      />
                    ))}
                  </div>
                )}
                <button
                  onClick={() => handleUpload(editingFood.id)}
                  className="btn btn-primary w-full mt-2"
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload Images"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodList;