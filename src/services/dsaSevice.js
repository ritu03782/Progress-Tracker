import request from "./apiClient";
import { platformOptions } from "../utils/platformOptions";
import { formatRelativeDate } from "../utils/relativeDate";

const DEFAULT_PLATFORM = platformOptions[0];

// Backend stores only `platform` (a string) — re-attach the real icon
// component + color from the existing platformOptions map, and convert
// solvedAt/revisedAt into display strings. Everything else (nextRevisionAt,
// revisionCount) is passed through raw for the revision-queue selector.
function shapeProblem(problem) {
  const platformOption =
    platformOptions.find((p) => p.label === problem.platform) || DEFAULT_PLATFORM;

  return {
    ...problem,
    platformIcon: platformOption.icon,
    platformColor: platformOption.color,
    lastSolved: formatRelativeDate(problem.solvedAt),
    lastRevision: formatRelativeDate(problem.revisedAt),
  };
}

export async function getProblems() {
  const problems = await request("/v1/problems", { method: "GET" });
  return problems.map(shapeProblem);
}

export async function createProblem(problemDraft) {
  const payload = {
    name: problemDraft.name,
    topic: problemDraft.topic,
    difficulty: problemDraft.difficulty,
    platform: problemDraft.platform,
    status: problemDraft.status,
    link: problemDraft.link,
  };
  const problem = await request("/v1/problems", { method: "POST", body: payload });
  return shapeProblem(problem);
}

export async function updateProblem(problemId, updates) {
  const problem = await request(`/v1/problems/${problemId}`, { method: "PATCH", body: updates });
  return shapeProblem(problem);
}

export async function deleteProblem(problemId) {
  return request(`/v1/problems/${problemId}`, { method: "DELETE" });
}

export async function toggleProblemFavourite(problemId) {
  const problem = await request(`/v1/problems/${problemId}/favourite`, { method: "PATCH" });
  return shapeProblem(problem);
}

export async function reviseProblem(problemId) {
  const problem = await request(`/v1/problems/${problemId}/revise`, { method: "PATCH" });
  return shapeProblem(problem);
}
