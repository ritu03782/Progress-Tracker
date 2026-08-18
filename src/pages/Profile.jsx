import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import PageHeader from "../components/common/PageHeader";
import Modal from "../components/common/Modal";
import ProfileHeaderCard from "../components/profile/ProfileHeaderCard";
import PersonalInfoCard from "../components/profile/PersonalInfoCard";
import AccountInfoCard from "../components/profile/AccountInfoCard";
import AboutCard from "../components/profile/AboutCard";
import EditProfileForm from "../components/profile/EditProfileForm";
import useProfile from "../hooks/useProfile";

function Profile() {
  const { profile, loading, saveProfile } = useProfile();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleSave = (updates) => {
    saveProfile(updates);
    setIsEditOpen(false);
  };

  if (loading || !profile) {
    return <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-slate-400">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0F172A] p-6 md:p-8 space-y-6 text-white">
      <PageHeader
        title="Profile"
        subtitle="Manage your personal information."
        buttonText="Edit Profile"
        buttonIcon={<FaEdit />}
        onButtonClick={() => setIsEditOpen(true)}
      />

      <ProfileHeaderCard profile={profile} onEdit={() => setIsEditOpen(true)} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PersonalInfoCard profile={profile} />
        <AccountInfoCard profile={profile} />
      </div>

      <AboutCard profile={profile} onEdit={() => setIsEditOpen(true)} />

      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Profile">
        <EditProfileForm profile={profile} onSubmit={handleSave} onCancel={() => setIsEditOpen(false)} />
      </Modal>
    </div>
  );
}
export default Profile;