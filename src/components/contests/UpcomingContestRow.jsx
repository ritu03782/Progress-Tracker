import { FaCalendarAlt, FaClock, FaUserFriends } from "react-icons/fa";
import Button from "../common/Button";
import { getPlatformStyle } from "../../utils/contestStats";
import { platformOptions } from "../../utils/platformOptions";

function UpcomingContestRow({ contest, onView }) {
  const { icon: Icon, color } = getPlatformStyle(platformOptions, contest.platform);

  return (
    <div
      onClick={() => onView(contest)}
      className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl bg-slate-800/60 border border-slate-800 p-4 hover:border-blue-500/30 transition-colors cursor-pointer"
    >
      <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center shrink-0">
        <Icon className={`text-lg ${color}`} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-white font-medium">{contest.name}</h3>
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-violet-500/15 text-violet-400">
            {contest.startsIn}
          </span>
        </div>
        <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-400 flex-wrap">
          <span className="flex items-center gap-1.5"><FaCalendarAlt /> {contest.date} • {contest.startTime}</span>
          <span className="flex items-center gap-1.5"><FaClock /> {contest.duration}</span>
          <span className="flex items-center gap-1.5"><FaUserFriends /> {contest.type}</span>
        </div>
      </div>

      <span className="hidden sm:block text-sm text-slate-300 shrink-0">{contest.platform}</span>

      <a
        href={contest.registrationLink}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        <Button variant="primary" size="sm" className="shrink-0">Register</Button>
      </a>
    </div>
  );
}
export default UpcomingContestRow;