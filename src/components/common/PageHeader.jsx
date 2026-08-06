import Button from "./Button";

function PageHeader({
  icon,
  title,
  subtitle,
  buttonText,
  buttonIcon,
  onButtonClick,
  children,
}) {
  return (
    <div
      className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-6
        mb-6
      "
    >
      {/* Left */}

      <div className="flex items-start gap-4">

        {icon && (
          <div
            className="
              w-12
              h-12
              rounded-xl
              bg-violet-500/15
              flex
              items-center
              justify-center
              text-violet-400
              text-xl
              shrink-0
            "
          >
            {icon}
          </div>
        )}

        <div>

          <h1 className="text-3xl font-bold text-white">
            {title}
          </h1>

          {subtitle && (
            <p className="text-slate-400 mt-1">
              {subtitle}
            </p>
          )}

        </div>

      </div>

      {/* Right */}

      <div
        className="
          flex
          flex-wrap
          items-center
          gap-3
        "
      >

        {children}

        {buttonText && (
          <Button
            variant="primary"
            onClick={onButtonClick}
            className="flex items-center gap-2"
          >
            {buttonIcon}

            {buttonText}
          </Button>
        )}

      </div>

    </div>
  );
}

export default PageHeader;