import { FaBullseye, FaCheckCircle, FaClock, FaExclamationCircle } from "react-icons/fa";
import Card from "../common/Card";

function GoalsSummary({ summary }) {
  const items = [
    { label: "Active Goals", value: summary.active, icon: FaBullseye, color: "text-blue-400", bg: "bg-blue-500/15" },
    { label: "Completed", value: summary.completed, icon: FaCheckCircle, color: "text-green-400", bg: "bg-green-500/15" },
    { label: "In Progress", value: summary.inProgress, icon: FaClock, color: "text-yellow-400", bg: "bg-yellow-500/15" },
    { label: "Overdue", value: summary.overdue, icon: FaExclamationCircle, color: "text-red-400", bg: "bg-red-500/15" },
  ];

  return (
    <Card title="Goals Summary" hover={false}>
      <div className="flex flex-wrap gap-x-10 gap-y-6">
        {items.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
              <Icon className={`text-lg ${color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-sm text-slate-400">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
export default GoalsSummary;