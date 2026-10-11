import { useState, useEffect, useCallback } from "react";
import { getNotificationSummary } from "../services/notificationsService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

// Re-fetches whenever the Settings "Notifications" toggle changes (via
// AuthContext's user.notifications), so flipping it takes effect
// immediately without needing a page reload.
function useNotifications() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchSummary = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getNotificationSummary();
      setItems(data.items);
      setEnabled(data.enabled);
    } catch (err) {
      showToast(err.message || "Failed to load notifications.", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary, user?.notifications]);

  return { items, enabled, loading, refetch: fetchSummary };
}
export default useNotifications;
