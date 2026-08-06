import { SiLeetcode, SiGeeksforgeeks, SiCodeforces, SiCodechef } from "react-icons/si";
import { FaEllipsisH } from "react-icons/fa";

const platformStats = [
  { id: 1, name: "LeetCode", solved: 210, percent: 50, icon: SiLeetcode, color: "#F59E0B" },
  { id: 2, name: "GeeksforGeeks", solved: 95, percent: 23, icon: SiGeeksforgeeks, color: "#22C55E" },
  { id: 3, name: "Codeforces", solved: 36, percent: 9, icon: SiCodeforces, color: "#3B82F6" },
  { id: 4, name: "CodeChef", solved: 12, percent: 3, icon: SiCodechef, color: "#8B5CF6" },
  { id: 5, name: "Others", solved: 25, percent: 6, icon: FaEllipsisH, color: "#94A3B8" },
];

export const totalProblemsSolved = 420;

export default platformStats;
