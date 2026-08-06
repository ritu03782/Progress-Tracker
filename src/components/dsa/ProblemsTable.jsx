import Card from "../common/Card";
import ProblemRow from "./ProblemRow";
import { FaEllipsisV, FaArrowRight } from "react-icons/fa";

const columns = [
  "Problem",
  "Difficulty",
  "Topic",
  "Platform",
  "Status",
  "Last Solved",
  "Last Revision",
  "",
];

function ProblemsTable({ problems = [], onToggleFavourite, className="",onViewAll }) {
  return (
    <Card
      padding="p-6"
      hover={false}
      title="Problems"
      action={
        <button
          type="button"
          aria-label="More options"
          className="text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <FaEllipsisV />
        </button>
      }
      footer={
        <button
          type="button"
          onClick={onViewAll}
          className="mx-auto flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
        >
          View All Problems
          <FaArrowRight className="text-xs" />
        </button>
      }
      className={`h-full ${className}`}
    >
      <div className="overflow-x-auto -mx-1">
        <table className="w-full min-width-[720px] border-collapse px-1">
          <thead>
            <tr className="border-b border-slate-800 text-left">
              {columns.map((col) => (
                <th
                  key={col}
                  className="pb-3 pr-4 text-xs font-medium uppercase tracking-wide text-slate-500 whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {problems.map((problem) => (
              <ProblemRow
                key={problem.id}
                problem={problem}
                onToggleFavourite={onToggleFavourite}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default ProblemsTable;
