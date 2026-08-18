export function getProjectProgress(project) {
  const total = project.tasks.length;
  if (total === 0) return 0;
  const completed = project.tasks.filter((t) => t.completed).length;
  return Math.round((completed / total) * 100);
}

export function getStatusBadgeClass(status) {
  const map = {
    "In Progress": "bg-violet-500/15 text-violet-400",
    "Completed": "bg-green-500/15 text-green-400",
    "Planned": "bg-slate-600/30 text-slate-300",
  };
  return map[status] || "bg-slate-600/30 text-slate-300";
}

export function getProjectsSummary(projects) {
  return {
    total: projects.length,
    inProgress: projects.filter((p) => p.status === "In Progress").length,
    completed: projects.filter((p) => p.status === "Completed").length,
    planned: projects.filter((p) => p.status === "Planned").length,
  };
}