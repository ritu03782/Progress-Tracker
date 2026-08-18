import { useState } from "react";
import FormField from "../common/FormField";
import Button from "../common/Button";
import { goalIconOptions } from "../../utils/iconOptions";
import { inputClass } from "../../utils/formStyles";

function AddGoalForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [progressType, setProgressType] = useState("counter");
  const [target, setTarget] = useState(10);
  const [unitLabel, setUnitLabel] = useState("tasks completed");
  const [milestonesText, setMilestonesText] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(goalIconOptions[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !deadline) return;

    const base = {
      id: title.trim().toLowerCase().replace(/\s+/g, "-"),
      title: title.trim(),
      description: description.trim() || "New goal",
      icon: selectedIcon.icon,
      color: selectedIcon.color,
      bg: selectedIcon.bg,
      barColor: `linear-gradient(90deg,${selectedIcon.hex},${selectedIcon.hex}aa)`,
      hex: selectedIcon.hex,
      deadline,
      progressType,
      notes: "",
    };

    if (progressType === "milestones") {
      const milestones = milestonesText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((titleText, index) => ({ id: index + 1, title: titleText, completed: false }));

      onSubmit({ ...base, unitLabel: "milestones completed", milestones });
    } else {
      onSubmit({ ...base, unitLabel: unitLabel.trim() || "completed", current: 0, target: Number(target) || 1 });
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

      {progressType === "counter" ? (
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Target Number">
            <input type="number" min="1" value={target} onChange={(e) => setTarget(e.target.value)} className={inputClass} />
          </FormField>
          <FormField label="Unit Label">
            <input type="text" value={unitLabel} onChange={(e) => setUnitLabel(e.target.value)} placeholder="e.g. problems solved" className={inputClass} />
          </FormField>
        </div>
      ) : (
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

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" className="flex-1 justify-center" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary" className="flex-1 justify-center">Add Goal</Button>
      </div>
    </form>
  );
}
export default AddGoalForm;