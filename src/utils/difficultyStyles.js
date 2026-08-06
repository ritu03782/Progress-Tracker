export const difficultyStyles = {
  Easy: "bg-emerald-500/15 text-emerald-400",
  Medium: "bg-amber-500/15 text-amber-400",
  Hard: "bg-red-500/15 text-red-400",
};

export const statusStyles = {
  Solved: "text-emerald-400",
  Attempted: "text-blue-400",
};

export function getDifficultyClass(difficulty) {
  return difficultyStyles[difficulty] || "bg-slate-500/15 text-slate-400";
}

export function getStatusClass(status) {
  return statusStyles[status] || "text-slate-400";
}
