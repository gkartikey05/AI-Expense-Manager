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


const navItems = [
  {
    title: "Dashboard",
    href: "dashboard",
    icon: <LayoutDashboard className="h-5 w-5 text-purple-600" />,
  },
  {
    title: "Transactions",
    href: "transactions",
    icon: <Receipt className="h-5 w-5 text-purple-600" />,
  },
  {
    title: "Budgets & Goals",
    href: "budgets",
    icon: <PiggyBank className="h-5 w-5 text-purple-600" />,
  },
  {
    title: "Ai Analysis",
    href: "insights",
    icon: <LineChart className="h-5 w-5 text-purple-600" />,
  },
  {
    title: "Settings",
    href: "settings",
    icon: <Settings className="h-5 w-5 text-purple-600" />,
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
    <div className="relative h-full bg-white text-gray-800">
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        {isSidebarOpen && (
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Fundly
            </h1>
          </div>
        )}
        <SidebarToggleButton />
      </div>

      {/* navlinks */}
      <ul className="space-y-4 mt-6 px-2">
        {navItems.map((item) => (
          <NavLink
            to={item.href}
            key={item.title}
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 p-2 rounded-lg transition-all duration-200 border-l-4 ${
                isActive
                  ? "border-purple-600 bg-purple-50"
                  : "border-transparent hover:border-purple-400 hover:bg-purple-50/50"
              }`
            }
          >
            {item.icon}
            {isSidebarOpen && <span className="font-medium">{item.title}</span>}
          </NavLink>
        ))}
      </ul>

      {/* user photo and logout */}
      <div className="absolute bottom-0 left-0 right-0 px-2 py-4 bg-gray-50 border-t border-gray-200 flex items-center gap-3">
        {isSidebarOpen && (
          <div className="size-10 rounded-full bg-gray-300 flex items-center justify-center  overflow-hidden">
            {user?.profile ? (
              <img
                src={user.profile}
                alt="profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-5 h-5 flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
            )}
          </div>
        )}

        {isSidebarOpen && (
          <div className="flex-1">
            <p className="text-sm font-medium leading-none text-gray-800">
              {user?.fullName}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        )}

        <button
          onClick={logout}
          className="p-2 hover:bg-purple-50 rounded-full transition cursor-pointer"
        >
          <LogOut className="w-5 h-5 text-purple-600" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
