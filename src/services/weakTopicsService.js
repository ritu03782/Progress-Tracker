import request from "./apiClient";

export async function getWeakTopics() {
  return request("/v1/weak-topics", { method: "GET" });
}

export async function addWeakTopic(topic) {
  return request("/v1/weak-topics", { method: "POST", body: { topic } });
}

export async function removeWeakTopic(id) {
  return request(`/v1/weak-topics/${id}`, { method: "DELETE" });
}
