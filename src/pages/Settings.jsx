import {
  FaUser, FaLock, FaBell, FaBook, FaBullseye, FaPalette,
  FaShieldAlt, FaFileExport, FaTrash,
} from "react-icons/fa";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import Toggle from "../components/common/Toggle";
import SettingsRow from "../components/settings/SettingsRow";
import ThemeSwitcher from "../components/settings/ThemeSwitcher";
import useSettings from "../hooks/useSettings";

function Settings() {
  const { settings, loading, saveSettings } = useSettings();

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
          onClick={() => {}}
        />
        <SettingsRow
          icon={FaLock}
          iconColor="text-blue-400"
          iconBg="bg-blue-500/15"
          title="Change Password"
          description="Update your account password"
          onClick={() => {}}
        />
      </Card>

      <Card hover={false} title="Notifications">
        <SettingsRow
          icon={FaBell}
          iconColor="text-amber-400"
          iconBg="bg-amber-500/15"
          title="Notifications"
          description="Receive reminders and updates"
          right={<Toggle checked={settings.notifications} onChange={(v) => saveSettings({ notifications: v })} label="Notifications" />}
        />
        <SettingsRow
          icon={FaBook}
          iconColor="text-green-400"
          iconBg="bg-green-500/15"
          title="Study Reminders"
          description="Get reminders for scheduled study tasks"
          right={<Toggle checked={settings.studyReminders} onChange={(v) => saveSettings({ studyReminders: v })} label="Study Reminders" />}
        />
        <SettingsRow
          icon={FaBullseye}
          iconColor="text-red-400"
          iconBg="bg-red-500/15"
          title="Goal Reminders"
          description="Get notified about upcoming goal deadlines"
          right={<Toggle checked={settings.goalReminders} onChange={(v) => saveSettings({ goalReminders: v })} label="Goal Reminders" />}
        />
      </Card>

      <Card hover={false} title="Appearance">
        <SettingsRow
          icon={FaPalette}
          iconColor="text-purple-400"
          iconBg="bg-purple-500/15"
          title="Theme"
          description="Choose your preferred theme"
          right={<ThemeSwitcher value={settings.theme} onChange={(v) => saveSettings({ theme: v })} />}
        />
      </Card>

      <Card hover={false} title="Data & Privacy">
        <SettingsRow
          icon={FaShieldAlt}
          iconColor="text-blue-400"
          iconBg="bg-blue-500/15"
          title="Data & Privacy"
          description="Manage your data and privacy settings"
          onClick={() => {}}
        />
        <SettingsRow
          icon={FaFileExport}
          iconColor="text-green-400"
          iconBg="bg-green-500/15"
          title="Export My Data"
          description="Download a copy of your data"
          onClick={() => {}}
        />
        <SettingsRow
          icon={FaTrash}
          iconColor="text-red-400"
          iconBg="bg-red-500/15"
          title="Delete Account"
          description="Permanently delete your account and all data"
          onClick={() => {}}
          danger
        />
      </Card>
    </div>
  );
}
export default Settings;