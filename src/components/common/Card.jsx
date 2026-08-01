function Card({
  children,
  title,
  subtitle,
  action,
  footer,
  className = "",
  contentClassName = "",
  hover = true,
  padding = "p-6",
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`
        group
        bg-[#111827]
        rounded-2xl
        border
        border-slate-800
        shadow-lg
        transition-all
        duration-300
        ${padding}
        ${
          hover
            ? `
            hover:border-blue-500/30
            hover:shadow-blue-500/10
            hover:-translate-y-1
            `
            : ""
        }
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {/* Header */}

      {(title || action) && (
        <div className="flex items-start justify-between mb-6">

          <div>

            {title && (
              <h2 className="text-xl font-semibold text-white">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="text-sm text-slate-400 mt-1">
                {subtitle}
              </p>
            )}

          </div>

          {action}

        </div>
      )}

      {/* Content */}

      <div className={contentClassName}>
        {children}
      </div>

      {/* Footer */}

      {footer && (
        <div className="mt-6 border-t border-slate-700 pt-4">
          {footer}
        </div>
      )}
    </div>
  );
}

export default Card;