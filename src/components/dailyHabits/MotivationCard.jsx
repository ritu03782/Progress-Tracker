import Card from "../common/Card";
import ProgressBar from "../common/ProgressBar";
import getMotivation from "../../utils/getMotivation";

function MotivationCard({ completed, total }) {
  const percentage = Math.round((completed / total) * 100);
  const remaining = total - completed;

  const motivation = getMotivation(completed, total);

  return (
    <Card
      hover={false}
      padding="p-5"
      className="
      relative
      overflow-hidden

      bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,.18),transparent_25%),linear-gradient(135deg,#241631_0%,#161D30_55%,#111827_100%)]
      "
    >
      {/* Glow */}

      <div
        className="
        absolute
        top-0
        right-0
        w-48
        h-48
        bg-orange-500/10
        rounded-full
        blur-[80px]
        pointer-events-none
        "
      />

      <div className="relative z-10">

        {/* Header */}

        <div className="flex justify-between items-start">

          <div>

            <h2
              className={`
              text-xl
              font-semibold
              leading-snug
              ${motivation.color}
              `}
            >
              {motivation.emoji} {motivation.title}
            </h2>

            <p className="mt-2 text-md text-slate-400">
              {completed} / {total} Habits Completed Today
            </p>

          </div>

          {/* Emoji */}

          <div
            className="
            text-6xl
            drop-shadow-[0_0_25px_rgba(251,191,36,.35)]
            select-none
            "
          >
            {motivation.emoji}
          </div>

        </div>

        {/* Progress */}

        <div className="mt-5 flex items-center gap-3">

          <ProgressBar
            value={percentage}
            color={motivation.progressColor}
            className="flex-1"
            height="h-2.5"
          />

          <span
            className="font-bold text-green-400 text-lg"
          >
            {percentage}%
          </span>

        </div>

        {/* Footer */}

        <p
          className="
          mt-3
          text-md
          text-slate-400
          "
        >
          {remaining > 0 ? (
            <>
              Keep going! Just{" "}
              <span className="text-white font-medium">
                {remaining}
              </span>{" "}
              habit{remaining > 1 ? "s" : ""} left to finish today's streak.
            </>
          ) : (
            <>
              Amazing! You've completed every habit today.
            </>
          )}
        </p>

      </div>

    </Card>
  );
}

export default MotivationCard;
