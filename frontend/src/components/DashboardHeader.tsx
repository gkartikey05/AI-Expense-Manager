import { AlignJustify } from "lucide-react";
import { useLocation } from "react-router-dom";

const DashboardHeader = () => {
  const { pathname } = useLocation();

  console.log(location);

  return (
    <div className="border-b border-b-black/20 px-5 py-3 capitalize text-2xl font-medium text-neutral-800 flex items-center gap-5">
      <AlignJustify className="w-5 h-5 text-neutral-800 cursor-pointer md:hidden" />
      {pathname.replace("/", "")}
    </div>
  );
};

export default DashboardHeader;
