import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatCard from "../components/dashboard/StatCard";
import ProgressChart from "../components/dashboard/ProgressChart";
import WeeklyActivity from "../components/dashboard/WeeklyActivity";
import TodaySchedule from "../components/dashboard/TodaySchedule";
import RecentActivity from "../components/dashboard/RecentActivity";
import dashboardStats from "../config/dashboardStatsData";
function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0F172A] p-6 md:p-8 space-y-8">

      <WelcomeBanner />

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {dashboardStats.map((item) => (
          <StatCard key={item.id} item={item} />
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressChart />
        <WeeklyActivity />
        <TodaySchedule />
        <RecentActivity />
      </section>

    </div>
  );
}
export default Dashboard;