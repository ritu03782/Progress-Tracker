import { eachDayOfInterval, format } from "date-fns";

const start = new Date(new Date().getFullYear(), 0, 1);
const end = new Date();

const consistencyData = eachDayOfInterval({
  start,
  end,
}).map((day) => {
  const completion = Math.floor(Math.random() * 101);

  return {
    id: format(day, "yyyy-MM-dd"),

    date: format(day, "yyyy-MM-dd"),

    completion,

    completedHabits: Math.floor((completion / 100) * 8),

    totalHabits: 8,
  };
});

export default consistencyData;