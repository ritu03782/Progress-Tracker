import { useState } from "react";
import { FaExclamationTriangle, FaPlus, FaTimes } from "react-icons/fa";
import Card from "../common/Card";
import Button from "../common/Button";
import ProgressBar from "../common/ProgressBar";
import { getSubjectProgress } from "../../utils/subjectStats";

// Needs Attention is user-controlled (add/remove a subject), not silently
// auto-picked by progress — same precedent as DSA Weak Topics. The card
// always renders, even with nothing flagged.
function NeedsAttention({ subjects, onView, onAdd, onRemove }) {
  const [selectedId, setSelectedId] = useState("");

  const flagged = subjects.filter((s) => s.needsAttention);
  const available = subjects.filter((s) => !s.needsAttention);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!selectedId) return;
    onAdd?.(selectedId);
    setSelectedId("");
  };

  return (
    <Card
      hover={false}
      title={
        <span className="flex items-center gap-2 text-base">
          <FaExclamationTriangle className="text-red-500" /> Needs Attention
        </span>
      }
    >
      {onAdd && available.length > 0 && (
        <form onSubmit={handleAdd} className="flex gap-2 mb-4">
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
          >
            <option value="">Mark a subject as needing attention...</option>
            {available.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <Button type="submit" variant="secondary" className="px-3" aria-label="Add subject">
            <FaPlus className="text-xs" />
          </Button>
        </form>
      )}

      {flagged.length === 0 ? (
        <p className="py-4 text-center text-sm text-slate-500">
          No subjects marked as needing attention.
        </p>
      ) : (
        <div className="space-y-4">
          {flagged.map((subject) => {
            const progress = getSubjectProgress(subject);
            return (
              <div key={subject.id} className="flex items-center gap-4">
                <span className="w-40 shrink-0 truncate text-sm text-slate-200">
                  {subject.name}
                </span>
                <ProgressBar value={progress} color={subject.barColor} className="flex-1" />
                <span className="w-10 shrink-0 text-right text-sm text-slate-400">{progress}%</span>
                <Button size="sm" variant="secondary" onClick={() => onView(subject)}>
                  {progress < 50 ? "Continue" : "Review"}
                </Button>
                {onRemove && (
                  <button
                    type="button"
                    onClick={() => onRemove(subject.id)}
                    aria-label={`Remove ${subject.name} from needs attention`}
                    className="shrink-0 text-slate-500 hover:text-red-400 transition cursor-pointer"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

export default NeedsAttention;
