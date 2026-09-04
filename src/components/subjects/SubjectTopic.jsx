import { FaCheckCircle, FaRegCircle, FaLink, FaExternalLinkAlt } from "react-icons/fa";
import ProgressBar from "../common/ProgressBar";

function SubjectTopic({ topic, interactive = false, onToggle, showProgress = false, onEditLink }) {
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

  // Full version used in the drawer — includes a per-topic mastery bar and
  // an optional practice link. The toggle button only wraps checkbox+name
  // (not the whole row) so the link controls can be real buttons/anchors
  // alongside it, not nested inside one.
  return (
    <div
      className="
        w-full flex items-center gap-3 px-1 py-2
        hover:bg-slate-800/50 rounded-lg transition-colors
      "
    >
      <button
        type="button"
        onClick={() => onToggle(topic.id)}
        className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
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

      {onEditLink && (
        <button
          type="button"
          onClick={() => onEditLink(topic.id)}
          title={topic.link ? "Change practice link" : "Add practice link"}
          aria-label={topic.link ? "Change practice link" : "Add practice link"}
          className="shrink-0 text-slate-500 hover:text-blue-400 transition cursor-pointer"
        >
          <FaLink className="text-xs" />
        </button>
      )}

      {topic.link && (
        <a
          href={topic.link}
          target="_blank"
          rel="noreferrer"
          title="Open practice link"
          aria-label="Open practice link"
          className="shrink-0 text-blue-400 hover:text-blue-300 transition"
        >
          <FaExternalLinkAlt className="text-xs" />
        </a>
      )}
    </div>
  );
}

export default SubjectTopic;
