import { useState, useEffect, useCallback } from "react";
import { getSubjects, toggleSubjectTopic, createSubject } from "../services/subjectsService";

function useSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubjects = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getSubjects();
      setSubjects(data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  const toggleTopic = useCallback(async (subjectId, topicId) => {
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
      await toggleSubjectTopic(subjectId, topicId);
    } catch (err) {
      setError(err);
      fetchSubjects();
    }
  }, [fetchSubjects]);

  const addSubject = useCallback(async (subjectDraft) => {
    setSubjects((prev) => [...prev, subjectDraft]);
    await createSubject(subjectDraft);
  }, []);

  return { subjects, loading, error, toggleTopic, refetch: fetchSubjects, addSubject };
}

export default useSubjects;