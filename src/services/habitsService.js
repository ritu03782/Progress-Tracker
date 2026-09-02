import request from "./apiClient";
import { habitIconOptions } from "../utils/iconOptions";

const DEFAULT_ICON = habitIconOptions[0];

// Backend stores/returns only `iconLabel` (a string) — re-attach the real
// icon component + tailwind classes from the existing habitIconOptions map
// so HabitCard/HabitDrawer need zero changes.
function attachIcon(habit) {
  const option = habitIconOptions.find((opt) => opt.label === habit.iconLabel) || DEFAULT_ICON;
  return {
    ...habit,
    icon: option.icon,
    color: option.color,
    bg: option.bg,
  };
}

export async function getHabits() {
  const habits = await request("/v1/habits", { method: "GET" });
  return habits.map(attachIcon);
}

export async function createHabit(habitDraft) {
  const payload = {
    title: habitDraft.title,
    description: habitDraft.description,
    category: habitDraft.category,
    iconLabel: habitDraft.iconLabel,
    target: habitDraft.target,
    reminder: habitDraft.reminder,
    notes: habitDraft.notes,
  };
  const habit = await request("/v1/habits", { method: "POST", body: payload });
  return attachIcon(habit);
}

export async function updateHabit(habitId, updates) {
  const habit = await request(`/v1/habits/${habitId}`, { method: "PATCH", body: updates });
  return attachIcon(habit);
}

export async function deleteHabit(habitId) {
  return request(`/v1/habits/${habitId}`, { method: "DELETE" });
}

// options: { date?, completed?, skipReason? }
// - omit `completed` to flip the current value ("Mark Complete")
// - pass completed:false + skipReason to explicitly skip ("Skip Today")
export async function setHabitStatus(habitId, options = {}) {
  const habit = await request(`/v1/habits/${habitId}/toggle`, {
    method: "PATCH",
    body: options,
  });
  return attachIcon(habit);
}

export async function getMissedHabits(date) {
  const query = date ? `?date=${date}` : "";
  return request(`/v1/habits/missed${query}`, { method: "GET" });
}

// action: "ignore" | "reschedule"
export async function dismissMissedHabit(habitId, { date, action } = {}) {
  return request(`/v1/habits/${habitId}/missed`, { method: "PATCH", body: { date, action } });
}

export async function getHabitHeatmap(year) {
  const query = year ? `?year=${year}` : "";
  return request(`/v1/habits/heatmap${query}`, { method: "GET" });
}
