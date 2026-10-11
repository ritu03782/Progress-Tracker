import { FaSignOutAlt, FaBars } from "react-icons/fa";
import { getGreeting } from "../../utils/getGreeting";
import actions from "../../config/navbarActions";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Avatar from "../common/Avatar";
import NotificationBell from "./NotificationBell";

// onMenuClick opens the mobile sidebar drawer (Layout.jsx owns that state).
// The hamburger only renders below `lg`, matching Sidebar's breakpoint.
function Navbar({ onMenuClick }) {
  const currentGreeting = getGreeting();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const firstName = user?.fullName?.split(" ")[0] || "there";

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 md:px-8 text-white">

      {/* Left Section */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="lg:hidden shrink-0 w-10 h-10 rounded-full cursor-pointer bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition"
        >
          <FaBars className="text-lg" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-lg md:text-2xl font-semibold truncate">
              {currentGreeting.greeting}, {firstName}
            </h1>
            <span className="text-xl md:text-2xl shrink-0">{currentGreeting.icon}</span>
          </div>

          <p className="hidden sm:block text-sm text-slate-400 mt-1 truncate">
            Keep moving toward your placement goals 🚀
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        {actions.map(({ icon: Icon, label, iconColor }) => (
          <button
             key={label}
             aria-label={label}
             title={label}
            className={`hidden sm:flex w-10 h-10 rounded-full cursor-pointer bg-slate-800 hover:bg-slate-700 hover:scale-105 transition-all duration-200 items-center justify-center`}
          >
            <Icon className={`text-xl ${iconColor || "text-white"}`} />
          </button>
        ))}

        <NotificationBell />

        {/* Profile avatar — navigates to /profile, shows real avatar or initials */}
        <button
          onClick={() => navigate("/profile")}
          aria-label="Profile"
          title="Profile"
          className="w-10 h-10 rounded-full cursor-pointer overflow-hidden hover:scale-105 transition-all duration-200 flex items-center justify-center"
        >
          <Avatar
            name={user?.fullName || "User"}
            src={user?.avatar || null}
            size="w-10 h-10"
            textSize="text-xs"
          />
        </button>

        <button
          onClick={handleLogout}
          aria-label="Log out"
          title="Log out"
          className="w-10 h-10 rounded-full cursor-pointer bg-slate-800 hover:bg-red-600 hover:scale-105 transition-all duration-200 flex items-center justify-center"
        >
          <FaSignOutAlt className="text-lg text-red-400" />
        </button>
      </div>

    </header>
  );
}

export default Navbar;
