import SidebarToggleButton from "./SidebarToggleButton";
import { useDashboardToggle } from "@/contexts/DashboardToggleContext";

const DashboardHeader = ({ title }: { title: string }) => {


  const { isSidebarOpen } = useDashboardToggle();

  return (
    <div className="border-b border-b-black/20 px-5 py-3 capitalize text-2xl font-medium text-neutral-800 flex items-center gap-5">
      {!isSidebarOpen && (
        <div className="block md:hidden">
          <SidebarToggleButton />
        </div>
      )}
      {title}
    </div>
  );
};

export default DashboardHeader;
