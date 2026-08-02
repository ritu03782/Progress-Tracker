import habitsData from "../../config/habitsData";
import HabitCard from "./HabitCard";

function HabitGrid({onHabitClick}) {
  return (
    <div
      className="
      grid
      gap-6
      sm:grid-cols-2
      xl:grid-cols-4
      
      "
    >
      {habitsData.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onClick={()=>onHabitClick(habit)}
        />
      ))}
    </div>
  );
}

export default HabitGrid;