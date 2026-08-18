import goalsData, { completedGoalsData } from "../config/goalsData";

// SWAP POINT: replace bodies with real fetch() calls later. Signatures stay the same.
let _goals = goalsData;
const _completed = completedGoalsData;

const simulateLatency = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 150));

export async function getGoals() {
  return simulateLatency(_goals);
}

export async function getCompletedGoals() {
  return simulateLatency(_completed);
}

export async function toggleMilestone(goalId, milestoneId) {
  _goals = _goals.map((goal) =>
    goal.id !== goalId
      ? goal
      : {
          ...goal,
          milestones: goal.milestones.map((m) =>
            m.id !== milestoneId ? m : { ...m, completed: !m.completed }
          ),
        }
  );
  return simulateLatency(_goals);
}

export async function adjustGoalCounter(goalId, amount) {
  _goals = _goals.map((goal) =>
    goal.id !== goalId
      ? goal
      : { ...goal, current: Math.max(0, Math.min(goal.target, goal.current + amount)) }
  );
  return simulateLatency(_goals);
}

export async function createGoal(newGoal) {
  _goals = [..._goals, newGoal];
  return simulateLatency(_goals);
}