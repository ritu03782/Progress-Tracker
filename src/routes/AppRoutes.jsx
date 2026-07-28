import {createBrowserRouter} from "react-router-dom";
import Layout from "../components/layout/Layout";
import Dashboard from "../pages/Dashboard";
import DailyHabits from "../pages/DailyHabits";
import DSATracker from "../pages/DSATracker";
import Subjects from "../pages/Subjects";
import Goals from "../pages/Goals";
import Projects from "../pages/Projects";
import Applications from "../pages/Applications";
import Contests from "../pages/Contests";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Layout />,
        children:[
            {
                index:true,
                element:<Dashboard/>,
            },
            {
                path:"dashboard",
                element:<Dashboard/>,
            },
            {
                path:"daily-habits",
                element:<DailyHabits/>,
            },
            {
                path:"dsa",
                element:<DSATracker/>,
            },
            {
                path:"subjects",
                element:<Subjects/>,
            },
            {
                path:"goals",
                element:<Goals/>,
            },
            {
                path:"projects",
                element:<Projects/>,
            },
            {
                path:"applications",
                element:<Applications/>,
            },
            {
                path:"contests",
                element:<Contests/>,
            },
            {
                path:"profile",
                element:<Profile/>,
            },
            {
                path:"settings",
                element:<Settings/>,
            },
        ],
    },
]);
export default router;