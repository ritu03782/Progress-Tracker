import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import {
  getGoals,
  createGoal,
  updateGoal as updateGoalRequest,
  deleteGoal as deleteGoalRequest,
  toggleMilestone,
  adjustGoalCounter,
} from "../services/goalsService";
import { getGoalProgress } from "../utils/goalStats";
import { useToast } from "./ToastContext";

const GoalsContext = createContext(null);

export function GoalsProvider({ children }) {
  const [allGoals, setAllGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchGoals = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getGoals();
      setAllGoals(data);
    } catch (err) {
      showToast(err.message || "Failed to load goals.", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  // Active vs completed is computed from ONE dataset every render — a goal
  // that hits 100% just falls into a different filter, no migration step
  // that can silently fail to run.
  const goals = useMemo(() => allGoals.filter((g) => getGoalProgress(g) < 100), [allGoals]);
  const completedGoals = useMemo(() => allGoals.filter((g) => getGoalProgress(g) >= 100), [allGoals]);

  const toggleGoalMilestone = useCallback(
    async (goalId, milestoneId) => {
      setAllGoals((prev) =>
        prev.map((goal) =>
          goal.id !== goalId
            ? goal
            : {
                ...goal,
                milestones: goal.milestones.map((m) =>
                  m.id !== milestoneId ? m : { ...m, completed: !m.completed }
                ),
              }
        )
      );
      try {
        const updated = await toggleMilestone(goalId, milestoneId);
        setAllGoals((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
      } catch (err) {
        showToast(err.message || "Failed to update milestone.", "error");
        fetchGoals();
      }
    },
    [showToast, fetchGoals]
  );

  const bumpGoalCounter = useCallback(
    async (goalId, amount) => {
      setAllGoals((prev) =>
        prev.map((goal) =>
          goal.id !== goalId
            ? goal
            : { ...goal, current: Math.max(0, Math.min(goal.target, (goal.current || 0) + amount)) }
        )
      );
      try {
        const updated = await adjustGoalCounter(goalId, amount);
        setAllGoals((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
      } catch (err) {
        showToast(err.message || "Failed to update progress.", "error");
        fetchGoals();
      }
    },
    [showToast, fetchGoals]
  );

  const addGoal = useCallback(
    async (goalDraft) => {
      try {
        const newGoal = await createGoal(goalDraft);
        setAllGoals((prev) => [...prev, newGoal]);
        return newGoal;
      } catch (err) {
        showToast(err.message || "Failed to add goal.", "error");
      }
    },
    [showToast]
  );

  const editGoal = useCallback(
    async (goalId, updates) => {
      try {
        const updated = await updateGoalRequest(goalId, updates);
        setAllGoals((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
        return updated;
      } catch (err) {
        showToast(err.message || "Failed to update goal.", "error");
      }
    },
    [showToast]
  );

  const removeGoal = useCallback(
    async (goalId) => {
      try {
        await deleteGoalRequest(goalId);
        setAllGoals((prev) => prev.filter((g) => g.id !== goalId));
      } catch (err) {
        showToast(err.message || "Failed to delete goal.", "error");
      }
    },
    [showToast]
  );

  return (
    <GoalsContext.Provider
      value={{
        goals,
        completedGoals,
        loading,
        toggleGoalMilestone,
        bumpGoalCounter,
        addGoal,
        editGoal,
        removeGoal,
        refetch: fetchGoals,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
}

export function useGoalsContext() {
  const ctx = useContext(GoalsContext);
  if (!ctx) throw new Error("useGoalsContext must be used within a GoalsProvider");
  return ctx;
}
