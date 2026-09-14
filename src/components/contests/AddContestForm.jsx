import { useState } from "react";
import FormField from "../common/FormField";
import Button from "../common/Button";
import { inputClass } from "../../utils/formStyles";
import { platformOptions } from "../../utils/platformOptions";

const TYPE_OPTIONS = ["Rated", "Unrated"];

// Same form for both "Add New Contest" and "Edit Contest". Status/results
// are never touched here — those only change via the dedicated Log Result
// flow in the drawer.
function AddContestForm({ contest, onSubmit, onCancel }) {
  const isEditMode = Boolean(contest);

  const [name, setName] = useState(contest?.name || "");
  const [platform, setPlatform] = useState(contest?.platform || platformOptions[0].label);
  const [type, setType] = useState(contest?.type || "Rated");
  const [date, setDate] = useState(contest?.date || "");
  const [startTime, setStartTime] = useState(contest?.startTime || "");
  const [duration, setDuration] = useState(contest?.duration || "");
  const [registrationLink, setRegistrationLink] = useState(contest?.registrationLink || "");
  const [notes, setNotes] = useState(contest?.notes || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !date) return;

    onSubmit({
      name: name.trim(),
      platform,
      type,
      date,
      startTime: startTime.trim() || "TBD",
      duration: duration.trim() || "TBD",
      registrationLink: registrationLink.trim(),
      notes: notes.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Contest Name">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Codeforces Round #951" className={inputClass} required />
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Platform">
          <select value={platform} onChange={(e) => setPlatform(e.target.value)} className={inputClass}>
            {platformOptions.map((p) => <option key={p.label} value={p.label}>{p.label}</option>)}
          </select>
        </FormField>
        <FormField label="Type">
          <select value={type} onChange={(e) => setType(e.target.value)} className={inputClass}>
            {TYPE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </FormField>
      </div>

      <FormField label="Date">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} required />
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Start Time">
          <input type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)} placeholder="e.g. 8:30 PM IST" className={inputClass} />
        </FormField>
        <FormField label="Duration">
          <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 2h 15m" className={inputClass} />
        </FormField>
      </div>

      <FormField label="Registration Link">
        <input type="url" value={registrationLink} onChange={(e) => setRegistrationLink(e.target.value)} placeholder="https://..." className={inputClass} />
      </FormField>

      <FormField label="Notes">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any notes about this contest..."
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </FormField>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" className="flex-1 justify-center" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary" className="flex-1 justify-center">
          {isEditMode ? "Save Changes" : "Add Contest"}
        </Button>
      </div>
    </form>
  );
}
export default AddContestForm;
