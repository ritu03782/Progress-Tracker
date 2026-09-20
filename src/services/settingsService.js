import request from "./apiClient";

export async function updatePreferences(updates) {
  return request("/v1/users/preferences", { method: "PATCH", body: updates });
}

export async function exportUserData() {
  return request("/v1/settings/export-data", { method: "GET" });
}

export async function deleteAccount() {
  return request("/v1/settings/account", { method: "DELETE" });
}
