
import { useNavigate } from "react-router-dom";

const categoryColors = {
  Food: "bg-orange-100 text-orange-700",
  Travel: "bg-blue-100 text-blue-700",
  Bills: "bg-red-100 text-red-700",
  Shopping: "bg-pink-100 text-pink-700",
  Health: "bg-green-100 text-green-700",
  default: "bg-gray-100 text-gray-700",
};

function ExpenseCard({ expense, onDelete }) {
  const navigate = useNavigate();
  const categoryName = expense.category?.name || "Uncategorized";
  const colorClass =
    categoryColors[categoryName] || categoryColors.default;

  const formattedDate = new Date(expense.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-xl shadow p-5 border border-gray-100 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 truncate">{expense.title}</h3>
          {expense.description && (
            <p className="text-sm text-gray-500 mt-0.5 truncate">
              {expense.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${colorClass}`}
            >
              {categoryName}
            </span>
            <span className="text-xs text-gray-400">{formattedDate}</span>
          </div>
        </div>

        <div className="flex flex-col items-end ml-4 gap-2">
          <span className="text-lg font-bold text-indigo-600">
            ₹{Number(expense.amount).toLocaleString("en-IN")}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/expenses/edit/${expense.id}`)}
              className="text-xs text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(expense.id)}
              className="text-xs text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseCard;