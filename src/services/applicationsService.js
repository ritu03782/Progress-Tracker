import request from "./apiClient";
import { format, differenceInCalendarDays } from "date-fns";

const STAGES = ["Applied", "OA", "Interview", "Offer"];

// Company avatar is fully derivable from the name (a deterministic hash
// into a fixed color palette) — no need to store or ask for it in a form.
const AVATAR_PALETTE = [
  { bg: "bg-orange-500", text: "text-white" },
  { bg: "bg-blue-800", text: "text-white" },
  { bg: "bg-red-500", text: "text-white" },
  { bg: "bg-cyan-600", text: "text-white" },
  { bg: "bg-emerald-600", text: "text-white" },
  { bg: "bg-violet-600", text: "text-white" },
  { bg: "bg-pink-600", text: "text-white" },
  { bg: "bg-slate-700", text: "text-white" },
];

function getCompanyAvatar(company) {
  let hash = 0;
  for (let i = 0; i < company.length; i++) hash = (hash * 31 + company.charCodeAt(i)) >>> 0;
  return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
}

// Derives the 4-stage timeline from status/appliedDate/stageDates/
// rejectedFromStage — this is what keeps it impossible for the timeline
// to fall out of sync with the actual status (it's never stored separately).
function computeTimeline(app) {
  const effectiveStatus = app.status === "Rejected" ? app.rejectedFromStage || "Applied" : app.status;
  const effIndex = STAGES.indexOf(effectiveStatus);

  const dateFor = (stage) => {
    if (stage === "Applied") return app.appliedDate;
    return app.stageDates?.[stage.toLowerCase()] || null;
  };

  return STAGES.map((stage, index) => ({
    id: index + 1,
    stage,
    date: dateFor(stage) ? format(new Date(dateFor(stage)), "d MMM") : null,
    completed: index <= effIndex,
    current: app.status !== "Rejected" && stage === app.status,
  }));
}

function computeNextStepBadge(app) {
  if (app.status === "Rejected") return "Rejected";
  if (app.status === "Offer") return "Offer";
  if (!app.nextStep?.date) return "TBD";
  const days = differenceInCalendarDays(new Date(app.nextStep.date), new Date());
  if (days < 0) return "Overdue";
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `In ${days} days`;
}

function shapeApplication(app) {
  const avatar = getCompanyAvatar(app.company);
  return {
    ...app,
    avatarBg: avatar.bg,
    avatarText: avatar.text,
    avatarLetter: app.company.charAt(0).toUpperCase(),
    timeline: computeTimeline(app),
    nextStep: {
      title: app.status === "Rejected" ? "Process closed" : app.nextStep?.title || "Awaiting update",
      date: app.nextStep?.date ? format(new Date(app.nextStep.date), "d MMM") : null,
      time: app.nextStep?.time || null,
      badge: computeNextStepBadge(app),
    },
  };
}

export async function getApplications() {
  const applications = await request("/v1/applications", { method: "GET" });
  return applications.map(shapeApplication);
}

export async function createApplication(draft) {
  const payload = {
    company: draft.company,
    role: draft.role,
    status: draft.status,
    appliedDate: draft.appliedDate,
    expectedCTC: draft.expectedCTC,
    jobType: draft.jobType,
    location: draft.location,
    department: draft.department,
    experience: draft.experience,
    batch: draft.batch,
    jobId: draft.jobId,
    jobDescriptionUrl: draft.jobDescriptionUrl,
    notes: draft.notes,
  };
  const application = await request("/v1/applications", { method: "POST", body: payload });
  return shapeApplication(application);
}

export async function updateApplication(applicationId, updates) {
  const application = await request(`/v1/applications/${applicationId}`, { method: "PATCH", body: updates });
  return shapeApplication(application);
}

export async function deleteApplication(applicationId) {
  return request(`/v1/applications/${applicationId}`, { method: "DELETE" });
}

export async function updateApplicationNotes(applicationId, notes) {
  const application = await request(`/v1/applications/${applicationId}`, { method: "PATCH", body: { notes } });
  return shapeApplication(application);
}

// payload: { stage, date?, nextStepTitle?, nextStepDate?, nextStepTime? }
export async function advanceApplicationStage(applicationId, payload) {
  const application = await request(`/v1/applications/${applicationId}/advance`, { method: "PATCH", body: payload });
  return shapeApplication(application);
}

export async function rejectApplication(applicationId) {
  const application = await request(`/v1/applications/${applicationId}/reject`, { method: "PATCH" });
  return shapeApplication(application);
}

export async function reopenApplication(applicationId) {
  const application = await request(`/v1/applications/${applicationId}/reopen`, { method: "PATCH" });
  return shapeApplication(application);
}
