import { FaRegCheckSquare, FaChartBar, FaTrophy, FaMountain, FaClock } from "react-icons/fa";

const dsaStats = [
  {
    id: 1,
    title: "Easy Solved",
    value: 158,
    subtitle: "12 this week",
    icon: FaRegCheckSquare,
    bg: "bg-emerald-500",
  },
  {
    id: 2,
    title: "Medium Solved",
    value: 186,
    subtitle: "15 this week",
    icon: FaChartBar,
    bg: "bg-amber-500",
  },
  {
    id: 3,
    title: "Hard Solved",
    value: 56,
    subtitle: "5 this week",
    icon: FaMountain,
    bg: "bg-red-500",
  },
  {
    id: 4,
    title: "Total Solved",
    value: 420,
    subtitle: "32 this week",
    icon: FaTrophy,
    bg: "bg-violet-500",
  },
  {
    id: 5,
    title: "Study Hours",
    value: "145h",
    subtitle: "12h this week",
    icon: FaClock,
    bg: "bg-blue-500",
  },
];

export default dsaStats;
