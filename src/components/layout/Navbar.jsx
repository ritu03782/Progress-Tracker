import { getGreeting } from "../../utils/getGreeting";
import actions from "../../config/navbarActions";

function Navbar() {
  const currentGreeting = getGreeting();
  return (
    <header className="sticky top-0 z-50 h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8 text-white">
     
      {/* Left Section */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">
            {currentGreeting.greeting}, Ritu
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

      </div>

    </header>
  );
}

export default Navbar;