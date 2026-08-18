import { useState, useEffect, useCallback } from "react";
import { getHabits, createHabit } from "../services/habitsService";

function useHabits() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHabits = useCallback(async () => {
    setLoading(true);
    const data = await getHabits();
    setHabits(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchHabits(); }, [fetchHabits]);

  const addHabit = useCallback(async (habitDraft) => {
    const newHabit = { id: Date.now(), ...habitDraft };
    setHabits((prev) => [...prev, newHabit]);
    await createHabit(newHabit);
  }, []);

  return { habits, loading, addHabit };
}
export default useHabits;