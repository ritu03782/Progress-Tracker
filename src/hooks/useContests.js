import { useState, useEffect, useCallback } from "react";
import {
  getContests,
  createContest,
  updateContest as updateContestRequest,
  deleteContest as deleteContestRequest,
  logContestResult,
  reopenContest as reopenContestRequest,
} from "../services/contestsService";
import { useToast } from "../context/ToastContext";

function useContests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchContests = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getContests();
      setContests(data);
    } catch (err) {
      showToast(err.message || "Failed to load contests.", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchContests();
  }, [fetchContests]);

  const addContest = useCallback(
    async (contestDraft) => {
      try {
        const newContest = await createContest(contestDraft);
        setContests((prev) => [newContest, ...prev]);
        return newContest;
      } catch (err) {
        showToast(err.message || "Failed to add contest.", "error");
      }
    },
    [showToast]
  );

  const editContest = useCallback(
    async (contestId, updates) => {
      try {
        const updated = await updateContestRequest(contestId, updates);
        setContests((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
        return updated;
      } catch (err) {
        showToast(err.message || "Failed to update contest.", "error");
      }
    },
    [showToast]
  );

  const removeContest = useCallback(
    async (contestId) => {
      try {
        await deleteContestRequest(contestId);
        setContests((prev) => prev.filter((c) => c.id !== contestId));
      } catch (err) {
        showToast(err.message || "Failed to delete contest.", "error");
      }
    },
    [showToast]
  );

  const logResult = useCallback(
    async (contestId, resultDraft) => {
      try {
        const updated = await logContestResult(contestId, resultDraft);
        setContests((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
        showToast("Contest result saved.", "success");
        return updated;
      } catch (err) {
        showToast(err.message || "Failed to save contest result.", "error");
      }
    },
    [showToast]
  );

  const reopenContest = useCallback(
    async (contestId) => {
      try {
        const updated = await reopenContestRequest(contestId);
        setContests((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      } catch (err) {
        showToast(err.message || "Failed to reopen contest.", "error");
      }
    },
    [showToast]
  );

  return { contests, loading, addContest, editContest, removeContest, logResult, reopenContest };
}
export default useContests;
