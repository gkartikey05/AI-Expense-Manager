import {
  AlignJustify,
  DollarSign,
  LayoutDashboard,
  LineChart,
  LogOut,
  PiggyBank,
  Receipt,
  Settings,
  User,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    title: "Dashboard",
    href: "dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Transactions",
    href: "transactions",
    icon: <Receipt className="h-5 w-5" />,
  },
  {
    title: "Budgets & Goals",
    href: "budgets",
    icon: <PiggyBank className="h-5 w-5" />,
  },
  {
    title: "Insights & Reports",
    href: "insights",
    icon: <LineChart className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

type SidebarType = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarType) => {
  return (
    <div className="relative h-full">
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-black/20">
        {/* Logo (visible only when sidebar is open) */}
        {isSidebarOpen && (
          <div className="flex items-center gap-2">
            <div className="p-1 border border-black rounded-full">
              <DollarSign className="w-4 h-4 text-black" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Fundly
            </h1>
          </div>
        )}

        {/* Toggle button */}
        <AlignJustify
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="w-5 h-5 text-neutral-800 cursor-pointer"
        />
      </div>

      {/* navlinks */}
      <ul className="space-y-8 mt-5">
        {navItems.map((item) => (
          <NavLink
            to={item.href}
            key={item.title}
            className={({ isActive }) =>
              `flex items-center gap-5 p-2 text-neutral-800 hover:bg-neutral-200 transition-all ${
                isActive
                  ? "border-l-4 border-black bg-neutral-100"
                  : "border-l-4 border-transparent"
              }`
            }
          >
            {item.icon}
            {isSidebarOpen && <p>{item.title}</p>}
          </NavLink>
        ))}
      </ul>

      {/* user photo and logout */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-neutral-100 border-t border-neutral-300 flex items-center gap-3">
        {/* User Avatar */}
        {isSidebarOpen && (
          <div className="w-10 h-10 rounded-full bg-neutral-300 flex items-center justify-center text-white">
            <User className="w-5 h-5 text-black" />
          </div>
        )}

        {/* User Info */}
        {isSidebarOpen && (
          <div className="flex-1">
            <p className="text-sm font-medium leading-none text-black">
              Sandeep Singh
            </p>
            <p className="text-xs text-neutral-500 truncate">
              snayal50@gmail.com
            </p>
          </div>
        )}

        {/* Logout Button/Icon */}
        <button className="p-2 hover:bg-neutral-200 rounded-full transition cursor-pointer">
          <LogOut className="w-5 h-5 text-neutral-900" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
