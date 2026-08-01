import { useState } from "react";

import {
  FaChevronDown,
  FaChevronUp,
  FaExclamationTriangle,
} from "react-icons/fa";

import Card from "../common/Card";

import MissedTask from "./MissedTask";

import missedTasksData from "../../config/missedTasksData";

function MissedTaskCard() {
  const [expanded, setExpanded] = useState(false);

  const visibleTasks = expanded
    ? missedTasksData
    : missedTasksData.slice(0, 1);

  return (
    <Card
      hover={false}
      padding="p-0"
      className="
      overflow-hidden
      border-red-500/20
      bg-linear-to-br
      from-red-500/5
      via-[#111827]
      to-[#111827]
      "
    >
      {/* Header */}

      <div className="px-5 py-4 flex justify-between items-center">

        <div className="flex items-center gap-3">

          <FaExclamationTriangle
            className="text-red-400"
          />

          <h2 className="font-semibold text-red-400">
            Missed Yesterday
          </h2>

        </div>

        <button
          onClick={() =>
            setExpanded(!expanded)
          }
          className="
          flex
          items-center
          gap-2
          text-sm
          text-blue-400
          hover:text-blue-300
          transition
          cursor-pointer
          "
        >
          View More

          {expanded ? (
            <FaChevronUp size={12} />
          ) : (
            <FaChevronDown size={12} />
          )}

        </button>

      </div>

      {/* Tasks */}

      <div className="px-4 pb-4 space-y-3">

        {visibleTasks.map((task) => (
          <MissedTask
            key={task.id}
            task={task}
          />
        ))}

      </div>

    </Card>
  );
}

export default MissedTaskCard;