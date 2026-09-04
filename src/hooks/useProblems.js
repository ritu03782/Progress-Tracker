import { useState, useEffect, useCallback } from "react";
import {
  getProblems,
  createProblem,
  updateProblem as updateProblemRequest,
  deleteProblem as deleteProblemRequest,
  toggleProblemFavourite,
  reviseProblem as reviseProblemRequest,
} from "../services/dsaSevice";
import { useToast } from "../context/ToastContext";

function useProblems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchProblems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProblems();
      setProblems(data);
    } catch (err) {
      showToast(err.message || "Failed to load problems.", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  const addProblem = useCallback(
    async (problemDraft) => {
      try {
        const newProblem = await createProblem(problemDraft);
        setProblems((prev) => [newProblem, ...prev]);
        return newProblem;
      } catch (err) {
        showToast(err.message || "Failed to add problem.", "error");
      }
    },
    [showToast]
  );

  const editProblem = useCallback(
    async (problemId, updates) => {
      try {
        const updated = await updateProblemRequest(problemId, updates);
        setProblems((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        return updated;
      } catch (err) {
        showToast(err.message || "Failed to update problem.", "error");
      }
    },
    [showToast]
  );

  const removeProblem = useCallback(
    async (problemId) => {
      try {
        await deleteProblemRequest(problemId);
        setProblems((prev) => prev.filter((p) => p.id !== problemId));
      } catch (err) {
        showToast(err.message || "Failed to delete problem.", "error");
      }
    },
    [showToast]
  );

  const toggleFavourite = useCallback(
    async (problemId) => {
      try {
        const updated = await toggleProblemFavourite(problemId);
        setProblems((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      } catch (err) {
        showToast(err.message || "Failed to update favourite.", "error");
      }
    },
    [showToast]
  );

  const reviseProblem = useCallback(
    async (problemId) => {
      try {
        const updated = await reviseProblemRequest(problemId);
        setProblems((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        return updated;
      } catch (err) {
        showToast(err.message || "Failed to mark as revised.", "error");
      }
    },
    [showToast]
  );

  return { problems, loading, addProblem, editProblem, removeProblem, toggleFavourite, reviseProblem };
}
export default useProblems;
