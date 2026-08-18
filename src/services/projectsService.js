import projectsData from "../config/projectsData";

let _projects = projectsData;
const simulateLatency = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 150));

export async function getProjects() {
  return simulateLatency(_projects);
}

export async function toggleProjectTask(projectId, taskId) {
  _projects = _projects.map((p) =>
    p.id !== projectId
      ? p
      : { ...p, tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)) }
  );
  return simulateLatency(_projects);
}

export async function createProject(newProject) {
  _projects = [..._projects, newProject];
  return simulateLatency(_projects);
}