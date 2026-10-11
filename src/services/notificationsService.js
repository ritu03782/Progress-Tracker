import request from "./apiClient";

export async function getNotificationSummary() {
  return request("/v1/notifications/summary", { method: "GET" });
}
