import { useState, useEffect, useCallback } from "react";
import { getApplications, createApplication, updateApplicationNotes, deleteApplication } from "../services/applicationsService";

function useApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    const data = await getApplications();
    setApplications(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchApplications(); }, [fetchApplications]);

  const addApplication = useCallback(async (draft) => {
    setApplications((prev) => [...prev, draft]);
    await createApplication(draft);
  }, []);

  const updateNotes = useCallback(async (applicationId, notes) => {
    setApplications((prev) => prev.map((a) => (a.id === applicationId ? { ...a, notes } : a)));
    await updateApplicationNotes(applicationId, notes);
  }, []);

  const removeApplication = useCallback(async (applicationId) => {
    setApplications((prev) => prev.filter((a) => a.id !== applicationId));
    await deleteApplication(applicationId);
  }, []);

  return { applications, loading, addApplication, updateNotes, removeApplication };
}
export default useApplications;