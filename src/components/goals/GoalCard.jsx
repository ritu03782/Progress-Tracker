import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import Card from "../common/Card";
import ProgressBar from "../common/ProgressBar";
import { getGoalProgress, getGoalSubtitle, formatDeadline } from "../../utils/goalStats";

function GoalCard({ goal, onView }) {
  const Icon = goal.icon;
  const progress = getGoalProgress(goal);
  const progressColor = progress >= 60 ? "text-green-400" : progress >= 40 ? "text-yellow-400" : "text-red-400";

  return (
    <Card hover={false} className="cursor-pointer hover:border-blue-500/30 transition-colors" onClick={() => onView(goal)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${goal.bg}`}>
            <Icon className={`text-xl ${goal.color}`} />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-white truncate">{goal.title}</h3>
            <p className="text-sm text-slate-400 mt-0.5">{goal.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <span className={`text-lg font-bold ${progressColor}`}>{progress}%</span>
          <span className="hidden sm:flex items-center gap-1.5 text-sm text-slate-400">
            <FaCalendarAlt className="text-xs" /> {formatDeadline(goal.deadline)}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <ProgressBar value={progress} color={goal.barColor} />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-slate-500">{getGoalSubtitle(goal)}</p>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onView(goal); }}
          className="
            flex items-center gap-1.5 text-sm font-medium text-blue-400
            hover:text-blue-300 hover:gap-2.5 transition-all cursor-pointer
          "
        >
          View Goal <FaArrowRight className="text-xs" />
        </button>
      </div>
    </Card>
  );
}
export default GoalCard;