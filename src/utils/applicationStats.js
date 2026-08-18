export function getApplicationsSummary(applications) {
  const total = applications.length;
  const applied = applications.filter((a) => a.status === "Applied").length;
  const oa = applications.filter((a) => a.status === "OA").length;
  const interview = applications.filter((a) => a.status === "Interview").length;
  const offer = applications.filter((a) => a.status === "Offer").length;
  const rejected = applications.filter((a) => a.status === "Rejected").length;

  const pct = (n) => (total === 0 ? "0" : ((n / total) * 100).toFixed(1));

  return {
    total, applied, oa, interview, offer, rejected,
    appliedPct: pct(applied), oaPct: pct(oa), interviewPct: pct(interview), offerPct: pct(offer),
  };
}

export const STATUS_BADGE_CLASS = {
  Applied: "bg-green-500/15 text-green-400",
  OA: "bg-blue-500/15 text-blue-400",
  Interview: "bg-amber-500/15 text-amber-400",
  Offer: "bg-emerald-500/15 text-emerald-400",
  Rejected: "bg-red-500/15 text-red-400",
};