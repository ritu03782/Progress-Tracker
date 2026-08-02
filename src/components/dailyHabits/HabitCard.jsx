import Card from "../common/Card";
import ProgressBar from "../common/ProgressBar";

function HabitCard({ habit, onClick }) {
  const Icon = habit.icon;

  return (
    <Card
      onClick={onClick}
      padding="p-5"
      className="group cursor-pointer bg-slate-950"
    >
      {/* Header */}

      <div className="flex justify-between items-start ">

        <div
          className={`
            w-14
            h-14
            rounded-xl
            flex
            items-center
            justify-center
            transition-transform
            duration-300
            group-hover:scale-105
            ${habit.bg}
          `}
        >
          <Icon
            className={`text-2xl ${habit.color}`}
          />
        </div>

        <span
          className={`
            px-3
            py-1
            rounded-full
            text-xs
            font-medium

            ${
              habit.completed
                ? "bg-green-500/15 text-green-400"
                : "bg-yellow-500/15 text-yellow-400"
            }
          `}
        >
          {habit.completed ? "Completed" : "Pending"}
        </span>

      </div>

      {/* Title */}

      <h3
        className="
          mt-5
          text-lg
          font-semibold
          text-white
        "
      >
        {habit.title}
      </h3>

      {/* Progress */}

      <div className="mt-6">

        <ProgressBar
          value={habit.progress}
          color="linear-gradient(90deg,#22C55E,#3B82F6)"
        />

        <div className="flex justify-end mt-2">

          <span
            className={`
              text-sm
              font-semibold
              ${habit.color}
            `}
          >
            {habit.progress}%
          </span>

        </div>

      </div>

    </Card>
  );
}

export default HabitCard;