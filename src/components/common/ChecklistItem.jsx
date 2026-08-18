import { FaCheckSquare, FaRegSquare } from "react-icons/fa";

function ChecklistItem({ item, onToggle }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(item.id)}
      className="w-full flex items-center gap-3 px-1 py-2 rounded-lg text-left hover:bg-slate-800/50 transition-colors cursor-pointer"
    >
      {item.completed ? (
        <FaCheckSquare className="text-green-500 text-lg shrink-0" />
      ) : (
        <FaRegSquare className="text-slate-600 text-lg shrink-0" />
      )}
      <span className={`text-sm ${item.completed ? "text-slate-300" : "text-slate-400"}`}>
        {item.title}
      </span>
    </button>
  );
}
export default ChecklistItem;