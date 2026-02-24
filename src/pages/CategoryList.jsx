import { useState } from "react";
import useCategory from "../hooks/useCategory";
import authApiClient from "../services/auth-api-client";
import CategoryForm from "../components/Home/Categories/CategoryForm";

const CategoryList = () => {
  const { categories, setCategories, loading, error } = useCategory();
  const [editingCategory, setEditingCategory] = useState(null);
  const [creating, setCreating] = useState(false);

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await authApiClient.delete(`/categories/${id}/`);
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // CREATE
  const handleCreate = async (data) => {
    try {
      const res = await authApiClient.post("/categories/", data);
      setCategories([...categories, res.data]);
      setCreating(false);
    } catch (err) {
      console.error("Create failed:", err);
    }
  };

  // UPDATE
  const handleUpdate = async (data) => {
    try {
      const res = await authApiClient.put(`/categories/${editingCategory.id}/`, data);
      setCategories(
        categories.map((cat) => (cat.id === editingCategory.id ? res.data : cat))
      );
      setEditingCategory(null);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading categories...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">Error loading categories.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">Category Management</h1>

      <div className="text-center">
        <button
          onClick={() => setCreating(true)}
          className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition"
        >
          Add New Category
        </button>
      </div>

      <div className="space-y-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center hover:shadow-lg transition"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{category.name}</h2>
              <p className="text-gray-600">{category.description}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setEditingCategory(category)}
                className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {(creating || editingCategory) && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => {
                setCreating(false);
                setEditingCategory(null);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-3xl font-bold"
            >
              &times;
            </button>

            {creating && (
              <CategoryForm
                key="new-category"
                initialData={{ name: "", description: "" }}
                onSubmit={handleCreate}
                onCancel={() => setCreating(false)}
              />
            )}

            {editingCategory && (
              <CategoryForm
                key={editingCategory.id}
                initialData={editingCategory}
                onSubmit={handleUpdate}
                onCancel={() => setEditingCategory(null)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;