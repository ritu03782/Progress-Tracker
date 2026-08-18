const OPTIONS = ["Light", "Dark", "System"];

function ThemeSwitcher({ value, onChange }) {
  return (
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
  );
}
export default ThemeSwitcher;