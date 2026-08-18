import { FaTimes, FaCalendarAlt, FaStickyNote, FaEdit, FaPlus, FaMinus } from "react-icons/fa";
import Card from "../common/Card";
import Button from "../common/Button";
import ProgressRing from "../common/ProgressRing";
import { getGoalProgress, formatDeadline } from "../../utils/goalStats";
import ChecklistItem from "../common/ChecklistItem";
function GoalDetails({ goal, isOpen, onClose, onToggleMilestone, onBumpCounter, onEditGoal }) {
  if (!goal) return null;

  const progress = getGoalProgress(goal);
  const Icon = goal.icon;
  const isMilestoneType = goal.progressType === "milestones";
  const completedCount = isMilestoneType ? goal.milestones.filter((m) => m.completed).length : goal.current;
  const totalCount = isMilestoneType ? goal.milestones.length : goal.target;

  return (
    <>
      <div
        onClick={onClose}
        className={`
          fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 z-40
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      <div
        className={`
          fixed top-0 right-0 h-screen lg:w-[45%] sm: w-[85%] max-width-[440px]
          bg-[#0F172A] border-l border-slate-800 shadow-2xl z-50
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex justify-between items-start p-6 border-b border-slate-800">
          <div className="flex gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${goal.bg}`}>
              <Icon className={`text-2xl ${goal.color}`} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{goal.title}</h2>
              <p className="text-sm text-slate-400 mt-1">{goal.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition cursor-pointer flex items-center justify-center shrink-0"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-6 space-y-5 overflow-y-auto h-[calc(100vh-98px)]">
          {/* Overall progress + deadline */}
          <Card hover={false}>
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 shrink-0">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ProgressRing value={progress} color={goal.hex} size={130}>
                    <span className="text-xl font-bold text-white">{progress}%</span>
                  </ProgressRing>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <p className="text-xs text-slate-500">Deadline</p>
                  <p className="flex items-center gap-1.5 text-sm text-white font-medium mt-1">
                    <FaCalendarAlt className="text-slate-400" /> {formatDeadline(goal.deadline)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 capitalize">{goal.unitLabel}</p>
                  <p className="text-lg font-bold text-white mt-1">{completedCount} / {totalCount}</p>
                </div>
              </div>
            </div>
          </Card>

          {isMilestoneType ? (
            <Card hover={false}>
              <h3 className="text-white font-semibold mb-3">Milestones</h3>
              <div className="space-y-1">
                {goal.milestones.map((m) => (
                  <ChecklistItem key={m.id} item={m} onToggle={(id) => onToggleMilestone(goal.id, id)} />
                ))}
              </div>
            </Card>
          ) : (
            <Card hover={false}>
              <h3 className="text-white font-semibold mb-4">Update Progress</h3>
              <div className="flex items-center justify-center gap-6">
                <button
                  type="button"
                  onClick={() => onBumpCounter(goal.id, -1)}
                  disabled={goal.current <= 0}
                  className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 text-white flex items-center justify-center hover:border-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                >
                  <FaMinus />
                </button>
                <span className="text-2xl font-bold text-white w-16 text-center">{goal.current}</span>
                <button
                  type="button"
                  onClick={() => onBumpCounter(goal.id, 1)}
                  disabled={goal.current >= goal.target}
                  className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 text-white flex items-center justify-center hover:border-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                >
                  <FaPlus />
                </button>
              </div>
              <p className="text-center text-xs text-slate-500 mt-3">of {goal.target} {goal.unitLabel}</p>
            </Card>
          )}

          <Card hover={false}>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/15 flex items-center justify-center shrink-0">
                <FaStickyNote className="text-yellow-400 text-xl" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold">Notes</h3>
                  <button type="button" className="text-xs font-medium text-blue-400 hover:text-blue-300 cursor-pointer">
                    Edit
                  </button>
                </div>
                <p className="text-slate-400 text-sm mt-2 leading-6">{goal.notes}</p>
              </div>
            </div>
          </Card>

          <Button variant="primary" className="w-full justify-center flex items-center gap-2" onClick={() => onEditGoal(goal.id)}>
            <FaEdit /> Edit Goal
          </Button>
        </div>
      </div>
    </>
  );
}
export default GoalDetails;