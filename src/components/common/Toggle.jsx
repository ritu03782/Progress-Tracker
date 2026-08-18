function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`
        relative inline-flex h-7 w-12 shrink-0 items-center
        rounded-full cursor-pointer
        transition-colors duration-200 ease-in-out
        focus:outline-none
        ${checked ? "bg-blue-600" : "bg-slate-700"}
      `}
    >
      <span
        className={`
          pointer-events-none absolute
          left-1 top-1
          h-5 w-5 rounded-full bg-white
          shadow-sm
          transition-transform duration-200 ease-in-out
          ${checked ? "translate-x-5" : "translate-x-0"}
        `}
      />
    </button>
  );
}

export default Toggle;