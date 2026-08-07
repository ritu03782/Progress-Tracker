import { FaExclamationTriangle } from "react-icons/fa";
import Card from "../common/Card";
import Button from "../common/Button";
import ProgressBar from "../common/ProgressBar";
import { getWeakSubjects } from "../../utils/subjectStats";

function NeedsAttention({ subjects, onView }) {
  const weak = getWeakSubjects(subjects, 3);
  if (weak.length === 0) return null;

  return (
    <Card
      hover={false}
      title={
        <span className="flex items-center gap-2 text-base">
          <FaExclamationTriangle className="text-red-500" /> Needs Attention
        </span>
      }
    >
      <div className="space-y-4">
        {weak.map(({ subject, progress }) => (
          <div key={subject.id} className="flex items-center gap-4">
            <span className="w-40 shrink-0 truncate text-sm text-slate-200">
              {subject.name}
            </span>
            <ProgressBar value={progress} color={subject.barColor} className="flex-1" />
            <span className="w-10 shrink-0 text-right text-sm text-slate-400">{progress}%</span>
            <Button size="sm" variant="secondary" onClick={() => onView(subject)}>
              {progress < 50 ? "Continue" : "Review"}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default NeedsAttention;