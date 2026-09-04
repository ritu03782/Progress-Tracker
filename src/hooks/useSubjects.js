import { useState, useEffect, useCallback } from "react";
import {
  getSubjects,
  createSubject,
  updateSubject as updateSubjectRequest,
  deleteSubject as deleteSubjectRequest,
  toggleSubjectTopic,
  updateSubjectTopic,
  toggleNeedsAttention as toggleNeedsAttentionRequest,
  hideFromRecent as hideFromRecentRequest,
} from "../services/subjectsService";
import { useToast } from "../context/ToastContext";

function useSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchSubjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSubjects();
      setSubjects(data);
    } catch (err) {
      showToast(err.message || "Failed to load subjects.", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  const addSubject = useCallback(
    async (subjectDraft) => {
      try {
        const newSubject = await createSubject(subjectDraft);
        setSubjects((prev) => [...prev, newSubject]);
        return newSubject;
      } catch (err) {
        showToast(err.message || "Failed to add subject.", "error");
      }
    },
    [showToast]
  );

  const editSubject = useCallback(
    async (subjectId, updates) => {
      try {
        const updated = await updateSubjectRequest(subjectId, updates);
        setSubjects((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
        return updated;
      } catch (err) {
        showToast(err.message || "Failed to update subject.", "error");
      }
    },
    [showToast]
  );

  const removeSubject = useCallback(
    async (subjectId) => {
      try {
        await deleteSubjectRequest(subjectId);
        setSubjects((prev) => prev.filter((s) => s.id !== subjectId));
      } catch (err) {
        showToast(err.message || "Failed to delete subject.", "error");
      }
    },
    [showToast]
  );

  // Optimistic toggle (instant checkbox feedback), reconciled with the
  // server's response — and rolled back via a refetch if the request fails.
  const toggleTopic = useCallback(
    async (subjectId, topicId) => {
      setSubjects((prev) =>
        prev.map((subject) =>
          subject.id !== subjectId
            ? subject
            : {
                ...subject,
                topics: subject.topics.map((topic) =>
                  topic.id !== topicId
                    ? topic
                    : { ...topic, completed: !topic.completed, progress: !topic.completed ? 100 : topic.progress }
                ),
              }
        )
      );

      try {
        const updated = await toggleSubjectTopic(subjectId, topicId);
        setSubjects((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      } catch (err) {
        showToast(err.message || "Failed to update topic.", "error");
        fetchSubjects();
      }
    },
    [showToast, fetchSubjects]
  );

  const updateTopicLink = useCallback(
    async (subjectId, topicId, link) => {
      try {
        const updated = await updateSubjectTopic(subjectId, topicId, { link });
        setSubjects((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      } catch (err) {
        showToast(err.message || "Failed to update the practice link.", "error");
      }
    },
    [showToast]
  );

  const toggleNeedsAttention = useCallback(
    async (subjectId) => {
      try {
        const updated = await toggleNeedsAttentionRequest(subjectId);
        setSubjects((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      } catch (err) {
        showToast(err.message || "Failed to update needs-attention.", "error");
      }
    },
    [showToast]
  );

  const hideFromRecent = useCallback(
    async (subjectId) => {
      try {
        const updated = await hideFromRecentRequest(subjectId);
        setSubjects((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      } catch (err) {
        showToast(err.message || "Failed to update recently studied.", "error");
      }
    },
    [showToast]
  );

  return { subjects, loading, toggleTopic, addSubject, editSubject, removeSubject, refetch: fetchSubjects, updateTopicLink, toggleNeedsAttention, hideFromRecent };
}

export default useSubjects;
