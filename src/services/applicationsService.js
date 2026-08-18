import applicationsData from "../config/applicationsData";

let _applications = applicationsData;
const simulateLatency = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 150));

export async function getApplications() {
  return simulateLatency(_applications);
}

export async function createApplication(newApplication) {
  _applications = [..._applications, newApplication];
  return simulateLatency(_applications);
}

export async function updateApplicationNotes(applicationId, notes) {
  _applications = _applications.map((a) => (a.id === applicationId ? { ...a, notes } : a));
  return simulateLatency(_applications);
}

export async function deleteApplication(applicationId) {
  _applications = _applications.filter((a) => a.id !== applicationId);
  return simulateLatency(_applications);
}