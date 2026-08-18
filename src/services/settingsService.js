import settingsData from "../config/settingsData";

let _settings = settingsData;
const simulateLatency = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 150));

export async function getSettings() {
  return simulateLatency(_settings);
}

export async function updateSettings(updates) {
  _settings = { ..._settings, ...updates };
  return simulateLatency(_settings);
}