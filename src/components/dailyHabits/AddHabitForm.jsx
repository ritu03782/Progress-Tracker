import { useState } from "react";
import FormField from "../common/FormField";
import Button from "../common/Button";
import { habitIconOptions } from "../../utils/iconOptions";
import { inputClass } from "../../utils/formStyles";

// Same form for both "Add New Habit" and "Edit Habit" — pass an existing
// `habit` to pre-fill and switch into edit mode.
function AddHabitForm({ habit, onSubmit, onCancel }) {
  const isEditMode = Boolean(habit);
  const initialIcon = isEditMode
    ? habitIconOptions.find((opt) => opt.label === habit.iconLabel) || habitIconOptions[0]
    : habitIconOptions[0];

  const [title, setTitle] = useState(habit?.title || "");
  const [description, setDescription] = useState(habit?.description || "");
  const [category, setCategory] = useState(habit?.category || "General");
  const [target, setTarget] = useState(habit?.target || "");
  const [reminder, setReminder] = useState(habit?.reminder || "8:00 AM");
  const [notes, setNotes] = useState(habit?.notes || "");
  const [selectedIcon, setSelectedIcon] = useState(initialIcon);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      icon: selectedIcon.icon,
      iconLabel: selectedIcon.label,
      title: title.trim(),
      description: description.trim() || "New habit",
      category,
      completed: false,
      progress: 0,
      streak: 0,
      completionRate: 0,
      reminder,
      target: target.trim() || "1x / day",
      notes: notes.trim(),
      skipReason: "",
      history: [false, false, false, false, false, false, false],
      color: selectedIcon.color,
      bg: selectedIcon.bg,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Habit Title">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Meditation" className={inputClass} required />
      </FormField>

      <FormField label="Description">
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" className={inputClass} />
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Category">
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass} />
        </FormField>
        <FormField label="Reminder Time">
          <input type="text" value={reminder} onChange={(e) => setReminder(e.target.value)} placeholder="e.g. 7:00 PM" className={inputClass} />
        </FormField>
      </div>

      <FormField label="Daily Target">
        <input type="text" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="e.g. 30 minutes" className={inputClass} />
      </FormField>

      <FormField label="Notes">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any extra notes for this habit..."
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </FormField>

      <FormField label="Icon">
        <div className="grid grid-cols-4 gap-2">
          {habitIconOptions.map((opt) => {
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

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" className="flex-1 justify-center" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary" className="flex-1 justify-center">
          {isEditMode ? "Save Changes" : "Add Habit"}
        </Button>
      </div>
    </form>
  );
}
export default AddHabitForm;
