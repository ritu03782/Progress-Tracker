import { useState, useEffect, useCallback } from "react";
import { getProblems, createProblem, toggleProblemFavourite } from "../services/dsaSevice";

function useProblems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProblems = useCallback(async () => {
    setLoading(true);
    const data = await getProblems();
    setProblems(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchProblems(); }, [fetchProblems]);

  const addProblem = useCallback(async (problemDraft) => {
    const newProblem = { id: Date.now(), ...problemDraft };
    setProblems((prev) => [...prev, newProblem]);
    await createProblem(newProblem);
  }, []);

  const toggleFavourite = useCallback(async (problemId) => {
    setProblems((prev) => prev.map((p) => (p.id === problemId ? { ...p, favourite: !p.favourite } : p)));
    await toggleProblemFavourite(problemId);
  }, []);

  return { problems, loading, addProblem, toggleFavourite };
}
export default useProblems;