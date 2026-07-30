import {
  TbBinaryTree2,
} from "react-icons/tb";

import {
  MdOutlineTaskAlt,
} from "react-icons/md";

import {
  LuFileText,
} from "react-icons/lu";

import {
  GiBookshelf,
} from "react-icons/gi";

const recentActivityData = [
  {
    id: 1,
    title: "Solved Binary Search",
    description: "Completed LeetCode #704",
    time: "2 hrs ago",
    icon: TbBinaryTree2,
    iconColor: "text-violet-500",
  },

  {
    id: 2,
    title: "Completed React Habit",
    description: "Finished today's frontend practice",
    time: "5 hrs ago",
    icon: MdOutlineTaskAlt,
    iconColor: "text-green-500",
  },

  {
    id: 3,
    title: "Applied to Microsoft",
    description: "Software Engineer Internship",
    time: "Yesterday",
    icon: LuFileText,
    iconColor: "text-blue-500",
  },

  {
    id: 4,
    title: "Completed DBMS Revision",
    description: "Normalization & Joins",
    time: "Yesterday",
    icon: GiBookshelf,
    iconColor: "text-orange-500",
  },
];

export default recentActivityData;