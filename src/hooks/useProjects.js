import { useState, useEffect, useCallback } from "react";
import {
  getProjects,
  createProject,
  updateProject as updateProjectRequest,
  deleteProject as deleteProjectRequest,
  toggleProjectTask,
} from "../../src/services/projectsService";
import { useToast } from "../context/ToastContext";

function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      showToast(err.message || "Failed to load projects.", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const toggleTask = useCallback(
    async (projectId, taskId) => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id !== projectId
            ? p
            : { ...p, tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)) }
        )
      );
      try {
        const updated = await toggleProjectTask(projectId, taskId);
        setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      } catch (err) {
        showToast(err.message || "Failed to update task.", "error");
        fetchProjects();
      }
    },
    [showToast, fetchProjects]
  );

  const addProject = useCallback(
    async (projectDraft) => {
      try {
        const newProject = await createProject(projectDraft);
        setProjects((prev) => [...prev, newProject]);
        return newProject;
      } catch (err) {
        showToast(err.message || "Failed to add project.", "error");
      }
    },
    [showToast]
  );

  const editProject = useCallback(
    async (projectId, updates) => {
      try {
        const updated = await updateProjectRequest(projectId, updates);
        setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        return updated;
      } catch (err) {
        showToast(err.message || "Failed to update project.", "error");
      }
    },
    [showToast]
  );

  const removeProject = useCallback(
    async (projectId) => {
      try {
        await deleteProjectRequest(projectId);
        setProjects((prev) => prev.filter((p) => p.id !== projectId));
      } catch (err) {
        showToast(err.message || "Failed to delete project.", "error");
      }
    },
    [showToast]
  );

  return { projects, loading, toggleTask, addProject, editProject, removeProject, refetch: fetchProjects };
}
export default useProjects;
