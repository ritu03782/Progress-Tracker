import schedule from "../../config/todayScheduleData";
import Card from "../common/Card";

function TodaySchedule() {
  return (
          <Card
        title="📅 Today's Schedule"
        subtitle="Stay on track with today's planned tasks."
        className="hover:border-blue-500/30"
        action={
          <div className="flex items-center gap-4">

            <span className="text-sm font-medium text-green-400">
              4 / 6 Done
            </span>

            <button
              className="
              text-sm
              text-blue-400
              hover:text-blue-300
              transition
              cursor-pointer
              "
            >
              View All
            </button>

          </div>
        }
        footer={
          <p className="text-sm text-slate-400">
            🎯 Complete your high-priority tasks first to stay productive.
          </p>
        }
      >
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

              <span
                className={`w-3 h-3 rounded-full ${task.priorityColor}`}
              />

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

      

    </Card>
  );
}

export default TodaySchedule;