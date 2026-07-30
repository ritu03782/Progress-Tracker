import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {Outlet} from "react-router-dom";
function Layout(){
  return <>
  <div>
    <Sidebar/>
    <div className="ml-64 min-h-screen bg-slate-100">
    <Navbar />
    <Outlet />
   </div>
  </div>
  </>
}
export default Layout;