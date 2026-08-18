// Pure calculations — single source of truth, same pattern as subjectStats.js

export function getGoalProgress(goal) {
  if (goal.progressType === "milestones") {
    const total = goal.milestones.length;
    if (total === 0) return 0;
    const completed = goal.milestones.filter((m) => m.completed).length;
    return Math.round((completed / total) * 100);
  }
  if (!goal.target) return 0;
  return Math.min(100, Math.round((goal.current / goal.target) * 100));
}

export function getGoalSubtitle(goal) {
  if (goal.progressType === "milestones") {
    const total = goal.milestones.length;
    const completed = goal.milestones.filter((m) => m.completed).length;
    return `${completed} / ${total} ${goal.unitLabel}`;
  }
  return `${goal.current} / ${goal.target} ${goal.unitLabel}`;
}

export function getGoalStatus(goal) {
  const progress = getGoalProgress(goal);
  if (progress >= 100) return "completed";
  if (new Date(goal.deadline) < new Date()) return "overdue";
  return progress > 0 ? "in-progress" : "active";
}

export function formatDeadline(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function getGoalsSummary(goals, completedGoals = []) {
  return {
    active: goals.length,
    completed: completedGoals.length,
    inProgress: goals.filter((g) => {
      const p = getGoalProgress(g);
      return p > 0 && p < 100;
    }).length,
    overdue: goals.filter((g) => getGoalStatus(g) === "overdue").length,
  };
}