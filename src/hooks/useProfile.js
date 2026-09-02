import { useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { updateAccount, updateAvatar } from "../services/authService";

// Adapts the backend User document to the shape the existing Profile
// components (ProfileHeaderCard, PersonalInfoCard, AccountInfoCard,
// AboutCard, EditProfileForm) already expect — keeps those components
// untouched.
function normalizeUser(user) {
  if (!user) return null;
  return {
    name: user.fullName,
    username: user.username,
    avatarUrl: user.avatar || null,
    course: user.course || "",
    college: user.college || "",
    email: user.email,
    graduationYear: user.graduationYear ?? "",
    dob: user.dob ? String(user.dob).slice(0, 10) : "",
    location: user.location || "",
    about: user.about || "",
    memberSince: user.createdAt,
    accountStatus: "Active",
    lastLogin: user.lastLogin || null,
    accountType: "Free Plan",
  };
}

function useProfile() {
  const { user, loading, refreshUser } = useAuth();
  const { showToast } = useToast();

  // EditProfileForm submits { name, course, college, email, graduationYear,
  // dob, location, about } — map "name" back to the backend's "fullName".
  const saveProfile = useCallback(
    async (updates) => {
      const payload = {
        fullName: updates.name,
        email: updates.email,
        course: updates.course,
        college: updates.college,
        graduationYear: updates.graduationYear,
        dob: updates.dob,
        location: updates.location,
        about: updates.about,
      };
      try {
        const updatedUser = await updateAccount(payload);
        refreshUser(updatedUser);
        showToast("Profile updated successfully.", "success");
        return updatedUser;
      } catch (err) {
        showToast(err.message || "Failed to update profile.", "error");
        throw err;
      }
    },
    [refreshUser, showToast]
  );

  const saveAvatar = useCallback(
    async (avatarFile) => {
      try {
        const updatedUser = await updateAvatar(avatarFile);
        refreshUser(updatedUser);
        showToast("Profile picture updated.", "success");
        return updatedUser;
      } catch (err) {
        showToast(err.message || "Failed to update profile picture.", "error");
        throw err;
      }
    },
    [refreshUser, showToast]
  );

  return { profile: normalizeUser(user), loading, saveProfile, saveAvatar };
}

export default useProfile;
