import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import {
  Home,
  Calendar,
  Dumbbell,
  MessageSquare,
  User,
  LogOut,
} from "lucide-react";
import axios from "axios";

export default function Sidebar({ onClose }) {
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", icon: "/assets/icon5.svg", label: "Home" },
    { path: "/sessions", icon: "/assets/icon3.svg", label: "Sessions" },
    { path: "/exercises", icon: "/assets/icon2.svg", label: "Exercises" },
    { path: "/journal", icon: "/assets/journal.svg", label: "Journal" },
    { path: "/chat", icon: "/assets/icon4.svg", label: "Chat" },
  ];

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      logout();
      navigate("/login", { replace: true });
    }
  };

  const handleNavClick = () => {
    // Close sidebar on mobile after navigation
    if (onClose) onClose();
  };

  return (
    <aside className="w-72 lg:w-80 bg-[#FFFFFF] border-r flex flex-col h-screen">
      {/* User Profile Section */}
      <div className="p-4 lg:p-6 border-b">
        <div className="flex items-center gap-3">
          <img
            src="assets/admin2.jpg"
            alt="Profile"
            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-[#121714] text-sm lg:text-base">
              {user?.name || "User"}
            </h3>
            <p className="text-xs lg:text-sm text-gray-600">Level1</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-3 lg:p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={`flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg transition-colors text-sm lg:text-base ${
                isActive
                  ? "bg-green-50 text-green-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <img
                src={item.icon}
                alt={item.label}
                className="w-4 h-4 lg:w-5 lg:h-5"
              />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-3 lg:p-4 border-t border-gray-200 space-y-2">
        <Link
          to="/profile"
          onClick={handleNavClick}
          className="flex items-center gap-3 px-3 lg:px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm lg:text-base"
        >
          <User size={18} className="lg:w-5 lg:h-5" />
          <span className="font-medium text-[#121714]">Profile</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 lg:px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm lg:text-base"
        >
          <LogOut size={18} className="lg:w-5 lg:h-5" />
          <span className="font-medium text-[#121714]">Logout</span>
        </button>
      </div>
    </aside>
  );
}
