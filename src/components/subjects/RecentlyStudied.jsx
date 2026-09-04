import Card from "../common/Card";
import { FaTimes } from "react-icons/fa";

function RecentlyStudied({ entries, onView, onRemove }) {
  return (
    <Card
      hover={false}
      title={<span className="text-base">🕒 Recently Studied</span>}
    >
      {entries.length === 0 ? (
        <p className="py-4 text-center text-sm text-slate-500">
          Nothing studied yet — complete a topic to see it here.
        </p>
      ) : (
        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="
                w-full flex items-center justify-between gap-2
                px-1 py-1.5 rounded-lg hover:bg-slate-800/50 transition-colors
              "
            >
              <button
                type="button"
                onClick={() => onView(entry.subject)}
                className="flex-1 min-w-0 text-left cursor-pointer"
              >
                <span className="text-sm text-slate-200 truncate block">
                  {entry.subject.name} - {entry.topicName}
                </span>
              </button>

              <span className="text-xs text-slate-500 shrink-0">{entry.time}</span>

              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(entry.subject.id)}
                  aria-label="Hide from recently studied"
                  className="shrink-0 text-slate-500 hover:text-red-400 transition cursor-pointer"
                >
                  <FaTimes className="text-xs" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default RecentlyStudied;
