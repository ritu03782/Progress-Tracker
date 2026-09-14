import request from "./apiClient";
import { format, differenceInCalendarDays, isToday, isTomorrow } from "date-fns";

// Computed at day-level granularity from the contest date — a frozen
// "In 2d 4h" string goes stale the moment real time passes; this never does.
function computeStartsIn(dateValue) {
  const date = new Date(dateValue);
  const days = differenceInCalendarDays(date, new Date());
  if (days < 0) return "Started";
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  return `In ${days} days`;
}

function shapeContest(contest) {
  return {
    ...contest,
    date: format(new Date(contest.date), "yyyy-MM-dd"),
    startsIn: contest.status === "Upcoming" ? computeStartsIn(contest.date) : null,
  };
}

export async function getContests() {
  const contests = await request("/v1/contests", { method: "GET" });
  return contests.map(shapeContest);
}

export async function createContest(contestDraft) {
  const payload = {
    name: contestDraft.name,
    platform: contestDraft.platform,
    type: contestDraft.type,
    date: contestDraft.date,
    startTime: contestDraft.startTime,
    duration: contestDraft.duration,
    registrationLink: contestDraft.registrationLink,
  };
  const contest = await request("/v1/contests", { method: "POST", body: payload });
  return shapeContest(contest);
}

export async function updateContest(contestId, updates) {
  const contest = await request(`/v1/contests/${contestId}`, { method: "PATCH", body: updates });
  return shapeContest(contest);
}

export async function deleteContest(contestId) {
  return request(`/v1/contests/${contestId}`, { method: "DELETE" });
}

export async function logContestResult(contestId, resultDraft) {
  const contest = await request(`/v1/contests/${contestId}/log-result`, { method: "PATCH", body: resultDraft });
  return shapeContest(contest);
}

export async function reopenContest(contestId) {
  const contest = await request(`/v1/contests/${contestId}/reopen`, { method: "PATCH" });
  return shapeContest(contest);
}
