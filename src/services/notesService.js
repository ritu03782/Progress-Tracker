import request from "./apiClient";
import { format } from "date-fns";

function dateParam(date) {
  return format(date, "yyyy-MM-dd");
}

export async function getNote(date) {
  return request(`/v1/notes?date=${dateParam(date)}`, { method: "GET" });
}

export async function saveNote(date, { text, mood }) {
  return request("/v1/notes", { method: "PATCH", body: { date: dateParam(date), text, mood } });
}
