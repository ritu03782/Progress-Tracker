export function getContestsSummary(contests) {
  const total = contests.length;
  const participated = contests.filter((c) => c.status === "Participated").length;
  const upcoming = contests.filter((c) => c.status === "Upcoming").length;

  const ranked = contests.filter((c) => c.status === "Participated" && c.rank != null);
  const best = ranked.reduce((min, c) => (min === null || c.rank < min.rank ? c : min), null);

  return {
    total,
    participated,
    upcoming,
    bestRank: best ? best.rank : null,
    bestRankPlatform: best ? best.platform : null,
  };
}

export function getPlatformStyle(platformOptions, platformLabel) {
  return platformOptions.find((p) => p.label === platformLabel) || platformOptions[0];
}