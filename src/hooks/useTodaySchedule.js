import { useState, useEffect, useCallback } from "react";
import {
  getTodaySchedule,
  toggleScheduleTask,
  createScheduleTask,
  deleteScheduleTask,
} from "../services/scheduleService";
import { useGoalsContext } from "../context/GoalsContext";
import { useToast } from "../context/ToastContext";

function useTodaySchedule() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleGoalMilestone, bumpGoalCounter } = useGoalsContext();
  const { showToast } = useToast();

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTodaySchedule();
      setTasks(data);
    } catch (err) {
      showToast(err.message || "Failed to load today's schedule.", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const toggleTask = useCallback(
    async (task) => {
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

      try {
        await toggleScheduleTask(task.id);
      } catch (err) {
        showToast(err.message || "Failed to update task.", "error");
        setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, completed: task.completed } : t)));
      }
    },
    [bumpGoalCounter, toggleGoalMilestone, showToast]
  );

  // title: string, options: { time?, priority?, linkedGoalId? }
  const addTask = useCallback(
    async ({ title, time = "Anytime", priority = "Medium", linkedGoalId = null }) => {
      try {
        const newTask = await createScheduleTask({
          title,
          time,
          priority,
          linkedGoalId,
          linkedGoalType: linkedGoalId ? "counter" : undefined,
          linkedAmount: linkedGoalId ? 1 : undefined,
        });
        setTasks((prev) => [...prev, newTask]);
      } catch (err) {
        showToast(err.message || "Failed to add task.", "error");
      }
    },
    [showToast]
  );

  const removeTask = useCallback(
    async (taskId) => {
      try {
        await deleteScheduleTask(taskId);
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
      } catch (err) {
        showToast(err.message || "Failed to delete task.", "error");
      }
    },
    [showToast]
  );

  return { tasks, loading, toggleTask, addTask, removeTask };
}
export default useTodaySchedule;
