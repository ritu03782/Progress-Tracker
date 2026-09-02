import { useState, useEffect, useCallback } from "react";
import {
  getHabits,
  createHabit,
  updateHabit as updateHabitRequest,
  deleteHabit as deleteHabitRequest,
  setHabitStatus,
} from "../services/habitsService";
import { useToast } from "../context/ToastContext";

function useHabits() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchHabits = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getHabits();
      setHabits(data);
    } catch (err) {
      showToast(err.message || "Failed to load habits.", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const addHabit = useCallback(
    async (habitDraft) => {
      try {
        const newHabit = await createHabit(habitDraft);
        setHabits((prev) => [...prev, newHabit]);
        return newHabit;
      } catch (err) {
        showToast(err.message || "Failed to create habit.", "error");
      }
    },
    [showToast]
  );

  const editHabit = useCallback(
    async (habitId, updates) => {
      try {
        const updated = await updateHabitRequest(habitId, updates);
        setHabits((prev) => prev.map((h) => (h.id === updated.id ? updated : h)));
        return updated;
      } catch (err) {
        showToast(err.message || "Failed to update habit.", "error");
      }
    },
    [showToast]
  );

  const removeHabit = useCallback(
    async (habitId) => {
      try {
        await deleteHabitRequest(habitId);
        setHabits((prev) => prev.filter((h) => h.id !== habitId));
      } catch (err) {
        showToast(err.message || "Failed to delete habit.", "error");
      }
    },
    [showToast]
  );

  // options: { date?, completed?, skipReason? } — see setHabitStatus in habitsService
  const toggleHabit = useCallback(
    async (habitId, options) => {
      try {
        const updated = await setHabitStatus(habitId, options);
        setHabits((prev) => prev.map((h) => (h.id === updated.id ? updated : h)));
        return updated;
      } catch (err) {
        showToast(err.message || "Failed to update habit.", "error");
      }
    },
    [showToast]
  );

  return { habits, loading, addHabit, editHabit, removeHabit, toggleHabit };
}
export default useHabits;
