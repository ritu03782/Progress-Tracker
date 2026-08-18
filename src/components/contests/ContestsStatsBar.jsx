import { FaCalendarAlt, FaCheckCircle, FaClock, FaTrophy } from "react-icons/fa";
import Card from "../common/Card";

function ContestsStatsBar({ summary }) {
  const items = [
    { label: "Total Contests", value: summary.total, icon: FaCalendarAlt, bg: "bg-violet-500" },
    { label: "Participated", value: summary.participated, icon: FaCheckCircle, bg: "bg-blue-500" },
    { label: "Upcoming", value: summary.upcoming, icon: FaClock, bg: "bg-amber-600" },
    {
      label: "Best Rank",
      value: summary.bestRank ?? "—",
      subtitle: summary.bestRankPlatform,
      icon: FaTrophy,
      bg: "bg-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {items.map(({ label, value, subtitle, icon: Icon, bg }) => (
        <Card key={label} padding="p-5" className="cursor-default">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg shrink-0 ${bg}`}>
              <Icon />
            </div>
            <div>
              <p className="text-sm text-slate-400">{label}</p>
              <h3 className="mt-1 text-2xl font-bold text-white">{value}</h3>
              {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
export default ContestsStatsBar;