import dsaProblemsData from "../config/dsaProblems";

let _problems = dsaProblemsData;
const simulateLatency = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 150));

export async function getProblems() {
  return simulateLatency(_problems);
}

export async function toggleProblemFavourite(problemId) {
  _problems = _problems.map((p) => (p.id === problemId ? { ...p, favourite: !p.favourite } : p));
  return simulateLatency(_problems);
}

export async function createProblem(newProblem) {
  _problems = [..._problems, newProblem];
  return simulateLatency(_problems);
}