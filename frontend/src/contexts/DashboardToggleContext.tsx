import { createContext, useContext, useState, ReactNode } from "react";

type DashboardToggleContextType = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardToggleContext = createContext<
  DashboardToggleContextType | undefined
>(undefined);

export const DashboardToggleProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <DashboardToggleContext.Provider
      value={{ isSidebarOpen, setIsSidebarOpen }}
    >
      {children}
    </DashboardToggleContext.Provider>
  );
};

export const useDashboardToggle = () => {
  const context = useContext(DashboardToggleContext);
  if (!context) {
    throw new Error(
      "useDashboardToggle must be used within a DashboardToggleProvider"
    );
  }
  return context;
};
