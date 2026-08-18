import { useState } from "react";
import FormField from "../common/FormField";
import Button from "../common/Button";
import { inputClass } from "../../utils/formStyles";
import { platformOptions } from "../../utils/platformOptions";
import { TOPIC_OPTIONS, DIFFICULTY_OPTIONS, STATUS_OPTIONS } from "../../config/dsaOptions";

function AddProblemForm({ onSubmit, onCancel }) {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState(TOPIC_OPTIONS[0]);
  const [difficulty, setDifficulty] = useState(DIFFICULTY_OPTIONS[0]);
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [selectedPlatform, setSelectedPlatform] = useState(platformOptions[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
      difficulty,
      topic,
      platform: selectedPlatform.label,
      platformIcon: selectedPlatform.icon,
      platformColor: selectedPlatform.color,
      status,
      lastSolved: status === "Solved" ? "Today" : "—",
      lastRevision: "—",
      favourite: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Problem Name">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Valid Parentheses"
          className={inputClass}
          required
        />
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Topic">
          <select value={topic} onChange={(e) => setTopic(e.target.value)} className={inputClass}>
            {TOPIC_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </FormField>
        <FormField label="Difficulty">
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className={inputClass}>
            {DIFFICULTY_OPTIONS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Status">
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputClass}>
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </FormField>
        <FormField label="Platform">
          <select
            value={selectedPlatform.label}
            onChange={(e) => setSelectedPlatform(platformOptions.find((p) => p.label === e.target.value))}
            className={inputClass}
          >
            {platformOptions.map((p) => <option key={p.label} value={p.label}>{p.label}</option>)}
          </select>
        </FormField>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" className="flex-1 justify-center" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary" className="flex-1 justify-center">Add Problem</Button>
      </div>
    </form>
  );
}
export default AddProblemForm;