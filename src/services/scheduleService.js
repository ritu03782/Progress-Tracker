import request from "./apiClient";

const PRIORITY_COLORS = {
  High: "bg-red-500",
  Medium: "bg-yellow-500",
  Low: "bg-green-500",
};

// priorityColor is pure display derivation from `priority` — computed
// here, never stored, same adapter pattern as every other tracker.
function shapeTask(task) {
  return {
    ...task,
    priorityColor: PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.Medium,
  };
}

export async function getTodaySchedule() {
  const tasks = await request("/v1/schedule", { method: "GET" });
  return tasks.map(shapeTask);
}

// options: { time?, priority?, linkedGoalId?, linkedGoalType?, linkedMilestoneId?, linkedAmount? }
export async function createScheduleTask({ title, time, priority, linkedGoalId, linkedGoalType, linkedMilestoneId, linkedAmount }) {
  const task = await request("/v1/schedule", {
    method: "POST",
    body: { title, time, priority, linkedGoalId, linkedGoalType, linkedMilestoneId, linkedAmount },
  });
  return shapeTask(task);
}

export async function toggleScheduleTask(taskId) {
  const task = await request(`/v1/schedule/${taskId}/toggle`, { method: "PATCH" });
  return shapeTask(task);
}

export async function deleteScheduleTask(taskId) {
  return request(`/v1/schedule/${taskId}`, { method: "DELETE" });
}
