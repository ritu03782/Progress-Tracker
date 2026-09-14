import { useState, useEffect, useCallback } from "react";
import {
  getApplications,
  createApplication,
  updateApplication as updateApplicationRequest,
  deleteApplication as deleteApplicationRequest,
  updateApplicationNotes,
  advanceApplicationStage,
  rejectApplication as rejectApplicationRequest,
  reopenApplication as reopenApplicationRequest,
} from "../services/applicationsService";
import { useToast } from "../context/ToastContext";

function useApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getApplications();
      setApplications(data);
    } catch (err) {
      showToast(err.message || "Failed to load applications.", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const addApplication = useCallback(
    async (draft) => {
      try {
        const newApp = await createApplication(draft);
        setApplications((prev) => [newApp, ...prev]);
        return newApp;
      } catch (err) {
        showToast(err.message || "Failed to add application.", "error");
      }
    },
    [showToast]
  );

  const editApplication = useCallback(
    async (applicationId, updates) => {
      try {
        const updated = await updateApplicationRequest(applicationId, updates);
        setApplications((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
        return updated;
      } catch (err) {
        showToast(err.message || "Failed to update application.", "error");
      }
    },
    [showToast]
  );

  const updateNotes = useCallback(
    async (applicationId, notes) => {
      try {
        const updated = await updateApplicationNotes(applicationId, notes);
        setApplications((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
      } catch (err) {
        showToast(err.message || "Failed to save notes.", "error");
      }
    },
    [showToast]
  );

  const removeApplication = useCallback(
    async (applicationId) => {
      try {
        await deleteApplicationRequest(applicationId);
        setApplications((prev) => prev.filter((a) => a.id !== applicationId));
      } catch (err) {
        showToast(err.message || "Failed to delete application.", "error");
      }
    },
    [showToast]
  );

  const advanceStage = useCallback(
    async (applicationId, payload) => {
      try {
        const updated = await advanceApplicationStage(applicationId, payload);
        setApplications((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
        return updated;
      } catch (err) {
        showToast(err.message || "Failed to update stage.", "error");
      }
    },
    [showToast]
  );

  const rejectApp = useCallback(
    async (applicationId) => {
      try {
        const updated = await rejectApplicationRequest(applicationId);
        setApplications((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
      } catch (err) {
        showToast(err.message || "Failed to update application.", "error");
      }
    },
    [showToast]
  );

  const reopenApp = useCallback(
    async (applicationId) => {
      try {
        const updated = await reopenApplicationRequest(applicationId);
        setApplications((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
      } catch (err) {
        showToast(err.message || "Failed to reopen application.", "error");
      }
    },
    [showToast]
  );

  return {
    applications,
    loading,
    addApplication,
    editApplication,
    updateNotes,
    removeApplication,
    advanceStage,
    rejectApp,
    reopenApp,
  };
}
export default useApplications;
