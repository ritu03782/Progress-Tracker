import { FaDatabase, FaCogs, FaNetworkWired, FaCubes, FaTable, FaMicrochip, FaLaptopCode, FaBrain, FaCode, FaBriefcase, FaBookOpen, FaRocket, FaUserTie } from "react-icons/fa";
import { FaBed, FaDumbbell, FaGlassWater, FaBook, FaPersonRunning } from "react-icons/fa6";
import { FaHospital, FaDollarSign, FaHome } from "react-icons/fa";

export const subjectIconOptions = [
  { label: "Database", icon: FaDatabase, color: "text-blue-400", bg: "bg-blue-500/15", hex: "#3B82F6" },
  { label: "System", icon: FaCogs, color: "text-orange-400", bg: "bg-orange-500/15", hex: "#F97316" },
  { label: "Network", icon: FaNetworkWired, color: "text-cyan-400", bg: "bg-cyan-500/15", hex: "#06B6D4" },
  { label: "Concept", icon: FaCubes, color: "text-green-400", bg: "bg-green-500/15", hex: "#22C55E" },
  { label: "Table", icon: FaTable, color: "text-purple-400", bg: "bg-purple-500/15", hex: "#A855F7" },
  { label: "Hardware", icon: FaMicrochip, color: "text-red-400", bg: "bg-red-500/15", hex: "#EF4444" },
];

export const goalIconOptions = [
  { label: "Career", icon: FaBriefcase, color: "text-violet-400", bg: "bg-violet-500/15", hex: "#8B5CF6" },
  { label: "Coding", icon: FaCode, color: "text-green-400", bg: "bg-green-500/15", hex: "#22C55E" },
  { label: "Study", icon: FaBookOpen, color: "text-blue-400", bg: "bg-blue-500/15", hex: "#3B82F6" },
  { label: "Project", icon: FaRocket, color: "text-orange-400", bg: "bg-orange-500/15", hex: "#F97316" },
  { label: "Interview", icon: FaUserTie, color: "text-pink-400", bg: "bg-pink-500/15", hex: "#EC4899" },
];

export const habitIconOptions = [
  { label: "Coding", icon: FaCode, color: "text-green-400", bg: "bg-green-500/10" },
  { label: "Development", icon: FaLaptopCode, color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Reading", icon: FaBook, color: "text-yellow-400", bg: "bg-yellow-500/10" },
  { label: "Focus", icon: FaBrain, color: "text-purple-400", bg: "bg-purple-500/10" },
  { label: "Hydration", icon: FaGlassWater, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { label: "Sleep", icon: FaBed, color: "text-indigo-400", bg: "bg-indigo-500/10" },
  { label: "Fitness", icon: FaDumbbell, color: "text-red-400", bg: "bg-red-500/10" },
  { label: "Running", icon: FaPersonRunning, color: "text-orange-400", bg: "bg-orange-500/10" },
];

export const projectIconOptions = [
  { key: "code", label: "Code", icon: FaCode, color: "text-violet-400", bg: "bg-violet-500/15", hex: "#8B5CF6" },
  { key: "hospital", label: "Hospital", icon: FaHospital, color: "text-emerald-400", bg: "bg-emerald-500/15", hex: "#10B981" },
  { key: "finance", label: "Finance", icon: FaDollarSign, color: "text-amber-400", bg: "bg-amber-500/15", hex: "#F59E0B" },
  { key: "home", label: "Home", icon: FaHome, color: "text-blue-400", bg: "bg-blue-500/15", hex: "#3B82F6" },
  { key: "portfolio", label: "Portfolio", icon: FaUserTie, color: "text-purple-400", bg: "bg-purple-500/15", hex: "#A855F7" },
];