// Pure derivation functions — turn the single `problems` array (already
// fetched in full by useProblems) into every dashboard view the DSA
// Tracker page needs. Nothing here talks to the network; these run
// entirely client-side against data already in memory.

import {
  FaRegCheckSquare,
  FaChartBar,
  FaMountain,
  FaTrophy,
  FaCalendarWeek,
  FaChartLine,
  FaLink,
  FaArrowsAltH,
  FaProjectDiagram,
  FaSitemap,
  FaCode,
  FaCubes,
} from "react-icons/fa";
import { startOfDay, addDays, isSameDay, differenceInCalendarDays } from "date-fns";

// A small, fixed icon/color per DSA topic (matches TOPIC_OPTIONS in
// config/dsaOptions.js) — mirrors the old config/topicProgress.js and
// config/weakTopics.js, just computed instead of hand-maintained per problem.
const TOPIC_STYLES = {
  Arrays: { icon: FaChartLine, color: "#8B5CF6" },
  "Linked List": { icon: FaLink, color: "#10B981" },
  "Sliding Window": { icon: FaArrowsAltH, color: "#06B6D4" },
  BFS: { icon: FaProjectDiagram, color: "#3B82F6" },
  DFS: { icon: FaSitemap, color: "#EF4444" },
  DP: { icon: FaCode, color: "#F97316" },
  Design: { icon: FaCubes, color: "#F59E0B" },
};
const DEFAULT_TOPIC_STYLE = { icon: FaCode, color: "#94A3B8" };

function topicStyle(topic) {
  return TOPIC_STYLES[topic] || DEFAULT_TOPIC_STYLE;
}

// --- StatsRow: Easy/Medium/Hard/Total solved, each with a "this week" delta ---
export function computeStats(problems) {
  const now = new Date();
  const solved = problems.filter((p) => p.status === "Solved");
  const solvedThisWeek = (list) =>
    list.filter((p) => p.solvedAt && differenceInCalendarDays(now, new Date(p.solvedAt)) < 7).length;

  const byDifficulty = (difficulty) => solved.filter((p) => p.difficulty === difficulty);

  const easy = byDifficulty("Easy");
  const medium = byDifficulty("Medium");
  const hard = byDifficulty("Hard");

  return [
    { id: 1, title: "Easy Solved", value: easy.length, subtitle: `${solvedThisWeek(easy)} this week`, icon: FaRegCheckSquare, bg: "bg-emerald-500" },
    { id: 2, title: "Medium Solved", value: medium.length, subtitle: `${solvedThisWeek(medium)} this week`, icon: FaChartBar, bg: "bg-amber-500" },
    { id: 3, title: "Hard Solved", value: hard.length, subtitle: `${solvedThisWeek(hard)} this week`, icon: FaMountain, bg: "bg-red-500" },
    { id: 4, title: "Total Solved", value: solved.length, subtitle: `${solvedThisWeek(solved)} this week`, icon: FaTrophy, bg: "bg-violet-500" },
    { id: 5, title: "Solved This Week", value: solvedThisWeek(solved), subtitle: "across all topics", icon: FaCalendarWeek, bg: "bg-blue-500" },
  ];
}

// --- Topic Progress: solved / total attempted per topic (own problems, not a curated master list) ---
function groupByTopic(problems) {
  const map = new Map();
  problems.forEach((p) => {
    if (!map.has(p.topic)) map.set(p.topic, { total: 0, solved: 0 });
    const entry = map.get(p.topic);
    entry.total += 1;
    if (p.status === "Solved") entry.solved += 1;
  });
  return map;
}

export function computeTopicProgress(problems) {
  const grouped = groupByTopic(problems);
  return [...grouped.entries()]
    .map(([name, { solved, total }], index) => {
      const style = topicStyle(name);
      return { id: index + 1, name, solved, total, icon: style.icon, color: style.color };
    })
    .sort((a, b) => b.total - a.total);
}

// --- Weak Topics (auto-derived) --- kept for potential future "suggested"
// use, but the UI now uses computeWeakTopicsFromSelection below instead —
// weak topics are explicitly user-chosen, not silently auto-picked.
export function computeWeakTopics(problems, limit = 5) {
  const grouped = groupByTopic(problems);
  return [...grouped.entries()]
    .filter(([, { total }]) => total > 0)
    .map(([name, { solved, total }], index) => {
      const style = topicStyle(name);
      return {
        id: index + 1,
        name,
        solved,
        total,
        icon: style.icon,
        color: style.color,
        rate: total > 0 ? solved / total : 0,
      };
    })
    .sort((a, b) => a.rate - b.rate)
    .slice(0, limit);
}

// --- Weak Topics (user-selected): merge the user's explicitly chosen weak
// topics with real solved/total counts computed from their problems ---
export function computeWeakTopicsFromSelection(problems, weakTopicEntries) {
  const grouped = groupByTopic(problems);
  return weakTopicEntries.map((entry) => {
    const stats = grouped.get(entry.topic) || { solved: 0, total: 0 };
    const style = topicStyle(entry.topic);
    return {
      id: entry.id, // WeakTopic doc id — used to remove it
      name: entry.topic,
      solved: stats.solved,
      total: stats.total,
      icon: style.icon,
      color: style.color,
    };
  });
}

// --- Platform Stats: solved count + share per platform ---
export function computePlatformStats(problems, platformOptions) {
  const solved = problems.filter((p) => p.status === "Solved");
  const totalSolved = solved.length;

  const grouped = new Map();
  solved.forEach((p) => {
    grouped.set(p.platform, (grouped.get(p.platform) || 0) + 1);
  });

  const platforms = [...grouped.entries()].map(([name, count], index) => {
    const option = platformOptions.find((opt) => opt.label === name);
    return {
      id: index + 1,
      name,
      solved: count,
      percent: totalSolved > 0 ? Math.round((count / totalSolved) * 100) : 0,
      icon: option?.icon || (() => null),
      color: option?.color || DEFAULT_TOPIC_STYLE.color,
    };
  });

  return { platforms, total: totalSolved };
}

// --- Revision Queue: bucket by nextRevisionAt into today/tomorrow/thisWeek/overdue ---
export function computeRevisionQueue(problems) {
  const today = startOfDay(new Date());
  const tomorrow = addDays(today, 1);
  const weekEnd = addDays(today, 7);

  const buckets = { today: [], tomorrow: [], thisWeek: [], overdue: [] };

  problems.forEach((p) => {
    if (!p.nextRevisionAt) return;
    const due = startOfDay(new Date(p.nextRevisionAt));
    const item = { id: p.id, name: p.name, difficulty: p.difficulty };

    if (due < today) buckets.overdue.push(item);
    else if (isSameDay(due, today)) buckets.today.push(item);
    else if (isSameDay(due, tomorrow)) buckets.tomorrow.push(item);
    else if (due <= weekEnd) buckets.thisWeek.push(item);
  });

  return buckets;
}

// --- Favourites: just a filter, kept here for a single import point ---
export function computeFavourites(problems) {
  return problems
    .filter((p) => p.favourite)
    .map((p) => ({ id: p.id, name: p.name, difficulty: p.difficulty, link: p.link || "#" }));
}
