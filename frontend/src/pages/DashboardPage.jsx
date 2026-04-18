
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import ExpenseCard from "../components/ExpenseCard";
import LoadingSpinner from "../components/LoadingSpinner";
import expenseService from "../services/expenseService";

function DashboardPage() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({ totalExpense: 0, expenseCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [expensesData, summaryData] = await Promise.all([
        expenseService.getAll(),
        expenseService.getSummary(),
      ]);
      setExpenses(expensesData);
      setSummary(summaryData);
    } catch {
      setError("Failed to load data. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      await expenseService.delete(id);
      await fetchData(); // Refresh both list and summary
    } catch {
      setError("Failed to delete expense.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <Link
            to="/expenses/add"
            className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 
                       rounded-lg hover:bg-indigo-700 transition"
          >
            + Add Expense
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">{error}</div>
        ) : (
          <>
            <SummaryCard
              totalExpense={summary.totalExpense}
              expenseCount={summary.expenseCount}
            />

            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Recent Expenses
            </h3>

            {expenses.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-3">📭</p>
                <p className="text-sm">No expenses yet.</p>
                <Link
                  to="/expenses/add"
                  className="text-indigo-600 text-sm font-medium hover:underline mt-1 inline-block"
                >
                  Add your first expense
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {expenses.map((expense) => (
                  <ExpenseCard
                    key={expense.id}
                    expense={expense}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default DashboardPage;