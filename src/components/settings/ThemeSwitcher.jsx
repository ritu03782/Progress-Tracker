const OPTIONS = ["Light", "Dark", "System"];

// The preference still saves (so it's ready the moment real theming
// ships), but nothing in the app actually applies it yet — every
// component is hardcoded dark. The badge says so honestly instead of
// pretending this control does something it doesn't.
function ThemeSwitcher({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1 shrink-0">
        {OPTIONS.map((opt) => {
          const optValue = opt.toLowerCase();
          const isActive = value === optValue;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(optValue)}
              className={`
                px-3.5 py-1.5 rounded-md text-sm font-medium transition cursor-pointer
                ${isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:text-white"}
              `}
            >
              {opt}
            </button>
          );
        })}
      </div>
      <span className="whitespace-nowrap rounded-full border border-slate-700 bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-500">
        Coming Soon
      </span>
    </div>
  );
}
export default ThemeSwitcher;
