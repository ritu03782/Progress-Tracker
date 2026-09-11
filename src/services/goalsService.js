import request from "./apiClient";
import { goalIconOptions } from "../utils/iconOptions";

const DEFAULT_ICON = goalIconOptions[0];

// Backend stores only `iconLabel` (a string) — re-attach the real icon
// component, color, bg, and gradient bar color from the existing
// goalIconOptions map (same adapter pattern as Habits/Subjects).
function shapeGoal(goal) {
  const option = goalIconOptions.find((opt) => opt.label === goal.iconLabel) || DEFAULT_ICON;
  return {
    ...goal,
    icon: option.icon,
    color: option.color,
    bg: option.bg,
    barColor: `linear-gradient(90deg,${option.hex},${option.hex}aa)`,
    hex: option.hex,
  };
}

// One endpoint returns every goal — active vs completed is now a computed
// filter (see GoalsContext), not two separate datasets to keep in sync.
export async function getGoals() {
  const goals = await request("/v1/goals", { method: "GET" });
  return goals.map(shapeGoal);
}

export async function createGoal(goalDraft) {
  const payload = {
    title: goalDraft.title,
    description: goalDraft.description,
    iconLabel: goalDraft.iconLabel,
    deadline: goalDraft.deadline,
    progressType: goalDraft.progressType,
    unitLabel: goalDraft.unitLabel,
    notes: goalDraft.notes,
    target: goalDraft.target,
    milestones: goalDraft.milestones,
  };
  const goal = await request("/v1/goals", { method: "POST", body: payload });
  return shapeGoal(goal);
}

export async function updateGoal(goalId, updates) {
  const goal = await request(`/v1/goals/${goalId}`, { method: "PATCH", body: updates });
  return shapeGoal(goal);
}

export async function deleteGoal(goalId) {
  return request(`/v1/goals/${goalId}`, { method: "DELETE" });
}

export async function toggleMilestone(goalId, milestoneId) {
  const goal = await request(`/v1/goals/${goalId}/milestones/${milestoneId}/toggle`, { method: "PATCH" });
  return shapeGoal(goal);
}

export async function adjustGoalCounter(goalId, amount) {
  const goal = await request(`/v1/goals/${goalId}/counter`, { method: "PATCH", body: { amount } });
  return shapeGoal(goal);
}
