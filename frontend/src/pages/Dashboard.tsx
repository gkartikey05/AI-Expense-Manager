import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  return (
    <section className="relative flex items-start h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-[250px]" : "w-[50px]"
        } h-full border-r border-r-black/20 transition-[width] duration-300 ease-in-out`}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </aside>

      {/* Main content */}
      <main className="flex-1 h-full overflow-y-scroll">
        <Outlet />
      </main>
    </section>
  );
};

export default Dashboard;
