import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { GoalsProvider } from "../../context/GoalsContext";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <GoalsProvider>
      <div>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        {/* Content is only offset by the sidebar's width at `lg` and up —
            below that the sidebar is an off-canvas drawer, not a fixed
            column, so there's nothing to make room for. */}
        <div className="lg:ml-64 min-h-screen bg-slate-100">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
          <Outlet />
        </div>
      </div>
    </GoalsProvider>
  );
}
export default Layout;
