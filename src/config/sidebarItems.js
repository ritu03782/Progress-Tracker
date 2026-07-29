import { FcHome,FcCalendar,FcSelfServiceKiosk ,FcSettings} from "react-icons/fc";
import { GoGoal } from "react-icons/go";
import { IoRocketSharp } from "react-icons/io5";
import { GiBookshelf,GiTrophyCup } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { LuFileText } from "react-icons/lu";
const sidebarItems = [
   {
      name:"Dashboard",
      path:"/dashboard",
      icon:FcHome,
   },
   {
      name:"Daily Habits",
      path:"/daily-habits",
      icon:FcCalendar,
   },
   {
      name:"DSA Tracker",
      path:"/dsa",
      icon:FcSelfServiceKiosk,
   },
   {
      name:"Subjects",
      path:"/subjects",
      icon:GiBookshelf,
   },
   {
      name:"Goals",
      path:"/goals",
      icon:GoGoal,
   },
   {
      name:"Projects",
      path:"/projects",
      icon:IoRocketSharp,
   },
   {
      name:"Applications",
      path:"/applications",
      icon:LuFileText,
   },
   {
      name:"Contests",
      path:"/contests",
      icon:GiTrophyCup,
   },
   {
      name:"Profile",
      path:"/profile",
      icon:CgProfile,
   },
   {
      name:"Settings",
      path:"/settings",
      icon:FcSettings,
   }

]
export default sidebarItems;