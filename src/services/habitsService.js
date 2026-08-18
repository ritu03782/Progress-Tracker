import habitsData from "../config/habitsData";

let _habits = habitsData;
const simulateLatency = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 150));

export async function getHabits() {
  return simulateLatency(_habits);
}

export async function toggleHabitCompletion(habitId) {
  _habits = _habits.map((h) => (h.id === habitId ? { ...h, completed: !h.completed } : h));
  return simulateLatency(_habits);
}

export async function createHabit(newHabit) {
  _habits = [..._habits, newHabit];
  return simulateLatency(_habits);
}