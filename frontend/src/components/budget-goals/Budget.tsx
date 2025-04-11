import { Pencil, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import BudgetForm from "../budget/BudgetForm";
import { useState } from "react";

const budgets = [
  {
    category: "Housing",
    amount: 5000,
    used: 3600,
  },
  {
    category: "Food",
    amount: 1500,
    used: 1250,
  },
  {
    category: "Transportation",
    amount: 800,
    used: 600,
  },
  {
    category: "Utilities",
    amount: 400,
    used: 300,
  },
  {
    category: "Entertainment",
    amount: 1000,
    used: 450,
  },
];

const Budget = () => {
  const [openBudgetForm, setOpenBudgetForm] = useState(false);

  // percentage budget used
  const calculateUsedBudgetPercent = (amount: number, used: number): number => {
    return (used / amount) * 100;
  };

  return (
    <>
      <div className="mt-5">
        {/* add budget */}
        <Button
          onClick={() => setOpenBudgetForm(true)}
          className="cursor-pointer"
        >
          Add Budget <Plus />
        </Button>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* total budget */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-normal">
                Total Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">Rs 25,000</p>
            </CardContent>
            <CardFooter>
              <p className="text-gray-500">For May,2025</p>
            </CardFooter>
          </Card>
          {/* used */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-normal">Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">Rs 10,000</p>
            </CardContent>
            <CardFooter>
              <p className="text-gray-500">45% of your budget used</p>
            </CardFooter>
          </Card>
          {/* Remaining */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-normal">Remaining</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">Rs 15,000</p>
            </CardContent>
            <CardFooter>
              <p className="text-gray-500">55% of your budget used</p>
            </CardFooter>
          </Card>
        </div>

        {/* budget summary */}
        <h1 className="text-2xl mt-5 font-semibold">Budget Categories</h1>
        <p className="text-gray-500">
          Track spending against your monthly budget categories
        </p>

        <div className="space-y-4 mt-5">
          {budgets.map((budget) => (
            <div key={budget.category} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">{budget.category}</p>
                <button className="cursor-pointer hover:bg-gray-200 p-2 rounded-full">
                  <Pencil className="size-4" />
                </button>
              </div>
              <div className="flex items-center justify-between text-gray-400 text-sm">
                <p>
                  Rs {budget.used} of Rs {budget.amount}
                </p>
                <p className="text-red-500">
                  {calculateUsedBudgetPercent(
                    budget.amount,
                    budget.used
                  ).toFixed(2)}
                  %
                </p>
              </div>
              <Progress
                value={Number(
                  calculateUsedBudgetPercent(
                    budget.amount,
                    budget.used
                  ).toFixed(2)
                )}
              />
            </div>
          ))}
        </div>
      </div>
      {openBudgetForm && <BudgetForm closeForm={setOpenBudgetForm} />}
    </>
  );
};

export default Budget;
