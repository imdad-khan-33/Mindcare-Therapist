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

export default function Sidebar() {
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", icon: "/assets/icon5.svg", label: "Home" },
    { path: "/sessions", icon: "/assets/icon3.svg", label: "Sessions" },
    { path: "/exercises", icon: "/assets/icon2.svg", label: "Exercises" },
    { path: "/chat", icon: "/assets/icon4.svg", label: "Chat" },
  ];

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      logout();
      navigate("/login", { replace: true });
    }
  };

  return (
    <aside className="w-80 bg-[#FFFFFF] border-r  flex flex-col h-screen">
      {/* User Profile Section */}
      <div className="p-6 border-b ">
        <div className="flex items-center gap-3">
          {/* <img
            src="https://via.placeholder.com/48"
            alt="Profile"
            className="w-12 h-12 rounded-full"
          /> */}
          <div>
            <h3 className="font-semibold text-[#121714]">
              {user?.name || "User"}
            </h3>
            {/* <p className="text-sm text-gray-600">{user?.email || ""}</p> */}
            <p>Level2</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-green-50 text-green-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <img src={item.icon} alt={item.label} className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Link
          to="/profile"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <User size={20} />
          <span className="font-medium text-[#121714]">Profile</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium text-[#121714]">Logout</span>
        </button>
      </div>
    </aside>
  );
}
