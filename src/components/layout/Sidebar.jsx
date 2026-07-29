import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import sidebarItems from "../../config/sidebarItems";

function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col">

      {/* Logo */}
      <div className="flex items-center gap-3 p-5 border-b border-slate-800">
        <img
          src={logo}
          alt="Progress Tracker Logo"
          className="w-12 h-12 rounded-xl object-cover"
        />

        <div>
          <h1 className="text-white text-lg font-bold">
            Placement
          </h1>

          <p className="text-slate-400 text-xs">
            Progress Tracker
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-2 overflow-y-auto">

        {sidebarItems.map((item) => {
          const Icon=item.icon;
          return (<NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white hover:translate-x-1"
              }`
            }
          >
            <Icon className="text-2xl"/>

            <span className="font-medium">
              {item.name}
            </span>
          </NavLink>)
        })}

      </nav>

    </aside>
  );
}

export default Sidebar;