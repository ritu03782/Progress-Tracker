// Pure calculation helpers — single source of truth for every percentage
// shown across the stats bar, cards, and drawer.

export function getSubjectProgress(subject) {
  const total = subject.topics.length;
  if (total === 0) return 0;
  const completed = subject.topics.filter((t) => t.completed).length;
  return Math.round((completed / total) * 100);
}

export function getOverallStats(subjects) {
  const totalSubjects = subjects.length;
  const subjectsCompleted = subjects.filter((s) => getSubjectProgress(s) === 100).length;

  const allTopics = subjects.flatMap((s) => s.topics);
  const totalTopics = allTopics.length;
  const completedTopics = allTopics.filter((t) => t.completed).length;

  const overallProgress = totalTopics === 0
    ? 0
    : Math.round((completedTopics / totalTopics) * 100);

  const studyHours = subjects.reduce((sum, s) => sum + (s.studyHours || 0), 0);
  const topicsCompletedPct = totalTopics === 0
    ? 0
    : Math.round((completedTopics / totalTopics) * 100);

  return {
    overallProgress,
    totalSubjects,
    subjectsCompleted,
    studyHours,
    totalTopics,
    completedTopics,
    topicsCompletedPct,
  };
}

export function getWeakSubjects(subjects, limit = 3) {
  return [...subjects]
    .map((s) => ({ subject: s, progress: getSubjectProgress(s) }))
    .filter((s) => s.progress < 70)
    .sort((a, b) => a.progress - b.progress)
    .slice(0, limit);
}

export function getWeakTopics(subject, limit = 3) {
  return [...subject.topics]
    .filter((t) => t.progress < 60)
    .sort((a, b) => a.progress - b.progress)
    .slice(0, limit);
}

export function getProgressMessage(progress) {
  if (progress >= 80) return "Excellent work! Almost there.";
  if (progress >= 50) return "Good progress! Keep it up.";
  return "Let's build momentum.";
}