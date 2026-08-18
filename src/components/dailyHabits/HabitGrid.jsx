import HabitCard from "./HabitCard";

function HabitGrid({ habits, onHabitClick }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} onClick={() => onHabitClick(habit)} />
      ))}
    </div>
  );
}
export default HabitGrid;