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
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  // auto login if token is present and share data globally
  useEffect(() => {
    const restoreUser = async () => {
      try {
        const userData = await getUserData();
        if (userData) {
          setUser(userData);
        }
      } catch (err) {
        console.log("User not logged in:", err);
        clearUser();
      }
    };

    restoreUser();
  }, [setUser, clearUser]);

  return (
    <>
      <Toaster />

      <Routes>
        {/* Public routes - redirect to dashboard if user is logged in */}
        <Route
          path="/"
          element={
            <PublicRoute user={user}>
              <LandingPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute user={user}>
              <SignupPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute user={user}>
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* Protected dashboard routes - redirect to login if user is not logged in */}
        <Route
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="transactions" element={<TransactionPage />} />
          <Route path="budgets" element={<BudgetPage />} />
          <Route path="insights" element={<InsightPage />} />
          <Route path="settings" element={<SettingPage />} />
        </Route>

        {/* 404 page  */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
