import { subjectIconOptions, goalIconOptions, habitIconOptions } from "./iconOptions";

export function resolveSubjectIcon(iconKey) {
  return subjectIconOptions.find((opt) => opt.key === iconKey) || subjectIconOptions[0];
}
export function resolveGoalIcon(iconKey) {
  return goalIconOptions.find((opt) => opt.key === iconKey) || goalIconOptions[0];
}
export function resolveHabitIcon(iconKey) {
  return habitIconOptions.find((opt) => opt.key === iconKey) || habitIconOptions[0];
}