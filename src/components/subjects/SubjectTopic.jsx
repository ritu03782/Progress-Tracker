import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import ProgressBar from "../common/ProgressBar";

function SubjectTopic({ topic, interactive = false, onToggle, showProgress = false }) {
  const checkbox = topic.completed ? (
    <FaCheckCircle className="text-green-500 text-base shrink-0" />
  ) : (
    <FaRegCircle className="text-slate-600 text-base shrink-0" />
  );

  if (!showProgress) {
    // Compact version used in the card preview
    return (
      <button
        type="button"
        disabled={!interactive}
        onClick={() => interactive && onToggle(topic.id)}
        className={`w-full flex items-center gap-2.5 ${interactive ? "cursor-pointer" : ""}`}
      >
        {checkbox}
        <span className={`text-sm truncate ${topic.completed ? "text-slate-300" : "text-slate-500"}`}>
          {topic.name}
        </span>
      </button>
    );
  }

  // Full version used in the drawer — includes a per-topic mastery bar
  return (
    <button
      type="button"
      onClick={() => onToggle(topic.id)}
      className="
        w-full flex items-center gap-3 px-1 py-2
        hover:bg-slate-800/50 rounded-lg transition-colors cursor-pointer
      "
    >
      {checkbox}

      <span className="w-32 shrink-0 truncate text-left text-sm text-slate-200">
        {topic.name}
      </span>

      <ProgressBar value={topic.progress} className="flex-1" height="h-1.5" />

      <span className="w-10 shrink-0 text-right text-xs font-medium text-slate-400">
        {topic.progress}%
      </span>
    </button>
  );
}

export default SubjectTopic;