import { useState } from "react";
import FormField from "../common/FormField";
import Button from "../common/Button";
import { inputClass } from "../../utils/formStyles";
import { changePassword } from "../../services/authService";
import { useToast } from "../../context/ToastContext";

// Wires up an endpoint that's existed since the very first auth round
// (POST /users/change-password) but never had any UI calling it.
function ChangePasswordForm({ onDone, onCancel }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword) {
      showToast("Please fill in both password fields.", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("New passwords do not match.", "error");
      return;
    }
    if (newPassword.length < 8) {
      showToast("New password must be at least 8 characters.", "error");
      return;
    }

    setSubmitting(true);
    try {
      await changePassword({ oldPassword, newPassword });
      showToast("Password changed successfully.", "success");
      onDone();
    } catch (err) {
      showToast(err.message || "Failed to change password.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Current Password">
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className={inputClass}
          autoComplete="current-password"
          required
        />
      </FormField>

      <FormField label="New Password">
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={inputClass}
          autoComplete="new-password"
          required
        />
      </FormField>

      <FormField label="Confirm New Password">
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={inputClass}
          autoComplete="new-password"
          required
        />
      </FormField>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" className="flex-1 justify-center" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" className="flex-1 justify-center" disabled={submitting}>
          {submitting ? "Saving..." : "Change Password"}
        </Button>
      </div>
    </form>
  );
}
export default ChangePasswordForm;
