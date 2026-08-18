import { FaBriefcase, FaClipboardCheck, FaUserFriends, FaTrophy } from "react-icons/fa";
import Card from "../common/Card";

function StatCardsRow({ summary, size = "compact" }) {
  const items = [
    { label: "Total Applications", value: summary.total, subtitle: "All time", icon: FaBriefcase, bg: "bg-violet-500" },
    { label: "Applied", value: summary.applied, subtitle: `${summary.appliedPct}%`, icon: FaClipboardCheck, bg: "bg-blue-500" },
    { label: "Interviews", value: summary.interview, subtitle: `${summary.interviewPct}%`, icon: FaUserFriends, bg: "bg-amber-600" },
    { label: "Offers", value: summary.offer, subtitle: `${summary.offerPct}%`, icon: FaTrophy, bg: "bg-green-600" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {items.map(({ label, value, subtitle, icon: Icon, bg }) => (
        <Card key={label} padding={size === "compact" ? "p-4" : "p-5"} className="cursor-default">
          <div className="flex items-center gap-4">
            <div className={`rounded-xl flex items-center justify-center text-white shrink-0 ${bg} ${size === "compact" ? "w-11 h-11 text-base" : "w-12 h-12 text-lg"}`}>
              <Icon />
            </div>
            <div>
              <p className="text-sm text-slate-400">{label}</p>
              <h3 className={`font-bold text-white ${size === "compact" ? "text-xl mt-0.5" : "text-2xl mt-1"}`}>{value}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
export default StatCardsRow;