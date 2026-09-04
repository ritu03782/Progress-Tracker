import { useState, useEffect, useCallback } from "react";
import {
  getWeakTopics,
  addWeakTopic as addWeakTopicRequest,
  removeWeakTopic as removeWeakTopicRequest,
} from "../services/weakTopicsService";
import { useToast } from "../context/ToastContext";

function useWeakTopics() {
  const [weakTopics, setWeakTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchWeakTopics = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getWeakTopics();
      setWeakTopics(data);
    } catch (err) {
      showToast(err.message || "Failed to load weak topics.", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchWeakTopics();
  }, [fetchWeakTopics]);

  const addTopic = useCallback(
    async (topic) => {
      try {
        const item = await addWeakTopicRequest(topic);
        setWeakTopics((prev) => [...prev, item]);
      } catch (err) {
        showToast(err.message || "Failed to add weak topic.", "error");
      }
    },
    [showToast]
  );

  const removeTopic = useCallback(
    async (id) => {
      try {
        await removeWeakTopicRequest(id);
        setWeakTopics((prev) => prev.filter((t) => t.id !== id));
      } catch (err) {
        showToast(err.message || "Failed to remove weak topic.", "error");
      }
    },
    [showToast]
  );

  return { weakTopics, loading, addTopic, removeTopic };
}
export default useWeakTopics;
