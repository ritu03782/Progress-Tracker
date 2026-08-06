function ResetFilter({ onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        h-11
        shrink-0
        rounded-xl
        border
        border-slate-700
        bg-[#0B1220]
        px-5
        text-sm
        font-medium
        text-slate-300
        transition-all
        duration-200
        hover:border-blue-500
        hover:text-white
        cursor-pointer
        ${className}
      `}
    >
      Reset
    </button>
  );
}

export default ResetFilter;
