import Card from "../common/Card";
import ProgressBar from "../common/ProgressBar";
import platformStats, { totalProblemsSolved } from "../../config/platformStats";

function PlatformStats({ platforms = platformStats, className = "",total = totalProblemsSolved, onViewAll }) {
  return (
    <Card
      padding="p-6"
      hover={false}
      title="Platform Stats"
      subtitle="Problems solved on platforms"
      action={
        <button
          type="button"
          onClick={onViewAll}
          className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
        >
          View All
        </button>
      }
      footer={
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">Total Problems Solved</span>
          <span className="text-2xl font-bold text-white">{total}</span>
        </div>
      }
      className={`h-full ${className}`}
    >
      <div className="space-y-4">
        {platforms.map((platform) => {
          const Icon = platform.icon;

          return (
            <div key={platform.id} className="flex items-center gap-4">
              <Icon
                className="shrink-0 text-base"
                style={{ color: platform.color }}
              />

              <span className="w-32 shrink-0 truncate text-sm text-slate-200">
                {platform.name}
              </span>

              <ProgressBar
                value={platform.percent}
                color={platform.color}
                className="flex-1"
              />

              <span className="w-10 shrink-0 text-right text-sm text-slate-400">
                {platform.solved}
              </span>

              <span className="w-11 shrink-0 text-right text-sm font-medium text-slate-200">
                {platform.percent}%
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default PlatformStats;
