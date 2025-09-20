import { getData } from "@/api/userApi";
import Sidebar from "@/components/Sidebar";
import { useDashboardToggle } from "@/contexts/DashboardToggleContext";
import { useDataStore } from "@/store/userDataStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const { isSidebarOpen } = useDashboardToggle();
  const setData = useDataStore((state) => state.setData);

  const { data, isError, error} = useQuery({
    queryKey: ["financialData"],
    queryFn: getData,
  });

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data,setData]);

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);


  return (
    <section className="relative flex items-start h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-[250px]" : "w-0 md:w-[80px]"
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
