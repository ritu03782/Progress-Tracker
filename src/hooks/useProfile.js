import { useState, useEffect, useCallback } from "react";
import { getProfile, updateProfile } from "../services/profileService";

function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    const data = await getProfile();
    setProfile(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  const saveProfile = useCallback(async (updates) => {
    setProfile((prev) => ({ ...prev, ...updates }));
    await updateProfile(updates);
  }, []);

  return { profile, loading, saveProfile };
}
export default useProfile;