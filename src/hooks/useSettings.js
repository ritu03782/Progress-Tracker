import { useState, useEffect, useCallback } from "react";
import { getSettings, updateSettings } from "../services/settingsService";

function useSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    const data = await getSettings();
    setSettings(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const saveSettings = useCallback(async (updates) => {
    setSettings((prev) => ({ ...prev, ...updates }));
    await updateSettings(updates);
  }, []);

  return { settings, loading, saveSettings };
}
export default useSettings;