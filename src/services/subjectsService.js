import request from "./apiClient";
import { subjectIconOptions } from "../utils/iconOptions";
import { isToday, isYesterday, differenceInCalendarDays, format } from "date-fns";

const DEFAULT_ICON = subjectIconOptions[0];

function formatRelativeDate(value) {
  if (!value) return "Not started";
  const date = new Date(value);
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  const days = differenceInCalendarDays(new Date(), date);
  if (days > 0 && days <= 30) return `${days} days ago`;
  return format(date, "d MMM yyyy");
}

// Backend stores only `iconLabel` (a string) — re-attach the real icon
// component, color, bg, and gradient bar color from the existing
// subjectIconOptions map, and turn lastStudiedAt into a display string.
function shapeSubject(subject) {
  const option = subjectIconOptions.find((opt) => opt.label === subject.iconLabel) || DEFAULT_ICON;
  return {
    ...subject,
    icon: option.icon,
    color: option.color,
    bg: option.bg,
    barColor: `linear-gradient(90deg,${option.hex},${option.hex}aa)`,
    lastStudied: formatRelativeDate(subject.lastStudiedAt),
  };
}

export async function getSubjects() {
  const subjects = await request("/v1/subjects", { method: "GET" });
  return subjects.map(shapeSubject);
}

export async function createSubject(subjectDraft) {
  const payload = {
    name: subjectDraft.name,
    description: subjectDraft.description,
    iconLabel: subjectDraft.iconLabel,
    dailyTarget: subjectDraft.dailyTarget,
    studyHours: subjectDraft.studyHours,
    streak: subjectDraft.streak,
    notes: subjectDraft.notes,
    topics: (subjectDraft.topics || []).map((t) => ({ name: t.name, link: t.link || "" })),
  };
  const subject = await request("/v1/subjects", { method: "POST", body: payload });
  return shapeSubject(subject);
}

export async function updateSubject(subjectId, updates) {
  const subject = await request(`/v1/subjects/${subjectId}`, { method: "PATCH", body: updates });
  return shapeSubject(subject);
}

export async function deleteSubject(subjectId) {
  return request(`/v1/subjects/${subjectId}`, { method: "DELETE" });
}

export async function toggleSubjectTopic(subjectId, topicId) {
  const subject = await request(`/v1/subjects/${subjectId}/topics/${topicId}/toggle`, { method: "PATCH" });
  return shapeSubject(subject);
}

export async function updateSubjectTopic(subjectId, topicId, updates) {
  const subject = await request(`/v1/subjects/${subjectId}/topics/${topicId}`, { method: "PATCH", body: updates });
  return shapeSubject(subject);
}

export async function toggleNeedsAttention(subjectId) {
  const subject = await request(`/v1/subjects/${subjectId}/needs-attention`, { method: "PATCH" });
  return shapeSubject(subject);
}

export async function hideFromRecent(subjectId) {
  const subject = await request(`/v1/subjects/${subjectId}/hide-from-recent`, { method: "PATCH" });
  return shapeSubject(subject);
}
