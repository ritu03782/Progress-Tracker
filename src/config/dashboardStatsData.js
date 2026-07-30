import { FaFire, FaCode, FaClock } from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";

const dashboardStats = [
  {
    id: 1,
    title: "Overall Progress",
    value: "72%",
    subtitle: "+5% this week",
    icon: MdTrendingUp,
    iconColor: "text-blue-500",
  },
  {
    id: 2,
    title: "Current Streak",
    value: "18 Days",
    subtitle: "Best: 27 Days",
    icon: FaFire,
    iconColor: "text-orange-500",
  },
  {
    id: 3,
    title: "Problems Solved",
    value: "320",
    subtitle: "12 this week",
    icon: FaCode,
    iconColor: "text-green-500",
  },
  {
    id: 4,
    title: "Study Hours",
    value: "156 hrs",
    subtitle: "18 hrs this week",
    icon: FaClock,
    iconColor: "text-purple-500",
  },
];

export default dashboardStats;