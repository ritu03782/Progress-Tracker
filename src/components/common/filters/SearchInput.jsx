import { FaSearch, FaTimes } from "react-icons/fa";

function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) {
  return (
    <div className={`relative ${className}`}>
      <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          bg-slate-800
          border
          border-slate-700
          rounded-xl
          pl-10
          pr-9
          py-2.5
          text-sm
          text-white
          placeholder:text-slate-500
          outline-none
          transition-all
          duration-200
          focus:border-blue-500
          focus:bg-slate-800/80
        "
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-slate-500
            hover:text-white
            transition-colors
            cursor-pointer
          "
        >
          <FaTimes className="text-xs" />
        </button>
      )}
    </div>
  );
}

export default SearchInput;