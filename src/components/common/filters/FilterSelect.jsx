import { FaChevronDown } from "react-icons/fa";

function FilterSelect({ label, value, onChange, options = [], className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={onChange}
        className="
          h-11
          w-full
          appearance-none
          rounded-xl
          bg-[#0B1220]
          border
          border-slate-700
          pl-4
          pr-9
          text-sm
          text-slate-200
          outline-none
          cursor-pointer
          transition-all
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-500/20
        "
      >
        <option value="">{label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <FaChevronDown
        className="
          pointer-events-none
          absolute
          right-3.5
          top-1/2
          -translate-y-1/2
          text-xs
          text-slate-500
        "
      />
    </div>
  );
}

export default FilterSelect;
