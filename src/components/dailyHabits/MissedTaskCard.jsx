import { useState, useEffect, useMemo } from "react";
import { format, subDays } from "date-fns";

import {
  FaChevronDown,
  FaChevronUp,
  FaExclamationTriangle,
} from "react-icons/fa";

import Card from "../common/Card";

import MissedTask from "./MissedTask";

import { getMissedHabits, dismissMissedHabit } from "../../services/habitsService";
import { useToast } from "../../context/ToastContext";

// Backend doesn't track a "priority" concept for habits — every missed
// habit is shown with the same "Missed" badge. Add real priority scoring
// later if that becomes a real feature.
const MISSED_BADGE = {
  priority: "Missed",
  priorityColor: "bg-red-500/15 text-red-400 border-red-500/20",
};

function MissedTaskCard() {
  const [expanded, setExpanded] = useState(false);
  const [missedTasks, setMissedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  // Computed once and reused for both the fetch and any dismiss action, so
  // "yesterday" can never drift between the two calls (e.g. around midnight).
  const yesterday = useMemo(() => format(subDays(new Date(), 1), "yyyy-MM-dd"), []);

  useEffect(() => {
    let active = true;
    getMissedHabits(yesterday)
      .then((data) => {
        if (active) setMissedTasks(data.map((t) => ({ ...t, ...MISSED_BADGE })));
      })
      .catch(() => {
        if (active) setMissedTasks([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [yesterday]);

  const handleAction = async (habitId, action) => {
    try {
      await dismissMissedHabit(habitId, { date: yesterday, action });
      setMissedTasks((prev) => prev.filter((t) => t.id !== habitId));
      showToast(
        action === "reschedule" ? "Habit rescheduled for today." : "Missed habit dismissed.",
        "success"
      );
    } catch (err) {
      showToast(err.message || "Something went wrong. Please try again later.", "error");
    }
  };

  if (loading || missedTasks.length === 0) return null;

  const visibleTasks = expanded ? missedTasks : missedTasks.slice(0, 1);

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

        {missedTasks.length > 1 && (
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
        )}

      </div>

      {/* Tasks */}

      <div className="px-4 pb-4 space-y-3">

        {visibleTasks.map((task) => (
          <MissedTask
            key={task.id}
            task={task}
            onReschedule={() => handleAction(task.id, "reschedule")}
            onIgnore={() => handleAction(task.id, "ignore")}
          />
        ))}

      </div>

    </Card>
  );
}

export default MissedTaskCard;
