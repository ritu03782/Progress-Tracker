import { useMemo } from "react";
import { MdTrendingUp } from "react-icons/md";
import { FaFire, FaCode, FaBriefcase } from "react-icons/fa";

import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatCard from "../components/dashboard/StatCard";
import ProgressChart from "../components/dashboard/ProgressChart";
import WeeklyActivity from "../components/dashboard/WeeklyActivity";
import TodaySchedule from "../components/dashboard/TodaySchedule";
import RecentActivity from "../components/dashboard/RecentActivity";

import useHabits from "../hooks/useHabits";
import useProblems from "../hooks/useProblems";
import useSubjects from "../hooks/useSubjects";
import useApplications from "../hooks/useApplications";
import useRecentActivity from "../hooks/useRecentActivity";
import { getOverallStats } from "../utils/subjectStats";
import { computeWeeklyActivity } from "../utils/dsaSelectors";

function Dashboard() {
  const { habits, loading: habitsLoading } = useHabits();
  const { problems, loading: problemsLoading } = useProblems();
  const { subjects, loading: subjectsLoading } = useSubjects();
  const { applications, loading: applicationsLoading } = useApplications();
  const { activities, loading: activitiesLoading } = useRecentActivity();

  const loading = habitsLoading || problemsLoading || subjectsLoading || applicationsLoading || activitiesLoading;

  const { overallProgress, totalSubjects } = useMemo(() => getOverallStats(subjects), [subjects]);

  // "Current Streak" / "Best" — the longest-running habit right now, and
  // the longest run any habit has ever had (both computed server-side per
  // habit; here we just take the max across all of them).
  const streakSummary = useMemo(() => {
    if (habits.length === 0) return { current: 0, best: 0 };
    return {
      current: Math.max(...habits.map((h) => h.streak)),
      best: Math.max(...habits.map((h) => h.bestStreak)),
    };
  }, [habits]);

  const problemsSummary = useMemo(() => {
    const solved = problems.filter((p) => p.status === "Solved");
    const thisWeek = solved.filter(
      (p) => p.solvedAt && (Date.now() - new Date(p.solvedAt).getTime()) / 86400000 < 7
    );
    return { total: solved.length, thisWeek: thisWeek.length };
  }, [problems]);

  // Replaces the original "Study Hours" card — that had no real tracking
  // mechanism anywhere in the app (same gap Subjects/Habits already have).
  // This is fully real: applications not yet Offer'd or Rejected.
  const activeApplications = useMemo(
    () => applications.filter((a) => a.status !== "Rejected" && a.status !== "Offer").length,
    [applications]
  );

  const weeklyActivity = useMemo(() => computeWeeklyActivity(problems), [problems]);

  const stats = [
    {
      id: 1,
      title: "Overall Progress",
      value: `${overallProgress}%`,
      subtitle: `${totalSubjects} subject${totalSubjects === 1 ? "" : "s"} tracked`,
      icon: MdTrendingUp,
      iconColor: "text-blue-500",
    },
    {
      id: 2,
      title: "Current Streak",
      value: `${streakSummary.current} Days`,
      subtitle: `Best: ${streakSummary.best} Days`,
      icon: FaFire,
      iconColor: "text-orange-500",
    },
    {
      id: 3,
      title: "Problems Solved",
      value: problemsSummary.total,
      subtitle: `${problemsSummary.thisWeek} this week`,
      icon: FaCode,
      iconColor: "text-green-500",
    },
    {
      id: 4,
      title: "Active Applications",
      value: activeApplications,
      subtitle: "in your pipeline",
      icon: FaBriefcase,
      iconColor: "text-purple-500",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-slate-400">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] p-6 md:p-8 space-y-8">
      <WelcomeBanner />

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item) => (
          <StatCard key={item.id} item={item} />
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressChart subjects={subjects} />
        <WeeklyActivity data={weeklyActivity} />
        <TodaySchedule />
        <RecentActivity activities={activities} />
      </section>
    </div>
  );
}
export default Dashboard;
