import { useState, useEffect, useCallback } from "react";
import { getProjects, toggleProjectTask, createProject } from "../services/projectsService";

function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const toggleTask = useCallback(async (projectId, taskId) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id !== projectId
          ? p
          : { ...p, tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)) }
      )
    );
    await toggleProjectTask(projectId, taskId);
  }, []);

  const addProject = useCallback(async (projectDraft) => {
    setProjects((prev) => [...prev, projectDraft]);
    await createProject(projectDraft);
  }, []);

  return { projects, loading, toggleTask, addProject };
}
export default useProjects;