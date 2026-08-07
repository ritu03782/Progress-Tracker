import Card from "../common/Card";

function RecentlyStudied({ entries, onView }) {
  if (entries.length === 0) return null;

  return (
    <Card
      hover={false}
      title={<span className="text-base">🕒 Recently Studied</span>}
    >
      <div className="space-y-3">
        {entries.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => onView(entry.subject)}
            className="
              w-full flex items-center justify-between text-left
              px-1 py-1.5 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer
            "
          >
            <span className="text-sm text-slate-200">
              {entry.subject.name} - {entry.topicName}
            </span>
            <span className="text-xs text-slate-500 shrink-0">{entry.time}</span>
          </button>
        ))}
      </div>
    </Card>
  );
}

export default RecentlyStudied;