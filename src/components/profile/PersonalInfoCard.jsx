import Card from "../common/Card";
import InfoRow from "./InfoRow";
import { formatFullDate } from "../../utils/profileFormat";

function PersonalInfoCard({ profile }) {
  return (
    <Card hover={false} title="Personal Information">
      <InfoRow label="Full Name" value={profile.name} />
      <InfoRow label="College" value={profile.college} />
      <InfoRow label="Course" value={profile.course} />
      <InfoRow label="Graduation Year" value={profile.graduationYear} />
      <InfoRow label="Date of Birth" value={formatFullDate(profile.dob)} />
      <InfoRow label="Location" value={profile.location} />
    </Card>
  );
}
export default PersonalInfoCard;