import { useState, useEffect, useCallback } from "react";
import { getContests, createContest } from "../services/contestsService";

function useContests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContests = useCallback(async () => {
    setLoading(true);
    const data = await getContests();
    setContests(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchContests(); }, [fetchContests]);

  const addContest = useCallback(async (contestDraft) => {
    setContests((prev) => [...prev, contestDraft]);
    await createContest(contestDraft);
  }, []);

  return { contests, loading, addContest };
}
export default useContests;