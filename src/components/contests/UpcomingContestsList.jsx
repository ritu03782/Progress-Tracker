import Card from "../common/Card";
import UpcomingContestRow from "./UpcomingContestRow";

// No "View All" button here — this list already renders every contest
// it's given, with nothing truncated for a "View All" to reveal.
function UpcomingContestsList({ contests, onView }) {
  if (contests.length === 0) return null;

  return (
    <Card hover={false} title="Upcoming Contests">
      <div className="space-y-3">
        {contests.map((contest) => (
          <UpcomingContestRow key={contest.id} contest={contest} onView={onView} />
        ))}
      </div>
    </Card>
  );
}
export default UpcomingContestsList;
