import { useState, useEffect, useCallback } from "react";
import { getRecentActivity } from "../services/dashboardService";
import { useToast } from "../context/ToastContext";

// Read-only — there's nothing to add/edit/remove here, just a feed.
function useRecentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchActivity = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getRecentActivity();
      setActivities(data);
    } catch (err) {
      showToast(err.message || "Failed to load recent activity.", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  return { activities, loading };
}
export default useRecentActivity;
