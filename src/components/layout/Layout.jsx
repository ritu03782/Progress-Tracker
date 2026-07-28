import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {Outlet} from "react-router-dom";
function Layout(){
  return <>
  <div>
    <Sidebar/>

    <div>
        <Navbar/>
        <Outlet/>
    </div>
  </div>
  </>
}
export default Layout;