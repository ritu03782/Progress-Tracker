import { FaArrowRight } from "react-icons/fa";
import Card from "../common/Card";
import ProgressBar from "../common/ProgressBar";
import SubjectTopic from "./SubjectTopic";
import { getSubjectProgress } from "../../utils/subjectStats";

const PREVIEW_COUNT = 5;

function SubjectCard({ subject, onView }) {
  const Icon = subject.icon;
  const progress = getSubjectProgress(subject);
  const previewTopics = subject.topics.slice(0, PREVIEW_COUNT);

  return (
    <Card padding="p-5" className="bg-slate-950 flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${subject.bg}`}>
            <Icon className={`text-lg ${subject.color}`} />
          </div>
          <h3 className="text-base font-semibold text-white leading-tight">
            {subject.name}
          </h3>
        </div>

        <span className="text-lg font-bold text-white shrink-0">{progress}%</span>
      </div>

      {/* Progress */}
      <div className="mt-4">
        <ProgressBar value={progress} color={subject.barColor} />
      </div>

      {/* Topics preview */}
      <div className="mt-4 space-y-2.5 flex-1">
        {previewTopics.map((topic) => (
          <SubjectTopic key={topic.id} topic={topic} />
        ))}
      </div>

      {/* Footer link */}
      <button
        type="button"
        onClick={() => onView(subject)}
        className="
          mt-4 flex items-center gap-2 text-sm font-medium
          text-blue-400 hover:text-blue-300 hover:gap-3
          transition-all duration-200 cursor-pointer
        "
      >
        View Subject <FaArrowRight className="text-xs" />
      </button>
    </Card>
  );
}

export default SubjectCard;