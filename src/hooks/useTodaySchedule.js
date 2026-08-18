import { useState, useEffect, useCallback } from "react";
import { getTodaySchedule, toggleScheduleTask, createScheduleTask } from "../services/scheduleService";
import { useGoalsContext } from "../context/GoalsContext";

const PRIORITY_COLORS = {
  High: "bg-red-500",
  Medium: "bg-yellow-500",
  Low: "bg-green-500",
};

function useTodaySchedule() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleGoalMilestone, bumpGoalCounter } = useGoalsContext();

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    const data = await getTodaySchedule();
    setTasks(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const toggleTask = useCallback(async (task) => {
    const willBeCompleted = !task.completed;
    setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, completed: willBeCompleted } : t)));

    if (task.linkedGoal) {
      if (task.linkedGoal.type === "counter") {
        const direction = willBeCompleted ? 1 : -1;
        bumpGoalCounter(task.linkedGoal.goalId, task.linkedGoal.amount * direction);
      } else if (task.linkedGoal.type === "milestone") {
        toggleGoalMilestone(task.linkedGoal.goalId, task.linkedGoal.milestoneId);
      }
    }

    await toggleScheduleTask(task.id);
  }, [bumpGoalCounter, toggleGoalMilestone]);

  // title: string, options: { time?, priority?, linkedGoalId? }
  const addTask = useCallback(async ({ title, time = "Anytime", priority = "Medium", linkedGoalId = null }) => {
    const newTask = {
      id: Date.now(), // swap for a server-generated id once there's a backend
      title,
      time,
      priority,
      priorityColor: PRIORITY_COLORS[priority],
      completed: false,
      linkedGoal: linkedGoalId ? { goalId: linkedGoalId, type: "counter", amount: 1 } : null,
    };

    setTasks((prev) => [...prev, newTask]);
    await createScheduleTask(newTask);
  }, []);

  return { tasks, loading, toggleTask, addTask };
}
export default useTodaySchedule;