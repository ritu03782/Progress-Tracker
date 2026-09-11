import { useState } from "react";
import FormField from "../common/FormField";
import Button from "../common/Button";
import { projectIconOptions } from "../../utils/iconOptions";
import { inputClass } from "../../utils/formStyles";

const STATUS_OPTIONS = ["Planned", "In Progress", "Completed"];

// Same form for both "Add New Project" and "Edit Project" — pass an
// existing `project` to pre-fill and switch into edit mode. In edit mode
// the Tasks field is hidden: re-submitting a task list would wipe
// completion data already tracked per task, so tasks are only ever
// changed via the checkboxes in the drawer, never here.
function AddProjectForm({ project, onSubmit, onCancel }) {
  const isEditMode = Boolean(project);
  const initialIcon = isEditMode
    ? projectIconOptions.find((opt) => opt.label === project.iconLabel) || projectIconOptions[0]
    : projectIconOptions[0];

  const [name, setName] = useState(project?.name || "");
  const [description, setDescription] = useState(project?.description || "");
  const [status, setStatus] = useState(project?.status || "Planned");
  const [techText, setTechText] = useState((project?.technologies || []).join(", "));
  const [tasksText, setTasksText] = useState("");
  const [repoUrl, setRepoUrl] = useState(project?.repoUrl || "");
  const [notes, setNotes] = useState(project?.notes || "");
  const [selectedIcon, setSelectedIcon] = useState(initialIcon);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const technologies = techText.split(",").map((t) => t.trim()).filter(Boolean);

    const base = {
      name: name.trim(),
      description: description.trim() || "New project",
      iconLabel: selectedIcon.label,
      icon: selectedIcon.icon,
      color: selectedIcon.color,
      bg: selectedIcon.bg,
      status,
      technologies,
      repoUrl: repoUrl.trim(),
      notes: notes.trim(),
    };

    if (isEditMode) {
      onSubmit(base);
      return;
    }

    const tasks = tasksText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((title, index) => ({ id: index + 1, title, completed: false }));

    onSubmit({ ...base, tasks });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Project Name">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Weather App" className={inputClass} required />
      </FormField>

      <FormField label="Description">
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" className={inputClass} />
      </FormField>

      <FormField label="Status">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputClass}>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </FormField>

      <FormField label="Technologies (comma separated)">
        <input type="text" value={techText} onChange={(e) => setTechText(e.target.value)} placeholder="React, Tailwind CSS, Vite" className={inputClass} />
      </FormField>

      {!isEditMode && (
        <FormField label="Tasks (one per line)">
          <textarea
            value={tasksText}
            onChange={(e) => setTasksText(e.target.value)}
            rows={4}
            placeholder={"Setup project\nBuild UI\nConnect API\nDeploy"}
            className={`${inputClass} resize-none`}
          />
        </FormField>
      )}

      <FormField label="Repository URL">
        <input type="url" value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)} placeholder="https://github.com/..." className={inputClass} />
      </FormField>

      <FormField label="Notes">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any notes for this project..."
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </FormField>

      <FormField label="Icon">
        <div className="grid grid-cols-5 gap-2">
          {projectIconOptions.map((opt) => {
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
          {isEditMode ? "Save Changes" : "Add Project"}
        </Button>
      </div>
    </form>
  );
}
export default AddProjectForm;
