import Button from "./Button";

function PageHeader({
  title,
  subtitle,
  buttonText,
  onButtonClick,
  buttonIcon,
  children,
}) {
  return (
    <div
      className="
      flex
      flex-col
      md:flex-row
      md:items-center
      md:justify-between
      gap-6
      mb-8
      "
    >
      {/* Left */}

      <div>

        <h1 className="text-3xl md:text-4xl font-bold text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="text-slate-400 mt-2 text-base">
            {subtitle}
          </p>
        )}

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

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