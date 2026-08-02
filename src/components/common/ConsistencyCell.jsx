import { format } from "date-fns";

function ConsistencyCell({ day }) {
  // Empty cells (before Jan 1 / after Dec 31)
  if (!day) {
    return <div className="w-2.75 h-2.75" />;
  }

  const getColor = () => {
    if (day.completion === null) return "bg-slate-800";

    if (day.completion === 0) return "bg-red-500";

    if (day.completion <= 25) return "bg-orange-500";

    if (day.completion <= 50) return "bg-yellow-400";

    if (day.completion <= 75) return "bg-lime-500";

    return "bg-green-500";
  };

  const tooltip = day.date
    ? `${format(
        new Date(day.date),
        "dd MMM yyyy"
      )}

${day.completedHabits ?? 0}/${day.totalHabits ?? 0} habits completed

${day.completion ?? 0}% Completion`
    : `${day.completion ?? 0}% Completion`;

  return (
    <div
      title={tooltip}
      className={`
        w-3
        h-3
        rounded-xs
        ${getColor()}
        transition-all
        duration-150
        cursor-pointer
        hover:scale-125
        hover:ring
        hover:ring-white/20
        hover:z-10
      `}
    />
  );
}

export default ConsistencyCell;