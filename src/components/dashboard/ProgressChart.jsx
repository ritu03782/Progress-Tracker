import Card from "../common/Card";
import ProgressRing from "../common/ProgressRing";
import { getOverallStats, getSubjectProgress } from "../../utils/subjectStats";

// The Week/Month/Year view selector from the original mock is gone — it
// had state but nothing behind it (no historical progress snapshots exist
// to switch between), so it was a decorative control that did nothing.
function ProgressChart({ subjects }) {
  const { overallProgress } = getOverallStats(subjects);

  return (
    <Card
      title="📊 Progress Overview"
      subtitle="Track your learning progress across different subjects"
      contentClassName="flex flex-col lg:flex-row items-center gap-10"
      footer={
        <p className="text-sm text-slate-400">
          🚀 Great progress! Stay consistent and you'll reach your placement
          goal.
        </p>
      }
      action={
        <span
          className="
            px-4
            py-1.5
            rounded-full
            bg-blue-500/15
            border
            border-blue-500/30
            text-blue-400
            text-sm
            font-medium
          "
        >
          {overallProgress}% Overall
        </span>
      }
    >
      {/* Left */}
      <ProgressRing
        value={overallProgress}
        color="#3B82F6"
        className="w-56 h-56 xl:w-60 xl:h-60 flex-shrink:0"
      >
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-5xl font-bold text-white">
            {overallProgress}%
          </h2>

          <p className="text-slate-400 mt-1">Overall Progress</p>

          <span
            className="
              mt-4
              px-3
              py-1
              rounded-full
              bg-green-500/15
              text-green-400
              text-xs
            "
          >
            🚀 On Track
          </span>
        </div>
      </ProgressRing>

      {/* Right */}
      <div className="flex-1 w-full">
        {subjects.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-6">
            Add a subject to see its progress here.
          </p>
        ) : (
          <div className="space-y-5">
            {subjects.map((subject) => {
              const progress = getSubjectProgress(subject);
              return (
                <div key={subject.id}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: subject.hex }}
                      />
                      <span className="text-slate-200 font-medium">
                        {subject.name}
                      </span>
                    </div>

                    <span className="font-semibold" style={{ color: subject.hex }}>
                      {progress}%
                    </span>
                  </div>

                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 hover:brightness-125"
                      style={{
                        width: `${progress}%`,
                        background: `linear-gradient(90deg, ${subject.hex}, #60A5FA)`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
}

export default ProgressChart;
