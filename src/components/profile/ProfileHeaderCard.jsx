import { FaGraduationCap, FaUniversity, FaEnvelope, FaEdit } from "react-icons/fa";
import Card from "../common/Card";
import Button from "../common/Button";
import Avatar from "../common/Avatar";

function ProfileHeaderCard({ profile, onEdit }) {
  return (
    <Card hover={false}>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        <Avatar name={profile.name} src={profile.avatarUrl} />

        <div>
          <h2 className="text-xl font-bold text-white">{profile.name}</h2>

          <div className="mt-3 space-y-2">
            <p className="flex items-center justify-center sm:justify-start gap-2 text-sm text-slate-300">
              <FaGraduationCap className="text-violet-400" /> {profile.course}
            </p>
            <p className="flex items-center justify-center sm:justify-start gap-2 text-sm text-slate-300">
              <FaUniversity className="text-violet-400" /> {profile.college}
            </p>
            <p className="flex items-center justify-center sm:justify-start gap-2 text-sm text-slate-300">
              <FaEnvelope className="text-violet-400" /> {profile.email}
            </p>
          </div>

          <Button variant="secondary" size="sm" className="mt-4 flex items-center gap-2" onClick={onEdit}>
            <FaEdit className="text-xs" /> Edit Profile
          </Button>
        </div>
      </div>
    </Card>
  );
}
export default ProfileHeaderCard;