import { FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import Card from "../common/Card";
import { formatDeadline } from "../../utils/goalStats";

function CompletedGoals({ goals }) {
  if (!goals || goals.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-4">Completed Goals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {goals.map((goal) => (
          <Card key={goal.id} hover={false} className="bg-slate-950">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-500 text-xl shrink-0" />
                <div>
                  <h3 className="text-white font-medium">{goal.title}</h3>
                  <p className="text-sm text-slate-400 mt-0.5">{goal.description}</p>
                </div>
              </div>
              <span className="text-green-400 font-bold shrink-0">100%</span>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
              <FaCalendarAlt /> {formatDeadline(goal.completedDate)}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default CompletedGoals;