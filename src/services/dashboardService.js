import request from "./apiClient";
import { formatDistanceToNow } from "date-fns";

import { TbBinaryTree2 } from "react-icons/tb";
import { MdOutlineTaskAlt } from "react-icons/md";
import { LuFileText } from "react-icons/lu";
import { GiBookshelf } from "react-icons/gi";
import { FaCode, FaTrophy, FaBullseye } from "react-icons/fa";

// Maps the backend's `type` string to a real icon/color — same adapter
// pattern used for habit/subject/goal icons elsewhere.
const TYPE_STYLES = {
  habit: { icon: MdOutlineTaskAlt, color: "text-green-500" },
  dsa: { icon: TbBinaryTree2, color: "text-violet-500" },
  subject: { icon: GiBookshelf, color: "text-orange-500" },
  project: { icon: FaCode, color: "text-cyan-500" },
  application: { icon: LuFileText, color: "text-blue-500" },
  contest: { icon: FaTrophy, color: "text-yellow-500" },
  goal: { icon: FaBullseye, color: "text-pink-500" },
};
const DEFAULT_STYLE = { icon: MdOutlineTaskAlt, color: "text-slate-400" };

function shapeActivity(item, index) {
  const style = TYPE_STYLES[item.type] || DEFAULT_STYLE;
  return {
    id: `${item.type}-${index}-${item.timestamp}`,
    title: item.title,
    description: item.description,
    time: formatDistanceToNow(new Date(item.timestamp), { addSuffix: true }),
    icon: style.icon,
    iconColor: style.color,
  };
}

export async function getRecentActivity() {
  const items = await request("/v1/dashboard/recent-activity", { method: "GET" });
  return items.map(shapeActivity);
}
