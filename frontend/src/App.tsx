import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import DashboardPage from "./pages/DashboardPage";
import TransactionPage from "./pages/TransactionPage";
import BudgetPage from "./pages/BudgetPage";
import InsightPage from "./pages/InsightPage";
import SettingPage from "./pages/SettingPage";
import NotFound from "./pages/Notfound";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/userStore";
import { useEffect } from "react";
import { getUserData } from "./api/userApi";

const App = () => {
  const setUser = useUserStore((state) => state.setUser);

  // auto login if token is present and share data globally
  useEffect(() => {
    const restoreUser = async () => {
      try {
        const user = await getUserData();
        if (user) {
          setUser(user);
        }
      } catch (err) {
        console.log("User not logged in:", err);
      }
    };

    restoreUser();
  }, [setUser]);

  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Dashboard />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="transactions" element={<TransactionPage />} />
          <Route path="budgets" element={<BudgetPage />} />
          <Route path="insights" element={<InsightPage />} />
          <Route path="settings" element={<SettingPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
