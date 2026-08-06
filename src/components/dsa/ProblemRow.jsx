import { FaStar, FaRegStar } from "react-icons/fa";
import { getDifficultyClass, getStatusClass } from "../../utils/difficultyStyles";

function ProblemRow({ problem, onToggleFavourite }) {
  const PlatformIcon = problem.platformIcon;

  return (
    <tr className="border-b border-slate-800/70 last:border-b-0 hover:bg-slate-800/30 transition-colors">
      <td className="py-3.5 pr-4 text-sm text-slate-200 font-medium max-width-[220px]">
        {problem.name}
      </td>

      <td className="py-3.5 pr-4">
        <span
          className={`inline-block rounded-md px-2.5 py-1 text-xs font-medium ${getDifficultyClass(
            problem.difficulty
          )}`}
        >
          {problem.difficulty}
        </span>
      </td>

      <td className="py-3.5 pr-4 text-sm text-slate-400 whitespace-nowrap">
        {problem.topic}
      </td>

      <td className="py-3.5 pr-4">
        <span className="flex items-center gap-2 text-sm text-slate-300 whitespace-nowrap">
          <PlatformIcon className={problem.platformColor} />
          {problem.platform}
        </span>
      </td>

      <td className="py-3.5 pr-4">
        <span
          className={`text-sm font-medium whitespace-nowrap ${getStatusClass(
            problem.status
          )}`}
        >
          • {problem.status}
        </span>
      </td>

      <td className="py-3.5 pr-4 text-sm text-slate-400 whitespace-nowrap">
        {problem.lastSolved}
      </td>

      <td className="py-3.5 pr-4 text-sm text-slate-400 whitespace-nowrap">
        {problem.lastRevision}
      </td>

      <td className="py-3.5 pl-1">
        <button
          type="button"
          onClick={() => onToggleFavourite?.(problem.id)}
          aria-label="Toggle favourite"
          className="text-amber-400 hover:scale-110 transition-transform cursor-pointer"
        >
          {problem.favourite ? <FaStar /> : <FaRegStar className="text-slate-600" />}
        </button>
      </td>
    </tr>
  );
}

export default ProblemRow;
