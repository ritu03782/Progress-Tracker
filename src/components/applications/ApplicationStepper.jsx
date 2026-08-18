import { FaCheck } from "react-icons/fa";

function ApplicationStepper({ timeline }) {
  const stages = ["Applied", "OA", "Interview", "Offer"];

  return (
    <div className="flex items-center">
      {stages.map((stage, index) => {
        const entry = timeline.find((t) => t.stage === stage);
        const isCompleted = entry?.completed;
        const isCurrent = entry?.current;

        return (
          <div key={stage} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-9 h-9 rounded-full flex items-center justify-center border-2 shrink-0
                  ${isCompleted ? "bg-green-500 border-green-500 text-white" : isCurrent ? "border-blue-500 text-blue-400" : "border-slate-700 text-slate-600"}
                `}
              >
                {isCompleted ? <FaCheck className="text-xs" /> : <span className="w-2 h-2 rounded-full bg-current" />}
              </div>
              <p className="text-xs text-slate-400 mt-2">{stage}</p>
              <p className="text-[11px] text-slate-600">{entry?.date || "--"}</p>
            </div>
            {index < stages.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 ${isCompleted ? "bg-green-500" : "bg-slate-700"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
export default ApplicationStepper;