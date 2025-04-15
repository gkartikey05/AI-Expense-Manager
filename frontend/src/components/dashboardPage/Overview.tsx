import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useDataStore } from "@/store/userDataStore";
import { TrendingDown, TrendingUp } from "lucide-react";

const Overview = () => {
  const data = useDataStore((state) => state.data);

  const { currency, formatNumber } = useCurrency();

  // Calculate % of budget used
  const calcPercentBudgetUsed = (
    totalBudget: number,
    usedBudget: number
  ): number => {
    if (totalBudget === 0) return 0;
    return (usedBudget / totalBudget) * 100;
  };

  // calculate % goal reached
  const calcPercentGoalReached = (
    totalGoalAmount: number,
    totalSavedAmount: number
  ): number => {
    if (totalSavedAmount === 0) return 0;
    return (totalSavedAmount / totalGoalAmount) * 100;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* total income */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-gray-500 text-xl font-medium">
            Total Income
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2 items-end">
          <p className="text-2xl md:text-3xl  font-semibold">
            {currency} {data && formatNumber(data?.totalIncome)}
          </p>
          <TrendingUp className="size-4 text-green-500" />
        </CardContent>
      </Card>

      {/* total expense */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-gray-500 text-xl font-medium">
            Total Expense
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2 items-end">
          <p className="text-2xl md:text-3xl  font-semibold">
            {currency} {data && formatNumber(data?.totalExpense)}
          </p>
          <TrendingDown className="size-4 text-red-500" />
        </CardContent>
      </Card>

      {/* budget used */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-gray-500 text-xl font-medium">
            Budget Used
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2 items-end">
          <p className="text-2xl md:text-3xl  font-semibold">
            {data &&
              calcPercentBudgetUsed(
                data.totalBudget,
                data.totalBudgetSpend
              ).toFixed(1)}
            %
          </p>
          <span className="flex items-center text-green-500">
            of {currency} {data && formatNumber(data?.totalBudget)}
          </span>
        </CardContent>
      </Card>

      {/* saving goals */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-gray-500 text-xl font-medium">
            Saving Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2 items-end ">
          <p className="text-2xl md:text-3xl  font-semibold ">
           {currency} {data && formatNumber(data?.totalGoalAmountSaved)}
          </p>
          <span className="flex items-center text-gray-500">
            of {currency} {data && formatNumber(data?.totalGoalsAmount)}
          </span>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <Progress
            value={
              data &&
              calcPercentGoalReached(
                data.totalGoalsAmount,
                data.totalGoalAmountSaved
              )
            }
          />
          <p className="text-sm text-gray-400">
            {data &&
              calcPercentGoalReached(
                data.totalGoalsAmount,
                data.totalGoalAmountSaved
              ).toFixed(1)}
            %
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Overview;
