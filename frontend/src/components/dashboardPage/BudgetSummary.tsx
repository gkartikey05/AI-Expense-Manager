import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "../ui/progress";
import { useQuery } from "@tanstack/react-query";
import { getBudgets } from "@/api/budgetApi";
import { useCurrency } from "@/contexts/CurrencyContext";

const BudgetSummary = () => {
  // percentage budget used
  const calculateUsedBudgetPercent = (amount: number, used: number): number => {
    return (used / amount) * 100;
  };

  const { currency, formatNumber } = useCurrency();

  // get budgets
  const { data } = useQuery({
    queryKey: ["budgetSummary"],
    queryFn: getBudgets,
  });

  return (
    <div className="border border-black/20 p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl ">Budget Summary</h1>
        <Link to="/budgets" className="cursor-pointer">
          Manage Budgets
        </Link>
      </div>
      <p className="text-gray-500">Your monthly budget summary</p>

      <div className="space-y-4 mt-5">
        {data?.map((budget: any) => (
          <div key={budget.category} className="space-y-2">
            <p className="text-lg font-semibold">{budget.category}</p>
            <div className="flex items-center justify-between text-gray-400 text-sm">
              <p>
                {currency} {formatNumber(budget.used)} of {currency} {formatNumber(budget.amount)}
              </p>
              <p className="text-red-500">
                {calculateUsedBudgetPercent(budget.amount, budget.used).toFixed(
                  2
                )}
                %
              </p>
            </div>
            <Progress
              value={Number(
                calculateUsedBudgetPercent(budget.amount, budget.used).toFixed(
                  2
                )
              )}
            />
          </div>
        ))}
      </div>

      <Link
        to="/budgets"
        className="mt-8 flex items-center justify-end gap-2 group"
      >
        Manage Budgets
        <MoveRight className="group-hover:translate-x-1 transition-all duration-300" />
      </Link>
    </div>
  );
};

export default BudgetSummary;
