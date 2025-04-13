import { Loader, Pencil, Plus, Trash } from "lucide-react";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBudget, getBudgets } from "@/api/budgetApi";
import { useState } from "react";
import toast from "react-hot-toast";

const Budget = () => {
  const [openBudgetForm, setOpenBudgetForm] = useState(false);
  const [budgetToUpdate, setBudgetToUpdate] = useState(null);

  const queryClient = useQueryClient();
  // percentage budget used
  const calculateUsedBudgetPercent = (amount: number, used: number): number => {
    return (used / amount) * 100;
  };

  // query to get budget
  const { data, isPending, error, isError } = useQuery({
    queryKey: ["budgets"],
    queryFn: getBudgets,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  // query to delete budget
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteBudget(id),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

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

        {/*---------------- Stats--------------- */}
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

        {/* show loader */}
        {isPending && (
          <div className="h-32 flex items-center justify-center">
            <Loader className="size-8 text-gray-600 animate-spin" />
          </div>
        )}

        {/* show Error */}
        {isError && (
          <div className="h-32 flex items-center justify-center">
            <p className="text-red-500">{error?.message}</p>
          </div>
        )}

        {/* show message if there is no budget  */}
        {data?.length === 0 ? (
          <div className="h-32 flex items-center justify-center">
            <p>{data?.message || "No budget to show"}</p>
          </div>
        ) : (
          <div className="space-y-4 mt-5">
            {data?.map((budget: any) => (
              <div key={budget.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">{budget.category}</p>
                  {/* action buttons */}
                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        setBudgetToUpdate(budget);
                        setOpenBudgetForm(true);
                      }}
                      className="cursor-pointer hover:bg-gray-200 p-2 rounded-full"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(budget.id)}
                      className="cursor-pointer hover:bg-gray-200 p-2 rounded-full"
                    >
                      <Trash className="size-4" />
                    </button>
                  </div>
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
        )}
      </div>
      {openBudgetForm && (
        <BudgetForm budgetData={budgetToUpdate} setUpdateDataToNull={setBudgetToUpdate} closeForm={setOpenBudgetForm} />
      )}
    </>
  );
};

export default Budget;
