import { STATUS_BADGE_CLASS } from "../../utils/applicationStats";

function StatusBadge({ status }) {
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_BADGE_CLASS[status] || "bg-slate-600/30 text-slate-300"}`}>
      {status}
    </span>
  );
}
export default StatusBadge;