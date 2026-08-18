import { FaChevronRight } from "react-icons/fa";

function SettingsRow({ icon: Icon, iconColor, iconBg, title, description, onClick, right, danger = false }) {
  const isClickable = typeof onClick === "function" && !right;

  return (
    <div
      onClick={isClickable ? onClick : undefined}
      className={`
        flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0
        border-b border-slate-800 last:border-b-0
        ${isClickable ? "cursor-pointer hover:bg-slate-800/30 -mx-2 px-2 rounded-lg transition-colors" : ""}
      `}
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
          <Icon className={`text-base ${iconColor}`} />
        </div>
        <div className="min-w-0">
          <p className={`text-sm font-medium ${danger ? "text-red-400" : "text-white"}`}>{title}</p>
          <p className="text-xs text-slate-500 mt-0.5">{description}</p>
        </div>
      </div>

      {right ? right : onClick ? <FaChevronRight className="text-slate-600 text-sm shrink-0" /> : null}
    </div>
  );
}
export default SettingsRow;