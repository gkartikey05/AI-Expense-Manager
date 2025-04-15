import {
  LayoutDashboard,
  LineChart,
  LogOut,
  PiggyBank,
  Receipt,
  Settings,
  User,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import SidebarToggleButton from "./SidebarToggleButton";
import { useDashboardToggle } from "@/contexts/DashboardToggleContext";
import { useUserStore } from "@/store/userStore";
import { logoutUser } from "@/api/userAuth";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { assets } from "@/assets/assets";

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
    title: "Ai Analysis",
    href: "insights",
    icon: <LineChart className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useDashboardToggle();

  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const logout = async () => {
    try {
      const res = await logoutUser();
      if (res.success) {
        clearUser();
        queryClient.clear();
        navigate("/");
        toast.success(res.message);
      }
    } catch (err) {
      console.log("error in logout:", err);
    }
  };

  return (
    <div className="relative h-full">
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-black/20">
        {/* Logo (visible only when sidebar is open) */}
        {isSidebarOpen && (
          <div className="flex items-center gap-2">
            <div className="size-16 rounded-full">
              <img
                src={assets.logo}
                alt="logo"
                className="size-full object-cover"
              />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Fundly
            </h1>
          </div>
        )}

        {/* Toggle button */}
        <SidebarToggleButton />
      </div>

      {/* navlinks */}
      <ul className="space-y-8 mt-5">
        {navItems.map((item) => (
          <NavLink
            to={item.href}
            key={item.title}
            onClick={() => setIsSidebarOpen(false)}
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
            {user?.profile ? (
              <img
                src={user?.profile}
                alt="profile"
                className="size-full object-cover rounded-full"
              />
            ) : (
              <User className="w-5 h-5 text-black" />
            )}
          </div>
        )}

        {/* User Info */}
        {isSidebarOpen && (
          <div className="flex-1">
            <p className="text-sm font-medium leading-none text-black">
              {user?.fullName}
            </p>
            <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
          </div>
        )}

        {/* Logout Button/Icon */}
        <button
          onClick={logout}
          className="p-2 hover:bg-neutral-200 rounded-full transition cursor-pointer"
        >
          <LogOut className="w-5 h-5 text-neutral-900" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
