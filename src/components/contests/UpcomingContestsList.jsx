import { FaArrowRight } from "react-icons/fa";
import Card from "../common/Card";
import UpcomingContestRow from "./UpcomingContestRow";

function UpcomingContestsList({ contests, onView, onViewAll }) {
  if (contests.length === 0) return null;

  return (
    <Card
      hover={false}
      title="Upcoming Contests"
      action={
        <button
          type="button"
          onClick={onViewAll}
          className="flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
        >
          View All <FaArrowRight className="text-xs" />
        </button>
      }
    >
      <div className="space-y-3">
        {contests.map((contest) => (
          <UpcomingContestRow key={contest.id} contest={contest} onView={onView} />
        ))}
      </div>
    </Card>
  );
}
export default UpcomingContestsList;