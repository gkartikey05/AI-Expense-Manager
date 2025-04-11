import Budget from "@/components/budget-goals/Budget";
import Goals from "@/components/budget-goals/Goals";
import DashboardHeader from "@/components/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BudgetPage = () => {
  return (
    <>
      <DashboardHeader title="Budget and Goals" />

      <section className="px-4 md:px-6 lg:px-10 py-5 space-y-5">
        <h1 className="text-2xl">Budget and Goals</h1>
        <p className="text-gray-500">
          Manage your monthly budget and saving goals
        </p>

        {/* tabs */}
        <Tabs defaultValue="budget" className="w-full">
          <TabsList>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="goals">Saving Goals</TabsTrigger>
          </TabsList>
          <TabsContent value="budget">
            <Budget />
          </TabsContent>
          <TabsContent value="goals">
            <Goals />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};

export default BudgetPage;
