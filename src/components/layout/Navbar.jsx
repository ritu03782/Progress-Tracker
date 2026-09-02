import { FaSignOutAlt } from "react-icons/fa";
import { getGreeting } from "../../utils/getGreeting";
import actions from "../../config/navbarActions";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Avatar from "../common/Avatar";

function Navbar() {
  const currentGreeting = getGreeting();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const firstName = user?.fullName?.split(" ")[0] || "there";

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8 text-white">

      {/* Left Section */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">
            {currentGreeting.greeting}, {firstName}
          </h1>
          <span className="text-2xl">{currentGreeting.icon}</span>
        </div>

        <p className="text-sm text-slate-400 mt-1">
          Keep moving toward your placement goals 🚀
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {actions.map(({ icon: Icon, label, iconColor }) => (
          <button
             key={label}
             aria-label={label}
             title={label}
            className={`w-10 h-10 rounded-full cursor-pointer bg-slate-800 hover:bg-slate-700 hover:scale-105 transition-all duration-200 flex items-center justify-center`}
          >
            <Icon className={`text-xl ${iconColor || "text-white"}`} />
          </button>
        ))}

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
