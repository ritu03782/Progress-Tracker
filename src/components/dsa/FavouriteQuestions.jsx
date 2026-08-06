import Card from "../common/Card";
import FavouriteItem from "./FavouriteItem";

function FavouriteQuestions({ questions = [], className = "",onViewAll }) {
  return (
    <Card
      padding="p-6"
      hover={false}
      title="Favourite Questions"
      action={
        <button
          type="button"
          onClick={onViewAll}
          className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
        >
          View All
        </button>
      }
      className={`h-full ${className}`}
    >
      <div className="divide-y divide-slate-800/70">
        {questions.map((question) => (
          <FavouriteItem key={question.id} question={question} />
        ))}
      </div>
    </Card>
  );
}

export default FavouriteQuestions;
