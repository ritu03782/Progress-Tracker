import DateNavigator from "../components/dailyHabits/DateNavigator";
import MotivationCard from "../components/dailyHabits/MotivationCard";
import MissedTaskCard from "../components/dailyHabits/MissedTaskCard";
import HabitGrid from "../components/dailyHabits/HabitGrid";
import ConsistencyCalendar from "../components/dailyHabits/ConsistencyCalendar";
import NotesCard from "../components/dailyHabits/NotesCard";
import { FaPlus } from "react-icons/fa";
import PageHeader from "../components/common/PageHeader";

function DailyHabits(){
    return <>
    <div className="min-h-screen bg-[#0F172A] p-6 md:p-8 space-y-8 text-white">
        <PageHeader
        title="Daily Habits"
        subtitle="Build consistency, one day at a time."
        buttonText="Add Habit"
        buttonIcon={<FaPlus />}
        onButtonClick={() => setOpen(true)}
    />

    <DateNavigator/>

    <MotivationCard
  completed={2}
  total={8}
/>

    <MissedTaskCard/>

    <HabitGrid/>

    <ConsistencyCalendar/>

    <NotesCard/>
    </div>
        </>
}
export default DailyHabits;