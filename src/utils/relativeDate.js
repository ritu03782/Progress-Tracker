import { isToday, isYesterday, differenceInCalendarDays, format } from "date-fns";

// Shared display formatter for any "last X at" timestamp — Today /
// Yesterday / "N days ago" / a full date beyond that. Used by DSA
// (lastSolved/lastRevision), Subjects (lastStudied), and Projects
// (lastUpdated) so this logic exists in exactly one place.
export function formatRelativeDate(value, fallback = "—") {
  if (!value) return fallback;
  const date = new Date(value);
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  const days = differenceInCalendarDays(new Date(), date);
  if (days > 0 && days <= 30) return `${days} days ago`;
  return format(date, "d MMM yyyy");
}
