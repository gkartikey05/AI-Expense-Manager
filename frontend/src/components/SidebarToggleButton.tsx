import { useDashboardToggle } from "@/contexts/DashboardToggleContext";
import { AlignJustify } from "lucide-react";

const SidebarToggleButton = () => {
  const { setIsSidebarOpen } = useDashboardToggle();

  return (
    <AlignJustify
      onClick={() => setIsSidebarOpen((prev) => !prev)}
      className="w-5 h-5 text-neutral-800 cursor-pointer"
    />
  );
};

export default SidebarToggleButton;
