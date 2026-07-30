import schedule from "../../config/todayScheduleData";

function TodaySchedule() {
  return (
    <div
      className="
      bg-[#111827]
      rounded-2xl
      border
      border-slate-800
      p-6
      shadow-lg
      hover:border-blue-500/30
      hover:shadow-blue-500/10
      transition-all
      duration-300
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">
         📅 Today's Schedule
        </h2>

        <button className="text-sm text-blue-400 hover:text-blue-300 transition cursor-pointer">
          View All
        </button>
      </div>

      {/* Tasks */}
      <div className="space-y-4">

        {schedule.map((task) => (
          <div
            key={task.id}
            className="
            group
            flex
            items-center
            justify-between
            rounded-xl
            bg-slate-800
            p-4
            transition-all
            duration-300
            hover:bg-slate-700
            hover:-translate-y-1
            hover:shadow-md
            cursor-pointer
            "
          >
            {/* Left */}
            <div className="flex items-center gap-4">

              {/* Priority Dot */}
              <span
                className={`w-3 h-3 rounded-full ${task.priorityColor}`}
              />

              {/* Task */}
              <div>

                <h3 className="text-white font-medium">
                  {task.title}
                </h3>

                <div className="flex items-center gap-3 mt-1">

                  <p className="text-xs text-slate-400">
                    {task.time}
                  </p>

                  <span
                    className="
                    px-2
                    py-0.5
                    rounded-full
                    text-xs
                    bg-slate-700
                    text-slate-300
                    "
                  >
                    {task.priority}
                  </span>

                </div>

              </div>

            </div>

            {/* Checkbox */}
            <input
              type="checkbox"
              defaultChecked={task.completed}
              className="
              w-5
              h-5
              accent-blue-500
              cursor-pointer
              "
            />
          </div>
        ))}

      </div>
    </div>
  );
}

export default TodaySchedule;