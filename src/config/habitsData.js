 import {
  FaCode,
  FaLaptopCode,
  FaBook,
  FaBrain,
  FaGlassWater,
  FaBed,
  FaDumbbell,
  FaPersonRunning,
} from "react-icons/fa6";

const habitsData = [
  {
    id: 1,
    icon: FaCode,
    title: "DSA Practice",
    description: "Solve coding problems every day.",
    category: "Coding",

    completed: true,
    progress: 100,
    streak: 18,
    completionRate: 92,

    reminder: "7:00 PM",
    target: "2 Problems",
    notes: "Complete at least 2 medium problems daily.",
    skipReason: "",

    history: [true, true, false, true, true, true, false],

    color: "text-green-400",
    bg: "bg-green-500/10",
  },

  {
    id: 2,
    icon: FaLaptopCode,
    title: "Development",
    description: "Work on Full Stack Development.",
    category: "Development",

    completed: false,
    progress: 60,
    streak: 12,
    completionRate: 84,

    reminder: "8:30 PM",
    target: "1 Hour",
    notes: "Complete Daily Habits page.",
    skipReason: "",

    history: [true, true, true, false, true, false, true],

    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },

  {
    id: 3,
    icon: FaBook,
    title: "Subject Revision",
    description: "Revise one core subject.",
    category: "Study",

    completed: false,
    progress: 40,
    streak: 8,
    completionRate: 72,

    reminder: "6:00 PM",
    target: "1 Chapter",
    notes: "Revise DBMS today.",
    skipReason: "College Assignment",

    history: [true, false, false, true, true, true, false],

    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },

  {
    id: 4,
    icon: FaBrain,
    title: "Aptitude",
    description: "Practice Quant & Reasoning.",
    category: "Placement",

    completed: true,
    progress: 100,
    streak: 9,
    completionRate: 90,

    reminder: "5:30 PM",
    target: "20 Questions",
    notes: "Focus on Calendar & Clock questions.",
    skipReason: "",

    history: [true, true, true, true, false, true, true],

    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },

  {
    id: 5,
    icon: FaDumbbell,
    title: "Workout",
    description: "Stay fit every day.",
    category: "Fitness",

    completed: false,
    progress: 70,
    streak: 30,
    completionRate: 95,

    reminder: "6:30 AM",
    target: "45 Minutes",
    notes: "Push + Pull workout.",
    skipReason: "",

    history: [true, true, true, true, true, false, true],

    color: "text-red-400",
    bg: "bg-red-500/10",
  },

  {
    id: 6,
    icon: FaPersonRunning,
    title: "Walk",
    description: "Morning walk.",
    category: "Fitness",

    completed: true,
    progress: 100,
    streak: 16,
    completionRate: 88,

    reminder: "7:00 AM",
    target: "5000 Steps",
    notes: "Walk in the park.",
    skipReason: "",

    history: [true, true, false, true, true, true, true],

    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },

  {
    id: 7,
    icon: FaGlassWater,
    title: "Hydration",
    description: "Drink enough water.",
    category: "Health",

    completed: true,
    progress: 100,
    streak: 45,
    completionRate: 97,

    reminder: "Whole Day",
    target: "3 Litres",
    notes: "Track water intake every 2 hours.",
    skipReason: "",

    history: [true, true, true, true, true, true, true],

    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },

  {
    id: 8,
    icon: FaBed,
    title: "Sleep",
    description: "Maintain healthy sleep schedule.",
    category: "Health",

    completed: false,
    progress: 35,
    streak: 5,
    completionRate: 68,

    reminder: "11:00 PM",
    target: "8 Hours",
    notes: "Sleep before midnight.",
    skipReason: "Late coding session",

    history: [false, true, true, false, true, false, true],

    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
];

export default habitsData;