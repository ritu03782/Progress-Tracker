import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getGoals, getCompletedGoals, toggleMilestone, adjustGoalCounter, createGoal } from "../services/goalsService";

const GoalsContext = createContext(null);

export function GoalsProvider({ children }) {
  const [goals, setGoals] = useState([]);
  const [completedGoals, setCompletedGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGoals = useCallback(async () => {
    setLoading(true);
    const [active, completed] = await Promise.all([getGoals(), getCompletedGoals()]);
    setGoals(active);
    setCompletedGoals(completed);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const toggleGoalMilestone = useCallback(async (goalId, milestoneId) => {
    setGoals((prev) =>
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
    await toggleMilestone(goalId, milestoneId);
  }, []);

  const bumpGoalCounter = useCallback(async (goalId, amount) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id !== goalId
          ? goal
          : { ...goal, current: Math.max(0, Math.min(goal.target, (goal.current || 0) + amount)) }
      )
    );
    await adjustGoalCounter(goalId, amount);
  }, []);

  const addGoal = useCallback(async (goalDraft) => {
    setGoals((prev) => [...prev, goalDraft]);
    await createGoal(goalDraft);
  }, []);

  return (
    <GoalsContext.Provider
      value={{ goals, completedGoals, loading, toggleGoalMilestone, bumpGoalCounter, addGoal, refetch: fetchGoals }}
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