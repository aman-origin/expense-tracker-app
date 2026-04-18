
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import expenseService from "../services/expenseService";

function AddExpensePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await expenseService.create(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save expense.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Expense</h2>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-md p-6">
          <ExpenseForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </main>
    </div>
  );
}

export default AddExpensePage;