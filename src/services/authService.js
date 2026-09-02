import request from "./apiClient";

export async function signup({ username, email, fullName, password, avatarFile }) {
  const form = new FormData();
  form.append("username", username);
  form.append("email", email);
  form.append("fullName", fullName);
  form.append("password", password);
  if (avatarFile) form.append("avatar", avatarFile);

  return request("/v1/users/register", { method: "POST", body: form, isFormData: true });
}

export async function login({ identifier, password }) {
  const isEmail = identifier.includes("@");
  const body = {
    password,
    ...(isEmail ? { email: identifier } : { username: identifier }),
  };
  return request("/v1/users/login", { method: "POST", body });
}

export async function logout() {
  return request("/v1/users/logout", { method: "POST" });
}

export async function getCurrentUser() {
  return request("/v1/users/me", { method: "GET" });
}

export async function updateAccount(updates) {
  return request("/v1/users/update-account", { method: "PATCH", body: updates });
}

export async function changePassword({ oldPassword, newPassword }) {
  return request("/v1/users/change-password", { method: "POST", body: { oldPassword, newPassword } });
}

export async function updateAvatar(avatarFile) {
  const form = new FormData();
  form.append("avatar", avatarFile);
  return request("/v1/users/update-avatar", { method: "PATCH", body: form, isFormData: true });
}
