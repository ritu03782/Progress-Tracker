import { useState, useEffect, useCallback } from "react";
import { getNote, saveNote } from "../services/notesService";
import { useToast } from "../context/ToastContext";

// Re-fetches whenever `date` changes — this is what makes Notes actually
// per-day instead of one eternal note.
function useNote(date) {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    let active = true;
    setLoading(true);
    getNote(date)
      .then((data) => {
        if (active) setNote(data);
      })
      .catch((err) => {
        if (active) showToast(err.message || "Failed to load note.", "error");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [date, showToast]);

  const save = useCallback(
    async ({ text, mood }) => {
      setSaving(true);
      try {
        const updated = await saveNote(date, { text, mood });
        setNote(updated);
        showToast("Note saved.", "success");
        return updated;
      } catch (err) {
        showToast(err.message || "Failed to save note.", "error");
      } finally {
        setSaving(false);
      }
    },
    [date, showToast]
  );

  return { note, loading, saving, save };
}
export default useNote;
