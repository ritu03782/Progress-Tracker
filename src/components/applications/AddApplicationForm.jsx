import { useState } from "react";
import FormField from "../common/FormField";
import Button from "../common/Button";
import { inputClass } from "../../utils/formStyles";

const STATUS_OPTIONS = ["Applied", "OA", "Interview", "Offer", "Rejected"];

function AddApplicationForm({ onSubmit, onCancel }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [appliedDate, setAppliedDate] = useState("");
  const [expectedCTC, setExpectedCTC] = useState("");
  const [jobType, setJobType] = useState("Internship");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company.trim() || !role.trim() || !appliedDate) return;

    onSubmit({
      id: `${company.trim().toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      company: company.trim(),
      role: role.trim(),
      status,
      avatarBg: "bg-slate-700",
      avatarText: "text-white",
      avatarLetter: company.trim().charAt(0).toUpperCase(),
      appliedDate,
      expectedCTC: expectedCTC.trim() || "—",
      jobType,
      location: location.trim() || "—",
      department: "—",
      experience: "—",
      batch: "—",
      jobId: "—",
      jobDescriptionUrl: "#",
      nextStep: { title: "Awaiting response", date: null, time: null, badge: "TBD" },
      notes: "",
      timeline: [{ id: 1, stage: "Applied", date: appliedDate, completed: true }],
      resources: [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Company">
          <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Amazon" className={inputClass} required />
        </FormField>
        <FormField label="Role">
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. SDE Intern" className={inputClass} required />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Status">
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputClass}>
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </FormField>
        <FormField label="Applied Date">
          <input type="date" value={appliedDate} onChange={(e) => setAppliedDate(e.target.value)} className={inputClass} required />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Expected CTC">
          <input type="text" value={expectedCTC} onChange={(e) => setExpectedCTC(e.target.value)} placeholder="e.g. ₹12 LPA" className={inputClass} />
        </FormField>
        <FormField label="Job Type">
          <select value={jobType} onChange={(e) => setJobType(e.target.value)} className={inputClass}>
            <option>Internship</option>
            <option>Full-time</option>
          </select>
        </FormField>
      </div>

      <FormField label="Location">
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Bengaluru" className={inputClass} />
      </FormField>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" className="flex-1 justify-center" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary" className="flex-1 justify-center">Add Application</Button>
      </div>
    </form>
  );
}
export default AddApplicationForm;