import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import useNotifications from "../../hooks/useNotifications";

function NotificationBell() {
  const { items, enabled, loading } = useNotifications();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const count = items.length;

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Notifications"
        title="Notifications"
        className="relative w-10 h-10 rounded-full cursor-pointer bg-slate-800 hover:bg-slate-700 hover:scale-105 transition-all duration-200 flex items-center justify-center"
      >
        <IoMdNotifications className="text-xl text-yellow-400" />
        {enabled && count > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-semibold flex items-center justify-center">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-slate-800">
            <h3 className="text-sm font-semibold text-white">Notifications</h3>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {loading ? (
              <p className="px-4 py-6 text-center text-sm text-slate-500">Loading...</p>
            ) : !enabled ? (
              <div className="px-4 py-6 text-center">
                <p className="text-sm text-slate-400">Notifications are turned off.</p>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    navigate("/settings");
                  }}
                  className="mt-2 text-xs font-medium text-blue-400 hover:text-blue-300 cursor-pointer"
                >
                  Turn on in Settings
                </button>
              </div>
            ) : items.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-slate-500">You're all caught up.</p>
            ) : (
              items.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    navigate(item.link);
                  }}
                  className="w-full text-left px-4 py-3 border-b border-slate-800/60 last:border-b-0 hover:bg-slate-800/60 transition cursor-pointer"
                >
                  <p className="text-sm font-medium text-slate-200">{item.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.message}</p>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default NotificationBell;
