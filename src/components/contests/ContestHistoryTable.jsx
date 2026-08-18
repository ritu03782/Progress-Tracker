import { useState, useMemo } from "react";
import { FaArrowRight } from "react-icons/fa";
import Card from "../common/Card";
import Button from "../common/Button";
import Pagination from "../common/Pagination";
import { getPlatformStyle } from "../../utils/contestStats";
import { platformOptions } from "../../utils/platformOptions";

const PAGE_SIZE = 5;

function ContestHistoryTable({ contests, onView, onViewAll }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(contests.length / PAGE_SIZE));
  const pageItems = useMemo(
    () => contests.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [contests, page]
  );

  return (
    <Card
      hover={false}
      title="Contest History"
      action={
        <button
          type="button"
          onClick={onViewAll}
          className="flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
        >
          View All <FaArrowRight className="text-xs" />
        </button>
      }
    >
      <div className="overflow-x-auto -mx-1">
        <table className="w-full min-width-[720px] border-collapse px-1">
          <thead>
            <tr className="border-b border-slate-800 text-left">
              {["Contest", "Platform", "Date", "Rank", "Score", "Solved", "Rating Change", ""].map((col) => (
                <th key={col} className="pb-3 pr-4 text-xs font-medium uppercase tracking-wide text-slate-500 whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageItems.map((contest) => {
              const { icon: Icon, color } = getPlatformStyle(platformOptions, contest.platform);
              return (
                <tr key={contest.id} className="border-b border-slate-800/70 last:border-b-0 hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 pr-4 text-sm text-slate-200 font-medium">{contest.name}</td>
                  <td className="py-3.5 pr-4"><Icon className={`text-lg ${color}`} /></td>
                  <td className="py-3.5 pr-4 text-sm text-slate-400 whitespace-nowrap">{contest.date}</td>
                  <td className="py-3.5 pr-4 text-sm text-blue-400 font-medium">{contest.rank}</td>
                  <td className="py-3.5 pr-4 text-sm text-slate-300">{contest.score}</td>
                  <td className="py-3.5 pr-4 text-sm text-slate-300 whitespace-nowrap">{contest.solved} / {contest.totalProblems}</td>
                  <td className="py-3.5 pr-4 text-sm font-medium whitespace-nowrap text-green-400">
                    +{contest.ratingChange}
                  </td>
                  <td className="py-3.5 pl-1">
                    <Button variant="secondary" size="sm" onClick={() => onView(contest)}>View</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </Card>
  );
}
export default ContestHistoryTable;