import Sidebar from "@/components/Sidebar";
import { useDashboardToggle } from "@/contexts/DashboardToggleContext";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const { isSidebarOpen } = useDashboardToggle();

  return (
    <section className="relative flex items-start h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-[250px]" : "w-0 md:w-[50px]"
        } absolute md:relative z-50 bg-white h-full border-r border-r-black/20 transition-[width] duration-300 ease-in-out overflow-hidden`}
      >
        <Sidebar />
      </aside>

      {/* Main content */}
      <main className="flex-1 h-full overflow-y-scroll hide-scrollbar">
        <Outlet /> 
      </main>
    </section>
  );
};

export default Dashboard;
