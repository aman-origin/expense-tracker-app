
import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-xl font-bold tracking-tight">
          💰 ExpenseTracker
        </Link>
        <Link
          to="/dashboard"
          className="text-sm hover:text-indigo-200 transition"
        >
          Dashboard
        </Link>
        <Link
          to="/expenses/add"
          className="text-sm hover:text-indigo-200 transition"
        >
          Add Expense
        </Link>
        <Link
          to="/categories"
          className="text-sm hover:text-indigo-200 transition"
        >
          Categories
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-indigo-200">
          Hello, {user?.name || "User"}
        </span>
        <button
          onClick={handleLogout}
          className="bg-white text-indigo-600 text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-indigo-50 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;