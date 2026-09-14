import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import FormField from "../common/FormField";
import Button from "../common/Button";
import { inputClass } from "../../utils/formStyles";

// Converts an Upcoming contest into a Participated one (or corrects an
// already-logged result — same form either way). solved/totalProblems
// are NOT collected here — they're computed from the problems checklist
// on the backend, so there's nothing to keep in sync.
function LogResultForm({ contest, onSubmit, onCancel }) {
  const [rank, setRank] = useState(contest.rank ?? "");
  const [totalParticipants, setTotalParticipants] = useState(contest.totalParticipants ?? "");
  const [ratingChange, setRatingChange] = useState(contest.ratingChange ?? "");
  const [score, setScore] = useState(contest.score ?? "");
  const [penalty, setPenalty] = useState(contest.penalty ?? "");
  const [percentage, setPercentage] = useState(contest.percentage ?? "");
  const [notes, setNotes] = useState(contest.notes || "");
  const [problemRows, setProblemRows] = useState(
    contest.problems?.length ? contest.problems.map((p) => ({ label: p.label, name: p.name, points: p.points, solved: p.solved })) : [{ label: "", name: "", points: "", solved: false }]
  );

  const updateRow = (index, field, value) => {
    setProblemRows((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  };
  const addRow = () => setProblemRows((prev) => [...prev, { label: "", name: "", points: "", solved: false }]);
  const removeRow = (index) => setProblemRows((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();

    const problems = problemRows
      .filter((row) => row.label.trim() || row.name.trim())
      .map((row) => ({ label: row.label.trim(), name: row.name.trim(), points: Number(row.points) || 0, solved: row.solved }));

    onSubmit({
      rank: rank === "" ? null : Number(rank),
      totalParticipants: totalParticipants === "" ? null : Number(totalParticipants),
      ratingChange: ratingChange === "" ? null : Number(ratingChange),
      score: score === "" ? null : Number(score),
      penalty: penalty === "" ? null : Number(penalty),
      percentage: percentage === "" ? null : Number(percentage),
      notes: notes.trim(),
      problems,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Rank">
          <input type="number" min="0" value={rank} onChange={(e) => setRank(e.target.value)} placeholder="e.g. 563" className={inputClass} />
        </FormField>
        <FormField label="Total Participants">
          <input type="number" min="0" value={totalParticipants} onChange={(e) => setTotalParticipants(e.target.value)} placeholder="e.g. 12345" className={inputClass} />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Rating Change">
          <input type="number" value={ratingChange} onChange={(e) => setRatingChange(e.target.value)} placeholder="e.g. 42 or -18" className={inputClass} />
        </FormField>
        <FormField label="Score">
          <input type="number" min="0" value={score} onChange={(e) => setScore(e.target.value)} className={inputClass} />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Penalty">
          <input type="number" min="0" value={penalty} onChange={(e) => setPenalty(e.target.value)} className={inputClass} />
        </FormField>
        <FormField label="Percentage">
          <input type="number" min="0" max="100" step="0.01" value={percentage} onChange={(e) => setPercentage(e.target.value)} placeholder="e.g. 72.45" className={inputClass} />
        </FormField>
      </div>

      <FormField label="Problems">
        <div className="space-y-2">
          {problemRows.map((row, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={row.label}
                onChange={(e) => updateRow(index, "label", e.target.value)}
                placeholder="A"
                className={`${inputClass} w-14 shrink-0`}
              />
              <input
                type="text"
                value={row.name}
                onChange={(e) => updateRow(index, "name", e.target.value)}
                placeholder="Problem name"
                className={`${inputClass} flex-1`}
              />
              <input
                type="number"
                min="0"
                value={row.points}
                onChange={(e) => updateRow(index, "points", e.target.value)}
                placeholder="Pts"
                className={`${inputClass} w-20 shrink-0`}
              />
              <label className="flex items-center gap-1.5 shrink-0 text-xs text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={row.solved}
                  onChange={(e) => updateRow(index, "solved", e.target.checked)}
                  className="cursor-pointer"
                />
                Solved
              </label>
              {problemRows.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRow(index)}
                  aria-label="Remove problem"
                  className="shrink-0 text-slate-500 hover:text-red-400 transition cursor-pointer"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addRow}
          className="mt-2 flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 cursor-pointer"
        >
          <FaPlus className="text-[10px]" /> Add Problem
        </button>
      </FormField>

      <FormField label="Notes">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="What went well, what to improve..."
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </FormField>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" className="flex-1 justify-center" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary" className="flex-1 justify-center">Save Result</Button>
      </div>
    </form>
  );
}
export default LogResultForm;
