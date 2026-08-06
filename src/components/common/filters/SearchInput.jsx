import { FaSearch } from "react-icons/fa";

function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) {
  return (
    <div
      className={`
      relative
      w-full
      ${className}
    `}
    >
      <FaSearch
        className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-slate-500
        text-sm
      "
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          h-11
          rounded-xl
          bg-[#0B1220]
          border
          border-slate-700
          pl-11
          pr-4
          text-sm
          text-white
          placeholder:text-slate-500
          outline-none
          transition-all
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-500/20
        "
      />
    </div>
  );
}

export default SearchInput;