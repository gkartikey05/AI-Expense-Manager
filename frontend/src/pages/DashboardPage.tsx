import DashboardHeader from "@/components/DashboardHeader";
import BudgetSummary from "@/components/dashboardPage/BudgetSummary";
import IncomeExpenceGraph from "@/components/dashboardPage/IncomeExpenceGraph";
import Overview from "@/components/dashboardPage/Overview";
import RecentTransactions from "@/components/dashboardPage/RecentTransactions";

const DashboardPage = () => {
  return (
    <>
      <DashboardHeader title="Dashboard" />
      <section className="px-4 md:px-6 lg:px-10 py-5 space-y-5">
        {/* overall details */}
        <Overview />
        {/*income and expense graphs */}
        <IncomeExpenceGraph />
        {/* recent transactions */}
        <RecentTransactions />
        {/* budget summary */}
        <BudgetSummary />
      </section>
    </>
  );
};

export default DashboardPage;
