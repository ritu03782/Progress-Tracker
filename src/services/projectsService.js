import request from "./apiClient";
import { projectIconOptions } from "../utils/iconOptions";
import { formatRelativeDate } from "../utils/relativeDate";

const DEFAULT_ICON = projectIconOptions[0];

// Backend stores only `iconLabel` (a string) and a raw `lastUpdatedAt`
// date — re-attach the icon component/color/gradient and format the date
// (same adapter pattern as DSA/Subjects).
function shapeProject(project) {
  const option = projectIconOptions.find((opt) => opt.label === project.iconLabel) || DEFAULT_ICON;
  return {
    ...project,
    icon: option.icon,
    color: option.color,
    bg: option.bg,
    barColor: `linear-gradient(90deg,${option.hex},${option.hex}aa)`,
    hex: option.hex,
    lastUpdated: formatRelativeDate(project.lastUpdatedAt, "Not started yet"),
  };
}

export async function getProjects() {
  const projects = await request("/v1/projects", { method: "GET" });
  return projects.map(shapeProject);
}

export async function createProject(projectDraft) {
  const payload = {
    name: projectDraft.name,
    description: projectDraft.description,
    iconLabel: projectDraft.iconLabel,
    status: projectDraft.status,
    technologies: projectDraft.technologies,
    repoUrl: projectDraft.repoUrl,
    notes: projectDraft.notes,
    tasks: (projectDraft.tasks || []).map((t) => t.title),
  };
  const project = await request("/v1/projects", { method: "POST", body: payload });
  return shapeProject(project);
}

export async function updateProject(projectId, updates) {
  const project = await request(`/v1/projects/${projectId}`, { method: "PATCH", body: updates });
  return shapeProject(project);
}

export async function deleteProject(projectId) {
  return request(`/v1/projects/${projectId}`, { method: "DELETE" });
}

export async function toggleProjectTask(projectId, taskId) {
  const project = await request(`/v1/projects/${projectId}/tasks/${taskId}/toggle`, { method: "PATCH" });
  return shapeProject(project);
}
