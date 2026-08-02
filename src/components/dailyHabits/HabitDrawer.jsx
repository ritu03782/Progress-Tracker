import {
  FaTimes,
  FaFire,
  FaCheckCircle,
  FaEdit,
  FaCalendarAlt,
  FaStickyNote,
  FaBullseye,
} from "react-icons/fa";

import Card from "../common/Card";
import ProgressBar from "../common/ProgressBar";
import Button from "../common/Button";

function HabitDrawer({
  habit={selectedHabit},
  isOpen={isDrawerOpen},
  onClose={closeDrawer},
}) {
  if (!habit) return null;

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className={`
          fixed inset-0
          bg-black/60
          backdrop-blur-sm
          transition-all
          duration-300
          z-40
          ${
            isOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      {/* Drawer */}

      <div
        className={`
          fixed
          top-0
          right-0
          h-screen
          w-[107.5
          bg-[#0F172A]
          border-l
          border-slate-800
          shadow-2xl
          z-50
          transition-transform
          duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* Header */}

        <div
          className="
          flex
          justify-between
          items-start
          p-6
          border-b
          border-slate-800
          "
        >
          <div className="flex gap-4">

            <div
              className={`
              w-16
              h-16
              rounded-2xl
              flex
              items-center
              justify-center
              ${habit.bg}
              `}
            >
              <habit.icon
                className={`text-3xl ${habit.color}`}
              />
            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                {habit.title}
              </h2>

              <p className="text-slate-400">
                {habit.category}
              </p>

              <p className="mt-2 text-sm text-slate-500 max-w-xs">
                {habit.description}
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="
            w-10
            h-10
            rounded-xl
            bg-slate-800
            text-slate-400
            hover:bg-slate-700
            hover:text-white
            transition
            cursor-pointer
            flex
            items-center
            justify-center
            "
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}

        <div
          className="
          p-6
          space-y-5
          overflow-y-auto
          h-[calc(100vh-110px)]
          "
        >
                    {/* Today's Status */}

          <Card
            hover={false}
            className="
            bg-linear-to-r
            from-slate-900
            to-slate-800
            "
          >
            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-400 text-sm">
                  Today's Status
                </p>

                <h3
                  className={`
                  mt-2
                  text-xl
                  font-semibold
                  ${
                    habit.completed
                      ? "text-green-400"
                      : "text-yellow-400"
                  }
                  `}
                >
                  {habit.completed
                    ? "Completed ✅"
                    : "Pending ⏳"}
                </h3>

              </div>

              <FaCheckCircle
                className={`
                text-5xl
                ${
                  habit.completed
                    ? "text-green-400"
                    : "text-yellow-400"
                }
                `}
              />

            </div>
          </Card>

          {/* Streak & Target */}

          <div className="grid grid-cols-2 gap-4">

            <Card
              hover={false}
              className="
              bg-linear-to-br
              from-orange-500/10
              to-transparent
              "
            >
              <div className="flex justify-between items-start">

                <div>

                  <p className="text-slate-400 text-sm">
                    Current Streak
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-white">
                    {habit.streak}
                  </h2>

                  <p className="text-sm text-slate-500">
                    Days
                  </p>

                </div>

                <FaFire
                  className="
                  text-5xl
                  text-orange-400
                  "
                />

              </div>
            </Card>

            <Card
              hover={false}
              className="
              bg-linear-to-br
              from-blue-500/10
              to-transparent
              "
            >
              <div className="flex justify-between items-start">

                <div>

                  <p className="text-slate-400 text-sm">
                    Daily Target
                  </p>

                  <h2 className="mt-2 text-lg font-semibold text-white">
                    {habit.target}
                  </h2>

                </div>

                <FaBullseye
                  className="
                  text-4xl
                  text-blue-400
                  "
                />

              </div>
            </Card>

          </div>

          {/* Completion Rate */}

          <Card hover={false}>

            <div className="flex justify-between items-center mb-4">

              <div>

                <p className="text-slate-400 text-sm">
                  Completion Rate
                </p>

                <h3 className="mt-1 text-lg font-semibold text-white">
                  Overall Performance
                </h3>

              </div>

              <span
                className={`
                text-xl
                font-bold
                ${habit.color}
                `}
              >
                {habit.completionRate}%
              </span>

            </div>

            <ProgressBar
              value={habit.completionRate}
              color="linear-gradient(90deg,#22C55E,#3B82F6)"
              height="h-3"
            />

          </Card>

          {/* Reminder */}

          <Card
            hover={false}
            className="
            bg-linear-to-r
            from-cyan-500/10
            to-transparent
            "
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-400 text-sm">
                  Reminder
                </p>

                <h3 className="mt-2 text-xl font-semibold text-white">
                  {habit.reminder}
                </h3>

              </div>

              <FaCalendarAlt
                className="
                text-5xl
                text-cyan-400
                "
              />

            </div>

          </Card>
                    {/* Last 7 Days */}

          <Card hover={false}>

            <h3 className="text-white font-semibold mb-5">
              Last 7 Days
            </h3>

            <div className="flex justify-between">

              {habit.history.map((day, index) => (

                <div
                  key={index}
                  className={`
                    w-11
                    h-11
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    font-semibold
                    transition-all
                    duration-300

                    ${
                      day
                        ? "bg-green-500/15 text-green-400 border border-green-500/20"
                        : "bg-red-500/15 text-red-400 border border-red-500/20"
                    }
                  `}
                >
                  {day ? "✓" : "—"}
                </div>

              ))}

            </div>

          </Card>

          {/* Notes */}

          <Card hover={false}>

            <div className="flex gap-4">

              <div
                className="
                w-12
                h-12
                rounded-xl
                bg-blue-500/10
                flex
                items-center
                justify-center
                "
              >
                <FaStickyNote className="text-blue-400 text-xl" />
              </div>

              <div className="flex-1">

                <h3 className="text-white font-semibold">
                  Notes
                </h3>

                <p className="text-slate-400 text-sm mt-2 leading-6">
                  {habit.notes}
                </p>

              </div>

            </div>

          </Card>

          {/* Skip Reason */}

          {habit.skipReason && (

            <Card
              hover={false}
              className="
              bg-linear-to-r
              from-red-500/10
              to-transparent
              "
            >

              <h3 className="text-white font-semibold">
                Skip Reason
              </h3>

              <p className="mt-3 text-slate-400 text-sm leading-6">
                {habit.skipReason}
              </p>

            </Card>

          )}

          {/* Action Buttons */}

          <div className="space-y-3 pt-2">

            <Button
              variant="primary"
              className="w-full justify-center"
            >
              ✔ Mark Complete
            </Button>

            <Button
              variant="secondary"
              className="w-full justify-center"
            >
              ⏭ Skip Today
            </Button>

            <Button
              variant="secondary"
              className="w-full justify-center"
            >
              <FaEdit />

              Edit Habit
            </Button>

          </div>

        </div>

      </div>

    </>
  );
}

export default HabitDrawer;

        