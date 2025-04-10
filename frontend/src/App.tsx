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

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route  element={<Dashboard />}>
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
