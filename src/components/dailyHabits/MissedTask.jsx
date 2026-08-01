import {
  FaRedoAlt,
  FaTimes,
} from "react-icons/fa";

function MissedTask({ task }) {
  return (
    <div
      className="
      rounded-xl
      bg-slate-900/70
      border
      border-slate-800
      p-4
      transition-all
      duration-300
      hover:border-red-500/30
      "
    >
      <div className="flex justify-between gap-4">

        <div>

          <h3 className="text-white font-medium">
            {task.title}
          </h3>

          <p className="text-sm text-slate-400 mt-1">
            {task.description}
          </p>

        </div>

        <span
          className={`
          px-3
          py-1
          rounded-full
          text-xs
          border
          h-fit
          ${task.priorityColor}
          `}
        >
          {task.priority}
        </span>

      </div>

      <div className="flex gap-3 mt-5">

        <button
          className="
          flex-1
          flex
          items-center
          justify-center
          gap-2
          py-2
          rounded-lg
          bg-green-500/10
          border
          border-green-500/20
          text-green-400
          hover:bg-green-500/20
          transition
          "
        >
          <FaRedoAlt size={13} />
          Reschedule
        </button>

        <button
          className="
          flex-1
          flex
          items-center
          justify-center
          gap-2
          py-2
          rounded-lg
          bg-slate-800
          border
          border-slate-700
          text-slate-300
          hover:bg-slate-700
          transition
          "
        >
          <FaTimes size={13} />
          Ignore
        </button>

      </div>
    </div>
  );
}

export default MissedTask;