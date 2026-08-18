import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { GoalsProvider } from "../../context/GoalsContext";

function Layout() {
  return (
    <GoalsProvider>
      <div>
        <Sidebar />
        <div className="ml-64 min-h-screen bg-slate-100">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </GoalsProvider>
  );
}
export default Layout;