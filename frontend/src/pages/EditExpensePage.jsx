
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import LoadingSpinner from "../components/LoadingSpinner";
import expenseService from "../services/expenseService";

function EditExpensePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    expenseService
      .getById(id)
      .then(setExpense)
      .catch(() => setError("Failed to load expense."))
      .finally(() => setFetchLoading(false));
  }, [id]);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await expenseService.update(id, data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update expense.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Expense</h2>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {fetchLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <ExpenseForm
              initialData={expense}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default EditExpensePage;