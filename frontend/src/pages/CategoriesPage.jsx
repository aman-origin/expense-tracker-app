
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import categoryService from "../services/categoryService";

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch {
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await categoryService.create({ name: newCategory.trim() });
      setNewCategory("");
      setSuccess("Category created successfully!");
      await fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create category.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Categories</h2>

        {/* Create Category Form */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Add New Category
          </h3>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-3">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 text-green-600 text-sm p-3 rounded-lg mb-3">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="e.g., Entertainment"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={submitting || !newCategory.trim()}
              className="bg-indigo-600 text-white text-sm font-medium px-5 py-2 rounded-lg
                         hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {submitting ? "Adding..." : "Add"}
            </button>
          </form>
        </div>

        {/* Categories List */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              All Categories ({categories.length})
            </h3>

            {categories.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">
                No categories yet.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center justify-between bg-gray-50 
                               rounded-lg px-4 py-3 border border-gray-100"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {cat.name}
                    </span>
                    {cat.global && (
                      <span className="text-xs text-gray-400 ml-2">Global</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default CategoriesPage;