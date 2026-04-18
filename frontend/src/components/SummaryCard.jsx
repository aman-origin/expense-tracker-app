
function SummaryCard({ totalExpense, expenseCount }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
      <div className="bg-indigo-600 text-white rounded-xl p-6 shadow">
        <p className="text-sm text-indigo-200 mb-1">Total Spent</p>
        <p className="text-3xl font-bold">
          ₹{Number(totalExpense || 0).toLocaleString("en-IN")}
        </p>
      </div>
      <div className="bg-white rounded-xl p-6 shadow border">
        <p className="text-sm text-gray-500 mb-1">Total Expenses</p>
        <p className="text-3xl font-bold text-gray-800">{expenseCount}</p>
      </div>
    </div>
  );
}

export default SummaryCard;