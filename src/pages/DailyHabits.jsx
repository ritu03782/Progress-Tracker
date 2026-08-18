import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import PageHeader from "../components/common/PageHeader";
import Modal from "../components/common/Modal";
import DateNavigator from "../components/dailyHabits/DateNavigator";
import MotivationCard from "../components/dailyHabits/MotivationCard";
import MissedTaskCard from "../components/dailyHabits/MissedTaskCard";
import HabitGrid from "../components/dailyHabits/HabitGrid";
import HabitDrawer from "../components/dailyHabits/HabitDrawer";
import ConsistencyCalendar from "../components/dailyHabits/ConsistencyCalendar";
import NotesCard from "../components/dailyHabits/NotesCard";
import AddHabitForm from "../components/dailyHabits/AddHabitForm";
import useHabits from "../hooks/useHabits";

function DailyHabits() {
  const { habits, loading, addHabit } = useHabits();
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const openDrawer = (habit) => { setSelectedHabit(habit); setIsDrawerOpen(true); };
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleAddHabit = (habitDraft) => {
    addHabit(habitDraft);
    setIsAddOpen(false);
  };

  if (loading) {
    return <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-slate-400">Loading habits...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0F172A] p-6 md:p-8 space-y-8 text-white">
      <PageHeader
        title="Daily Habits"
        subtitle="Build consistency, one day at a time."
        buttonText="Add Habit"
        buttonIcon={<FaPlus />}
        onButtonClick={() => setIsAddOpen(true)}
      />

      <DateNavigator />
      <MotivationCard completed={habits.filter((h) => h.completed).length} total={habits.length} />
      <MissedTaskCard />
      <HabitGrid habits={habits} onHabitClick={openDrawer} />
      <HabitDrawer habit={selectedHabit} isOpen={isDrawerOpen} onClose={closeDrawer} />
      <ConsistencyCalendar />
      <NotesCard />

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add New Habit">
        <AddHabitForm onSubmit={handleAddHabit} onCancel={() => setIsAddOpen(false)} />
      </Modal>
    </div>
  );
}
export default DailyHabits;