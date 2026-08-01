function ProgressBar({
  value = 0,
  color = "linear-gradient(90deg,#22C55E,#3B82F6)",
  className = "",
  height = "h-1.5",
}) {
  return (
    <div className={`w-full ${className}`}>

      <div
        className={`
        relative
        overflow-hidden
        ${height}
        rounded-full
        bg-slate-700
        `}
      >

        <div
          className="
          relative
          h-full
          rounded-full
          transition-all
          duration-1000
          "
          style={{
            width: `${value}%`,
            background: color,
            boxShadow:
              "0 0 10px rgba(34,197,94,.35)",
          }}
        >

          {/* Shine */}

          <div
            className="
            absolute
            top-0
            left-0
            h-full
            w-8
            bg-white/25
            blur-sm
            -skew-x-12
            animate-pulse
            "
          />

        </div>

      </div>

    </div>
  );
}

export default ProgressBar;