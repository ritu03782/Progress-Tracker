import { useState } from "react";
import FormField from "../common/FormField";
import Button from "../common/Button";
import { inputClass } from "../../utils/formStyles";

function EditProfileForm({ profile, onSubmit, onCancel }) {
  const [name, setName] = useState(profile.name);
  const [course, setCourse] = useState(profile.course);
  const [college, setCollege] = useState(profile.college);
  const [email, setEmail] = useState(profile.email);
  const [graduationYear, setGraduationYear] = useState(profile.graduationYear);
  const [dob, setDob] = useState(profile.dob);
  const [location, setLocation] = useState(profile.location);
  const [about, setAbout] = useState(profile.about);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    onSubmit({
      name: name.trim(),
      course: course.trim(),
      college: college.trim(),
      email: email.trim(),
      graduationYear: Number(graduationYear) || profile.graduationYear,
      dob,
      location: location.trim(),
      about: about.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Full Name">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} required />
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Course">
          <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} className={inputClass} />
        </FormField>
        <FormField label="College">
          <input type="text" value={college} onChange={(e) => setCollege(e.target.value)} className={inputClass} />
        </FormField>
      </div>

      <FormField label="Email">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} required />
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Graduation Year">
          <input type="number" value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)} className={inputClass} />
        </FormField>
        <FormField label="Date of Birth">
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className={inputClass} />
        </FormField>
      </div>

      <FormField label="Location">
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Lucknow, Uttar Pradesh" className={inputClass} />
      </FormField>

      <FormField label="About Me">
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </FormField>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" className="flex-1 justify-center" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary" className="flex-1 justify-center">Save Changes</Button>
      </div>
    </form>
  );
}
export default EditProfileForm;