import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import sidebarItems from "../../config/sidebarItems";

// Now responsive: off-canvas drawer below the `lg` breakpoint (slides in
// over the content with a backdrop), permanently visible above it — same
// as before. isOpen/onClose are controlled by Layout.jsx.
function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Backdrop — mobile/tablet only, closes the drawer on tap */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-64 bg-slate-900 border-r border-slate-800
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between gap-3 p-5 border-b border-slate-800">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={logo}
              alt="Progress Tracker Logo"
              className="w-12 h-12 rounded-xl object-cover shrink-0"
            />

            <div className="min-w-0">
              <h1 className="text-white text-lg font-bold truncate">
                Placement
              </h1>

              <p className="text-slate-400 text-xs truncate">
                Progress Tracker
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="lg:hidden shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 space-y-2 overflow-y-auto">

          {sidebarItems.map((item) => {
            const Icon=item.icon;
            return (<NavLink
              key={item.name}
              to={item.path}
              onClick={onClose}
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
    </>
  );
}

export default Sidebar;
