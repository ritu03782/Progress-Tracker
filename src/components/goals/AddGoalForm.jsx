import { useState } from "react";
import FormField from "../common/FormField";
import Button from "../common/Button";
import { goalIconOptions } from "../../utils/iconOptions";
import { inputClass } from "../../utils/formStyles";

// Same form for both "Add New Goal" and "Edit Goal" — pass an existing
// `goal` to pre-fill and switch into edit mode. In edit mode, progressType
// and the milestone/target-creation controls are hidden: milestones are
// only ever changed via the checkboxes in the drawer (re-submitting the
// list here would wipe completion data), and switching progress-tracking
// style after creation isn't something the app supports.
function AddGoalForm({ goal, onSubmit, onCancel }) {
  const isEditMode = Boolean(goal);
  const initialIcon = isEditMode
    ? goalIconOptions.find((opt) => opt.label === goal.iconLabel) || goalIconOptions[0]
    : goalIconOptions[0];

  const [title, setTitle] = useState(goal?.title || "");
  const [description, setDescription] = useState(goal?.description || "");
  const [deadline, setDeadline] = useState(goal?.deadline ? String(goal.deadline).slice(0, 10) : "");
  const [progressType, setProgressType] = useState("counter");
  const [target, setTarget] = useState(goal?.target ?? 10);
  const [unitLabel, setUnitLabel] = useState(goal?.unitLabel || "tasks completed");
  const [milestonesText, setMilestonesText] = useState("");
  const [notes, setNotes] = useState(goal?.notes || "");
  const [selectedIcon, setSelectedIcon] = useState(initialIcon);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !deadline) return;

    const base = {
      title: title.trim(),
      description: description.trim() || "New goal",
      iconLabel: selectedIcon.label,
      icon: selectedIcon.icon,
      color: selectedIcon.color,
      bg: selectedIcon.bg,
      deadline,
      notes: notes.trim(),
    };

    if (isEditMode) {
      onSubmit({
        ...base,
        unitLabel: unitLabel.trim() || goal.unitLabel,
        ...(goal.progressType === "counter" ? { target: Number(target) || goal.target } : {}),
      });
      return;
    }

    if (progressType === "milestones") {
      const milestones = milestonesText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((titleText, index) => ({ id: index + 1, title: titleText, completed: false }));

      onSubmit({ ...base, progressType, unitLabel: "milestones completed", milestones });
    } else {
      onSubmit({ ...base, progressType, unitLabel: unitLabel.trim() || "completed", current: 0, target: Number(target) || 1 });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Goal Title">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Get an Internship" className={inputClass} required />
      </FormField>

      <FormField label="Description">
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" className={inputClass} />
      </FormField>

      <FormField label="Deadline">
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className={inputClass} required />
      </FormField>

      <FormField label="Notes">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any notes for this goal..."
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </FormField>

      <FormField label="Icon">
        <div className="grid grid-cols-5 gap-2">
          {goalIconOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = opt.label === selectedIcon.label;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => setSelectedIcon(opt)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition ${opt.bg} ${isSelected ? "ring-2 ring-blue-500" : "hover:opacity-80"}`}
              >
                <Icon className={opt.color} />
              </button>
            );
          })}
        </div>
      </FormField>

      {!isEditMode && (
        <FormField label="How should progress be tracked?">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setProgressType("counter")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium border cursor-pointer transition ${progressType === "counter" ? "bg-blue-600 border-blue-600 text-white" : "bg-slate-800 border-slate-700 text-slate-300"}`}
            >
              Counter (e.g. 3/10)
            </button>
            <button
              type="button"
              onClick={() => setProgressType("milestones")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium border cursor-pointer transition ${progressType === "milestones" ? "bg-blue-600 border-blue-600 text-white" : "bg-slate-800 border-slate-700 text-slate-300"}`}
            >
              Milestone Checklist
            </button>
          </div>
        </FormField>
      )}

      {!isEditMode && progressType === "counter" && (
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Target Number">
            <input type="number" min="1" value={target} onChange={(e) => setTarget(e.target.value)} className={inputClass} />
          </FormField>
          <FormField label="Unit Label">
            <input type="text" value={unitLabel} onChange={(e) => setUnitLabel(e.target.value)} placeholder="e.g. problems solved" className={inputClass} />
          </FormField>
        </div>
      )}

      {!isEditMode && progressType === "milestones" && (
        <FormField label="Milestones (one per line)">
          <textarea
            value={milestonesText}
            onChange={(e) => setMilestonesText(e.target.value)}
            rows={4}
            placeholder={"Build resume\nApply to companies\nClear interviews"}
            className={`${inputClass} resize-none`}
          />
        </FormField>
      )}

      {isEditMode && goal.progressType === "counter" && (
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Target Number">
            <input type="number" min="1" value={target} onChange={(e) => setTarget(e.target.value)} className={inputClass} />
          </FormField>
          <FormField label="Unit Label">
            <input type="text" value={unitLabel} onChange={(e) => setUnitLabel(e.target.value)} className={inputClass} />
          </FormField>
        </div>
      )}

      {isEditMode && goal.progressType === "milestones" && (
        <FormField label="Unit Label">
          <input type="text" value={unitLabel} onChange={(e) => setUnitLabel(e.target.value)} className={inputClass} />
        </FormField>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" className="flex-1 justify-center" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary" className="flex-1 justify-center">
          {isEditMode ? "Save Changes" : "Add Goal"}
        </Button>
      </div>
    </form>
  );
}
export default AddGoalForm;
