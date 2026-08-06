import { FaStar, FaExternalLinkAlt } from "react-icons/fa";
import { getDifficultyClass } from "../../utils/difficultyStyles";

function FavouriteItem({ question }) {
  return (
    <a
      href={question.link}
      className="
        flex
        items-center
        justify-between
        gap-3
        py-2.5
        px-2
        -mx-2
        rounded-lg
        transition-colors
        hover:bg-slate-800/40
      "
    >
      <span className="flex items-center gap-3 min-w-0">
        <FaStar className="shrink-0 text-amber-400" />
        <span className="truncate text-sm text-slate-200">{question.name}</span>
      </span>

      <span className="flex items-center gap-3 shrink-0">
        <span
          className={`rounded-md px-2.5 py-1 text-xs font-medium ${getDifficultyClass(
            question.difficulty
          )}`}
        >
          {question.difficulty}
        </span>

        <FaExternalLinkAlt className="text-xs text-slate-500" />
      </span>
    </a>
  );
}

export default FavouriteItem;
