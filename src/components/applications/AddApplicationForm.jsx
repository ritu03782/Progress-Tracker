import { useState } from "react";
import FormField from "../common/FormField";
import Button from "../common/Button";
import { inputClass } from "../../utils/formStyles";

const STATUS_OPTIONS = ["Applied", "OA", "Interview", "Offer", "Rejected"];

// Same form for both "Add New Application" and "Edit Application" — pass
// an existing `application` to pre-fill and switch into edit mode. Status
// is only settable at creation; afterward it's only ever changed via the
// dedicated Advance/Reject/Reopen actions in the drawer, so the timeline
// and next-step data can never fall out of sync with it.
function AddApplicationForm({ application, onSubmit, onCancel }) {
  const isEditMode = Boolean(application);

  const [company, setCompany] = useState(application?.company || "");
  const [role, setRole] = useState(application?.role || "");
  const [status, setStatus] = useState("Applied");
  const [appliedDate, setAppliedDate] = useState(
    application?.appliedDate ? String(application.appliedDate).slice(0, 10) : ""
  );
  const [expectedCTC, setExpectedCTC] = useState(application?.expectedCTC || "");
  const [jobType, setJobType] = useState(application?.jobType || "Internship");
  const [location, setLocation] = useState(application?.location || "");
  const [department, setDepartment] = useState(application?.department || "");
  const [experience, setExperience] = useState(application?.experience || "");
  const [batch, setBatch] = useState(application?.batch || "");
  const [jobId, setJobId] = useState(application?.jobId || "");
  const [jobDescriptionUrl, setJobDescriptionUrl] = useState(application?.jobDescriptionUrl || "");
  const [notes, setNotes] = useState(application?.notes || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company.trim() || !role.trim() || !appliedDate) return;

    const base = {
      company: company.trim(),
      role: role.trim(),
      appliedDate,
      expectedCTC: expectedCTC.trim(),
      jobType,
      location: location.trim(),
      department: department.trim(),
      experience: experience.trim(),
      batch: batch.trim(),
      jobId: jobId.trim(),
      jobDescriptionUrl: jobDescriptionUrl.trim(),
      notes: notes.trim(),
    };

    onSubmit(isEditMode ? base : { ...base, status });
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
        {!isEditMode && (
          <FormField label="Status">
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputClass}>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </FormField>
        )}
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

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Department">
          <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="e.g. SDE" className={inputClass} />
        </FormField>
        <FormField label="Experience Level">
          <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="e.g. Fresher" className={inputClass} />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Batch">
          <input type="text" value={batch} onChange={(e) => setBatch(e.target.value)} placeholder="e.g. 2026" className={inputClass} />
        </FormField>
        <FormField label="Job ID">
          <input type="text" value={jobId} onChange={(e) => setJobId(e.target.value)} className={inputClass} />
        </FormField>
      </div>

      <FormField label="Job Description URL">
        <input type="url" value={jobDescriptionUrl} onChange={(e) => setJobDescriptionUrl(e.target.value)} placeholder="https://..." className={inputClass} />
      </FormField>

      <FormField label="Notes">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any notes about this application..."
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </FormField>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" className="flex-1 justify-center" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary" className="flex-1 justify-center">
          {isEditMode ? "Save Changes" : "Add Application"}
        </Button>
      </div>
    </form>
  );
}
export default AddApplicationForm;
