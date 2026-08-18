import todayScheduleData from "../config/todayScheduleData";

let _schedule = todayScheduleData;
const simulateLatency = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 150));

export async function getTodaySchedule() {
  return simulateLatency(_schedule);
}

export async function toggleScheduleTask(taskId) {
  _schedule = _schedule.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
  return simulateLatency(_schedule);
}

export async function createScheduleTask(newTask) {
  // Later: const res = await fetch("/api/schedule", { method: "POST", body: JSON.stringify(newTask) });
  _schedule = [..._schedule, newTask];
  return simulateLatency(_schedule);
}