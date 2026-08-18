import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const goTo = (p) => onPageChange(Math.min(Math.max(1, p), totalPages));

  return (
    <div className="flex items-center justify-center gap-2 mt-5">
      <button
        type="button"
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
        className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center hover:border-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
      >
        <FaChevronLeft className="text-xs" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => goTo(p)}
          className={`w-9 h-9 rounded-lg text-sm font-medium transition cursor-pointer ${
            p === page ? "bg-blue-600 text-white" : "bg-slate-800 border border-slate-700 text-slate-300 hover:border-blue-500"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages}
        className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center hover:border-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
      >
        <FaChevronRight className="text-xs" />
      </button>
    </div>
  );
}
export default Pagination;