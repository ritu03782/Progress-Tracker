import PageHeader from "../components/dailyHabits/PageHeader";
import DateNavigator from "../components/dailyHabits/DateNavigator";
import MotivationCard from "../components/dailyHabits/MotivationCard";
import MissedTaskCard from "../components/dailyHabits/MissedTaskCard";
import HabitGrid from "../components/dailyHabits/HabitGrid";
import ConsistencyCalendar from "../components/dailyHabits/ConsistencyCalendar";
import NotesCard from "../components/dailyHabits/NotesCard";
function DailyHabits(){
    return <>
    <PageHeader/>

    <DateNavigator/>

    <MotivationCard/>

    <MissedTaskCard/>

    <HabitGrid/>

    <ConsistencyCalendar/>

    <NotesCard/>
        </>
}
export default DailyHabits;