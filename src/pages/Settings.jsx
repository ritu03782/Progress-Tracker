import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser, FaLock, FaBell, FaBook, FaBullseye,
  FaFileExport, FaTrash,
} from "react-icons/fa";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import Modal from "../components/common/Modal";
import Toggle from "../components/common/Toggle";
import Button from "../components/common/Button";
import SettingsRow from "../components/settings/SettingsRow";
import ChangePasswordForm from "../components/settings/ChangePasswordForm";
import useSettings from "../hooks/useSettings";

function Settings() {
  const navigate = useNavigate();
  const { settings, loading, savePreferences, exportData, deleteAccount } = useSettings();
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setDeleting(true);
    const success = await deleteAccount();
    setDeleting(false);
    if (success) {
      navigate("/login", { replace: true });
    }
  };

  if (loading || !settings) {
    return <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-slate-400">Loading settings...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0F172A] p-6 md:p-8 space-y-6 text-white">
      <PageHeader title="Settings" subtitle="Manage your account and application preferences." />

      <Card hover={false} title="Account">
        <SettingsRow
          icon={FaUser}
          iconColor="text-violet-400"
          iconBg="bg-violet-500/15"
          title="Account Settings"
          description="Manage your account information"
          onClick={() => navigate("/profile")}
        />
        <SettingsRow
          icon={FaLock}
          iconColor="text-blue-400"
          iconBg="bg-blue-500/15"
          title="Change Password"
          description="Update your account password"
          onClick={() => setIsPasswordOpen(true)}
        />
      </Card>

      <Card hover={false} title="Notifications">
        <SettingsRow
          icon={FaBell}
          iconColor="text-amber-400"
          iconBg="bg-amber-500/15"
          title="Notifications"
          description="Receive reminders and updates"
          right={<Toggle checked={settings.notifications} onChange={(v) => savePreferences({ notifications: v })} label="Notifications" />}
        />
        <SettingsRow
          icon={FaBook}
          iconColor="text-green-400"
          iconBg="bg-green-500/15"
          title="Study Reminders"
          description="Get reminders for scheduled study tasks"
          right={<Toggle checked={settings.studyReminders} onChange={(v) => savePreferences({ studyReminders: v })} label="Study Reminders" />}
        />
        <SettingsRow
          icon={FaBullseye}
          iconColor="text-red-400"
          iconBg="bg-red-500/15"
          title="Goal Reminders"
          description="Get notified about upcoming goal deadlines"
          right={<Toggle checked={settings.goalReminders} onChange={(v) => savePreferences({ goalReminders: v })} label="Goal Reminders" />}
        />
      </Card>

      <Card hover={false} title="Data & Privacy">
        <SettingsRow
          icon={FaFileExport}
          iconColor="text-green-400"
          iconBg="bg-green-500/15"
          title="Export My Data"
          description="Download a copy of everything you've tracked"
          onClick={exportData}
        />
        <SettingsRow
          icon={FaTrash}
          iconColor="text-red-400"
          iconBg="bg-red-500/15"
          title="Delete Account"
          description="Permanently delete your account and all data"
          onClick={() => setIsDeleteOpen(true)}
          danger
        />
      </Card>

      <Modal isOpen={isPasswordOpen} onClose={() => setIsPasswordOpen(false)} title="Change Password">
        <ChangePasswordForm onDone={() => setIsPasswordOpen(false)} onCancel={() => setIsPasswordOpen(false)} />
      </Modal>

      <Modal
        isOpen={isDeleteOpen}
        onClose={() => { setIsDeleteOpen(false); setDeleteConfirmText(""); }}
        title="Delete Account"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-300">
            This permanently deletes your account and every habit, DSA problem, subject,
            goal, project, application, contest, note, and schedule task tied to it.
            This cannot be undone.
          </p>
          <p className="text-sm text-slate-400">
            Type <span className="font-semibold text-red-400">DELETE</span> to confirm.
          </p>
          <input
            type="text"
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-red-500"
            placeholder="Type DELETE"
          />
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              className="flex-1 justify-center"
              onClick={() => { setIsDeleteOpen(false); setDeleteConfirmText(""); }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="danger"
              className="flex-1 justify-center"
              disabled={deleteConfirmText !== "DELETE" || deleting}
              onClick={handleDeleteAccount}
            >
              {deleting ? "Deleting..." : "Delete My Account"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default Settings;
