import { useState } from "react";
import Card from "../common/Card";
import RevisionTabs from "./RevisionTabs";
import { getDifficultyClass } from "../../utils/difficultyStyles";
import { FaArrowRight } from "react-icons/fa";
import { revisionTabs } from "../../config/revisionQueue";

function RevisionQueue({ queue = {}, onViewAll,className="", onToggleItem }) {
  const [activeTab, setActiveTab] = useState(revisionTabs[0].id);
  const items = queue[activeTab] || [];

  return (
    <Card
      padding="p-6"
      hover={false}
      title="Revision Queue"
      subtitle="Problems you should revise"
      action={
        <button
          type="button"
          onClick={onViewAll}
          className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
        >
          View All
        </button>
      }
      footer={
        <button
          type="button"
          onClick={onViewAll}
          className="mx-auto flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
        >
          View Full Queue
          <FaArrowRight className="text-xs" />
        </button>
      }
      className={`h-full ${className}`}
    >
      <RevisionTabs
        tabs={revisionTabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div className="mt-4 divide-y divide-slate-800/70">
        {items.length === 0 && (
          <p className="py-6 text-center text-sm text-slate-500">
            No problems to revise here.
          </p>
        )}

        {items.map((item) => (
          <label
            key={item.id}
            className="flex items-center justify-between gap-3 py-2.5 cursor-pointer"
          >
            <span className="flex items-center gap-3 min-w-0">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => onToggleItem?.(activeTab, item.id)}
                className="h-4 w-4 shrink-0 accent-violet-600 cursor-pointer"
              />

              <span
                className={`truncate text-sm ${
                  item.checked
                    ? "text-slate-500 line-through"
                    : "text-slate-200"
                }`}
              >
                {item.name}
              </span>
            </span>

            <span
              className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-medium ${getDifficultyClass(
                item.difficulty
              )}`}
            >
              {item.difficulty}
            </span>
          </label>
        ))}
      </div>
    </Card>
  );
}

export default RevisionQueue;
