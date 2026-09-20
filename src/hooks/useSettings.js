import { useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {
  updatePreferences,
  exportUserData,
  deleteAccount as deleteAccountRequest,
} from "../services/settingsService";

// Preferences live on the User document, and the user is already loaded
// by AuthContext on app start — reading from it here avoids a second,
// redundant fetch (the same lesson as the GoalsProvider double-fetch fix).
function useSettings() {
  const { user, loading, refreshUser } = useAuth();
  const { showToast } = useToast();

  const settings = user
    ? {
        notifications: user.notifications ?? true,
        studyReminders: user.studyReminders ?? true,
        goalReminders: user.goalReminders ?? true,
      }
    : null;

  const savePreferences = useCallback(
    async (updates) => {
      try {
        const updatedUser = await updatePreferences(updates);
        refreshUser(updatedUser);
      } catch (err) {
        showToast(err.message || "Failed to update preferences.", "error");
      }
    },
    [refreshUser, showToast]
  );

  const exportData = useCallback(async () => {
    try {
      const data = await exportUserData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `progress-tracker-export-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showToast("Your data export has started downloading.", "success");
    } catch (err) {
      showToast(err.message || "Failed to export data.", "error");
    }
  }, [showToast]);

  // Returns true/false so the caller knows whether to redirect to /login.
  const removeAccount = useCallback(async () => {
    try {
      await deleteAccountRequest();
      // The account is gone server-side, which already cleared the auth
      // cookies — calling the normal logout() here would just 401 against
      // a user that no longer exists. Clear local state directly instead.
      refreshUser(null);
      return true;
    } catch (err) {
      showToast(err.message || "Failed to delete account.", "error");
      return false;
    }
  }, [refreshUser, showToast]);

  return { settings, loading, savePreferences, exportData, deleteAccount: removeAccount };
}
export default useSettings;
