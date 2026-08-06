import Card from "../common/Card";
import ProgressBar from "../common/ProgressBar";

function TopicProgress({ topics = [], className = "", onViewAll }) {
  return (
    <Card
      padding="p-6"
      hover={false}
      title="Topic Progress"
      action={
        <button
          type="button"
          onClick={onViewAll}
          className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
        >
          View All
        </button>
      }
       className={`h-full ${className}`}
    >
      <div className="space-y-4">
        {topics.map((topic) => {
          const Icon = topic.icon;
          const percent = Math.round((topic.solved / topic.total) * 100);

          return (
            <div key={topic.id} className="flex items-center gap-4">
              <Icon
                className="shrink-0 text-base"
                style={{ color: topic.color }}
              />

              <span className="w-36 shrink-0 truncate text-sm text-slate-200">
                {topic.name}
              </span>

              <ProgressBar
                value={percent}
                color={topic.color}
                className="flex-1"
              />

              <span className="w-14 shrink-0 text-right text-sm text-slate-400">
                {topic.solved}/{topic.total}
              </span>

              <span className="w-11 shrink-0 text-right text-sm font-medium text-slate-200">
                {percent}%
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default TopicProgress;
