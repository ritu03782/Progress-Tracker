import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Card from "../common/Card";
import useTodaySchedule from "../../hooks/useTodaySchedule";
import { useGoalsContext } from "../../context/GoalsContext";

function TodaySchedule() {
  const { tasks, toggleTask, addTask } = useTodaySchedule();
  const { goals } = useGoalsContext();
  const doneCount = tasks.filter((t) => t.completed).length;

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [linkedGoalId, setLinkedGoalId] = useState("");

  // Only counter-type goals can be linked from this quick-add form —
  // milestone links still need the Goals page since a specific milestone must be chosen.
  const linkableGoals = goals.filter((g) => g.progressType === "counter");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title: title.trim(), priority, linkedGoalId: linkedGoalId || null });
    setTitle("");
    setPriority("Medium");
    setLinkedGoalId("");
  };

  return (
    <Card
      title="📅 Today's Schedule"
      subtitle="Stay on track with today's planned tasks."
      className="hover:border-blue-500/30"
      action={
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-green-400">
            {doneCount} / {tasks.length} Done
          </span>
          <button className="text-sm text-blue-400 hover:text-blue-300 transition cursor-pointer">
            View All
          </button>
        </div>
      }
      footer={
        <p className="text-sm text-slate-400">
          🎯 Complete your high-priority tasks first to stay productive.
        </p>
      }
    >
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="
              group flex items-center justify-between rounded-xl bg-slate-800 p-4
              transition-all duration-300 hover:bg-slate-700 hover:-translate-y-1
              hover:shadow-md cursor-pointer
            "
          >
            <div className="flex items-center gap-4">
              <span className={`w-3 h-3 rounded-full ${task.priorityColor}`} />
              <div>
                <h3 className="text-white font-medium">{task.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-xs text-slate-400">{task.time}</p>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-slate-700 text-slate-300">
                    {task.priority}
                  </span>
                  {task.linkedGoal && (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-blue-500/15 text-blue-400">
                      🎯 Linked Goal
                    </span>
                  )}
                </div>
              </div>
            </div>

            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task)}
              className="w-5 h-5 accent-blue-500 cursor-pointer"
            />
          </div>
        ))}
        {/* Add task form */}
        <form onSubmit={handleAdd} className="flex flex-wrap gap-2 pt-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
            className="
              flex-1 min-width-[140px] bg-slate-800 border border-slate-700 rounded-lg
              px-3 py-2 text-sm text-white placeholder:text-slate-500
              outline-none focus:border-blue-500 transition
            "
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="
              shrink-0 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2
              text-sm text-slate-300 outline-none focus:border-blue-500
              transition cursor-pointer
            "
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          {linkableGoals.length > 0 && (
            <select
              value={linkedGoalId}
              onChange={(e) => setLinkedGoalId(e.target.value)}
              className="
                shrink-0 max-width-[160px] bg-slate-800 border border-slate-700 rounded-lg px-3 py-2
                text-sm text-slate-300 outline-none focus:border-blue-500
                transition cursor-pointer
              "
            >
              <option value="">No linked goal</option>
              {linkableGoals.map((g) => (
                <option key={g.id} value={g.id}>Link: {g.title}</option>
              ))}
            </select>
          )}

          <button
            type="submit"
            className="
              flex items-center justify-center gap-2 px-4 py-2 rounded-lg
              bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium
              transition cursor-pointer shrink-0
            "
          >
            <FaPlus className="text-xs" /> Add
          </button>
        </form>
      </div>
    </Card>
  );
}
export default TodaySchedule;