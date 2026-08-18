import GoalCard from "./GoalCard";

function GoalsList({ goals, onView }) {
  if (goals.length === 0) {
    return <p className="text-sm text-slate-500">No goals match this filter.</p>;
  }
  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} onView={onView} />
      ))}
    </div>
  );
}
export default GoalsList;