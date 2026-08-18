import { FaFolder, FaClock, FaCheckCircle, FaChartBar } from "react-icons/fa";
import Card from "../common/Card";

function ProjectsStatsBar({ summary }) {
  const items = [
    { label: "Total Projects", value: summary.total, icon: FaFolder, bg: "bg-violet-500" },
    { label: "In Progress", value: summary.inProgress, icon: FaClock, bg: "bg-blue-500" },
    { label: "Completed", value: summary.completed, icon: FaCheckCircle, bg: "bg-green-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {items.map(({ label, value, icon: Icon, bg }) => (
        <Card key={label} padding="p-5" className="cursor-default">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg ${bg}`}>
                <Icon />
              </div>
              <div>
                <p className="text-sm text-slate-400">{label}</p>
                <h3 className="mt-1 text-2xl font-bold text-white">{value}</h3>
              </div>
            </div>
            <FaChartBar className="text-slate-700 text-2xl" />
          </div>
        </Card>
      ))}
    </div>
  );
}
export default ProjectsStatsBar;