import { FaBookOpen, FaClock, FaCheckCircle } from "react-icons/fa";
import Card from "../common/Card";
import ProgressRing from "../common/ProgressRing";
import { getProgressMessage } from "../../utils/subjectStats";

function SubjectsStatsBar({ stats }) {
  const { overallProgress, subjectsCompleted, totalSubjects, studyHours, completedTopics, totalTopics, topicsCompletedPct } = stats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      <Card className="cursor-default sm:col-span-2 xl:col-span-1">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-sm text-slate-400 ">Overall Progress</p>
            <p className="mt-1 text-sm text-green-400 font-medium">
              {getProgressMessage(overallProgress)}
            </p>
          </div>
          <div className="relative w-32 h-32 shrink-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <ProgressRing value={overallProgress} color="#22C55E" size={170}>
                <span className="text-3xl font-bold text-white">{overallProgress}%</span>
              </ProgressRing>
            </div>
          </div>
          
        </div>
      </Card>

      <Card className="cursor-default">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-slate-400">Subjects Completed</p>
            <h2 className="mt-2 text-3xl font-bold text-white">
              {subjectsCompleted} / {totalSubjects}
            </h2>
            <p className="mt-1 text-sm text-emerald-400 font-medium">Keep going!</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
            <FaBookOpen className="text-xl text-violet-400" />
          </div>
        </div>
      </Card>

      <Card className="cursor-default">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-slate-400">Study Hours</p>
            <h2 className="mt-2 text-3xl font-bold text-white">{studyHours}h</h2>
            <p className="mt-1 text-sm text-emerald-400 font-medium">This month</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <FaClock className="text-xl text-blue-400" />
          </div>
        </div>
      </Card>

      <Card className="cursor-default">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-slate-400">Topics Completed</p>
            <h2 className="mt-2 text-3xl font-bold text-white">
              {completedTopics} / {totalTopics}
            </h2>
            <p className="mt-1 text-sm text-blue-400 font-medium">{topicsCompletedPct}% Completed</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
            <FaCheckCircle className="text-xl text-green-400" />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SubjectsStatsBar;