
import { useState, useEffect } from "react";
import categoryService from "../services/categoryService";

function ExpenseForm({ initialData, onSubmit, loading }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    categoryService
      .getAll()
      .then(setCategories)
      .catch(() => setError("Failed to load categories"));
  }, []);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        amount: initialData.amount || "",
        description: initialData.description || "",
        date: initialData.date || new Date().toISOString().split("T")[0],
        categoryId: initialData.category?.id || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.categoryId) {
      setError("Please select a category");
      return;
    }
    onSubmit({
      ...form,
      amount: parseFloat(form.amount),
      categoryId: parseInt(form.categoryId),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="e.g., Lunch at restaurant"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount (₹) *
        </label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          required
          min="0.01"
          step="0.01"
          placeholder="250.00"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date *
        </label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category *
        </label>
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name} {cat.global ? "(Global)" : ""}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          placeholder="Optional notes..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium text-sm
                   hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
      >
        {loading ? "Saving..." : "Save Expense"}
      </button>
    </form>
  );
}

export default ExpenseForm;