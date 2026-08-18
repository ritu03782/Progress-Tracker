import { useState } from "react";
import FormField from "../common/FormField";
import Button from "../common/Button";
import { subjectIconOptions } from "../../utils/iconOptions";
import { inputClass } from "../../utils/formStyles";

function AddSubjectForm({ onSubmit, onCancel }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dailyTarget, setDailyTarget] = useState("1 Topic / day");
  const [topicsText, setTopicsText] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(subjectIconOptions[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const topics = topicsText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((topicName, index) => ({
        id: index + 1,
        name: topicName,
        completed: false,
        progress: 0,
      }));

    onSubmit({
      id: name.trim().toLowerCase().replace(/\s+/g, "-"),
      name: name.trim(),
      description: description.trim() || "New subject",
      icon: selectedIcon.icon,
      color: selectedIcon.color,
      bg: selectedIcon.bg,
      barColor: `linear-gradient(90deg,${selectedIcon.hex},${selectedIcon.hex}aa)`,
      streak: 0,
      studyHours: 0,
      lastStudied: "Not started",
      dailyTarget,
      notes: "",
      resources: [],
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

      <FormField label="Topics (one per line)">
        <textarea
          value={topicsText}
          onChange={(e) => setTopicsText(e.target.value)}
          rows={5}
          placeholder={"ER Model\nRelational Model\nNormalization\nIndexing"}
          className={`${inputClass} resize-none`}
        />
      </FormField>

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
        <Button type="submit" variant="primary" className="flex-1 justify-center">Add Subject</Button>
      </div>
    </form>
  );
}
export default AddSubjectForm;