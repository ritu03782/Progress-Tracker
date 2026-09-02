import { useRef } from "react";
import { FaGraduationCap, FaUniversity, FaEnvelope, FaEdit, FaCamera, FaSpinner } from "react-icons/fa";
import Card from "../common/Card";
import Button from "../common/Button";
import Avatar from "../common/Avatar";

function ProfileHeaderCard({ profile, onEdit, onAvatarChange, avatarUploading }) {
  const fileInputRef = useRef(null);

  const handleFileSelected = (e) => {
    const file = e.target.files?.[0];
    if (file && onAvatarChange) onAvatarChange(file);
    e.target.value = ""; // allow re-selecting the same file later
  };

  return (
    <Card hover={false}>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        <div className="relative shrink-0">
          {onAvatarChange ? (
            <>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={avatarUploading}
                title="Change profile photo"
                aria-label="Change profile photo"
                className="group relative block rounded-full cursor-pointer disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#111827]"
              >
                <Avatar name={profile.name} src={profile.avatarUrl} />
                <span
                  className={`absolute inset-0 rounded-full flex items-center justify-center bg-black/60 transition-opacity ${
                    avatarUploading ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {avatarUploading ? (
                    <FaSpinner className="text-white text-lg animate-spin" />
                  ) : (
                    <span className="flex flex-col items-center gap-1">
                      <FaCamera className="text-white text-lg" />
                      <span className="text-[10px] font-medium text-white">Change</span>
                    </span>
                  )}
                </span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelected}
                className="hidden"
              />
            </>
          ) : (
            <Avatar name={profile.name} src={profile.avatarUrl} />
          )}
        </div>

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
