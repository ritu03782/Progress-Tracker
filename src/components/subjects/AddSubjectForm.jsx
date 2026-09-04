import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import FormField from "../common/FormField";
import Button from "../common/Button";
import { subjectIconOptions } from "../../utils/iconOptions";
import { inputClass } from "../../utils/formStyles";

// Same form for both "Add New Subject" and "Edit Subject" — pass an
// existing `subject` to pre-fill and switch into edit mode. In edit mode
// the Topics field is hidden: re-submitting a topic list would wipe
// completion/progress data already tracked per topic, so topics are only
// ever changed via the checkboxes (and the link button) in the drawer,
// never here.
function AddSubjectForm({ subject, onSubmit, onCancel }) {
  const isEditMode = Boolean(subject);
  const initialIcon = isEditMode
    ? subjectIconOptions.find((opt) => opt.label === subject.iconLabel) || subjectIconOptions[0]
    : subjectIconOptions[0];

  const [name, setName] = useState(subject?.name || "");
  const [description, setDescription] = useState(subject?.description || "");
  const [dailyTarget, setDailyTarget] = useState(subject?.dailyTarget || "1 Topic / day");
  const [studyHours, setStudyHours] = useState(subject?.studyHours ?? 0);
  const [streak, setStreak] = useState(subject?.streak ?? 0);
  const [notes, setNotes] = useState(subject?.notes || "");
  const [topicRows, setTopicRows] = useState([{ name: "", link: "" }]);
  const [selectedIcon, setSelectedIcon] = useState(initialIcon);

  const updateTopicRow = (index, field, value) => {
    setTopicRows((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  };
  const addTopicRow = () => setTopicRows((prev) => [...prev, { name: "", link: "" }]);
  const removeTopicRow = (index) => setTopicRows((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const topics = topicRows
      .map((row, index) => ({ id: index + 1, name: row.name.trim(), link: row.link.trim(), completed: false, progress: 0 }))
      .filter((row) => row.name);

    onSubmit({
      name: name.trim(),
      description: description.trim() || "New subject",
      iconLabel: selectedIcon.label,
      icon: selectedIcon.icon,
      color: selectedIcon.color,
      bg: selectedIcon.bg,
      dailyTarget,
      studyHours: Number(studyHours) || 0,
      streak: Number(streak) || 0,
      notes: notes.trim(),
      topics,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Subject Name">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Compiler Design" className={inputClass} required />
      </FormField>

      <FormField label="Description">
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" className={inputClass} />
      </FormField>

      <FormField label="Daily Target">
        <input type="text" value={dailyTarget} onChange={(e) => setDailyTarget(e.target.value)} className={inputClass} />
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Study Hours">
          <input type="number" min="0" step="0.5" value={studyHours} onChange={(e) => setStudyHours(e.target.value)} className={inputClass} />
        </FormField>
        <FormField label="Streak (days)">
          <input type="number" min="0" step="1" value={streak} onChange={(e) => setStreak(e.target.value)} className={inputClass} />
        </FormField>
      </div>

      <FormField label="Notes">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any study notes for this subject..."
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </FormField>

      {!isEditMode && (
        <FormField label="Topics">
          <div className="space-y-2">
            {topicRows.map((row, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={row.name}
                  onChange={(e) => updateTopicRow(index, "name", e.target.value)}
                  placeholder="Topic name"
                  className={`${inputClass} flex-1`}
                />
                <input
                  type="url"
                  value={row.link}
                  onChange={(e) => updateTopicRow(index, "link", e.target.value)}
                  placeholder="Practice link (optional)"
                  className={`${inputClass} flex-1`}
                />
                {topicRows.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTopicRow(index)}
                    aria-label="Remove topic"
                    className="shrink-0 px-2 text-slate-500 hover:text-red-400 transition cursor-pointer"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addTopicRow}
            className="mt-2 flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 cursor-pointer"
          >
            <FaPlus className="text-[10px]" /> Add Topic
          </button>
        </FormField>
      )}

      <FormField label="Icon">
        <div className="grid grid-cols-6 gap-2">
          {subjectIconOptions.map((opt) => {
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
          {isEditMode ? "Save Changes" : "Add Subject"}
        </Button>
      </div>
    </form>
  );
}
export default AddSubjectForm;
