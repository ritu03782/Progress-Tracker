import { useState } from "react";
import Card from "../common/Card";
import ProgressBar from "../common/ProgressBar";
import Button from "../common/Button";
import { FaFlag, FaArrowRight, FaPlus, FaTimes } from "react-icons/fa";
import { TOPIC_OPTIONS } from "../../config/dsaOptions";
import { inputClass } from "../../utils/formStyles";

function WeakTopics({
  topics = [],
  onViewAll,
  className = "",
  onPractice,
  onAddTopic,
  onRemoveTopic,
}) {
  const [newTopic, setNewTopic] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTopic.trim()) return;
    onAddTopic?.(newTopic.trim());
    setNewTopic("");
  };

  return (
    <Card
      padding="p-6"
      hover={false}
      title={
        <span className="flex items-center gap-2">
          <FaFlag className="text-red-500" />
          Weak Topics
        </span>
      }
      action={
        <button
          type="button"
          onClick={onViewAll}
          className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
        >
          View All
        </button>
      }
      footer={
        <button
          type="button"
          onClick={onPractice}
          className="mx-auto flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
        >
          Practice Weak Topics
          <FaArrowRight className="text-xs" />
        </button>
      }
      className={`h-full ${className}`}
    >
      {/* Mark a topic as weak — choose a suggestion or type any custom topic */}
      {onAddTopic && (
        <form onSubmit={handleAdd} className="flex gap-2 mb-4">
          <input
            type="text"
            list="weak-topic-options"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            placeholder="Mark a topic as weak..."
            className={`${inputClass} flex-1`}
          />
          <datalist id="weak-topic-options">
            {TOPIC_OPTIONS.map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
          <Button type="submit" variant="secondary" className="px-3" aria-label="Add weak topic">
            <FaPlus className="text-xs" />
          </Button>
        </form>
      )}

      <div className="space-y-4">
        {topics.length === 0 && (
          <p className="py-4 text-center text-sm text-slate-500">
            No weak topics marked yet.
          </p>
        )}

        {topics.map((topic) => {
          const Icon = topic.icon;
          const percent = topic.total > 0 ? Math.round((topic.solved / topic.total) * 100) : 0;

          return (
            <div key={topic.id} className="flex items-center gap-4">
              <Icon
                className="shrink-0 text-base"
                style={{ color: topic.color }}
              />

              <span className="w-32 shrink-0 truncate text-sm text-slate-200">
                {topic.name}
              </span>

              <ProgressBar
                value={percent}
                color={topic.color}
                className="flex-1"
              />

              <span className="w-14 shrink-0 text-right text-sm text-slate-400">
                {topic.solved}/{topic.total}
              </span>

              <span className="w-11 shrink-0 text-right text-sm font-medium text-slate-200">
                {percent}%
              </span>

              {onRemoveTopic && (
                <button
                  type="button"
                  onClick={() => onRemoveTopic(topic.id)}
                  aria-label={`Remove ${topic.name} from weak topics`}
                  className="shrink-0 text-slate-500 hover:text-red-400 transition cursor-pointer"
                >
                  <FaTimes className="text-xs" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default WeakTopics;
