import contestsData from "../config/contestsData";

let _contests = contestsData;
const simulateLatency = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 150));

export async function getContests() {
  return simulateLatency(_contests);
}

export async function createContest(newContest) {
  _contests = [..._contests, newContest];
  return simulateLatency(_contests);
}