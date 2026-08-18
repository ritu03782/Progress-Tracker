import profileData from "../config/profileData";

let _profile = profileData;
const simulateLatency = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 150));

export async function getProfile() {
  return simulateLatency(_profile);
}

export async function updateProfile(updates) {
  _profile = { ..._profile, ...updates };
  return simulateLatency(_profile);
}