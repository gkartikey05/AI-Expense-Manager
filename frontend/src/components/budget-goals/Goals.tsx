import { Loader, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { useState } from "react";
import GoalForm from "../goal/GoalForm";
import AddMoneyForm from "../goal/AddMoneyForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletegoal, getgoals } from "@/api/goalApi";
import toast from "react-hot-toast";
import { useCurrency } from "@/contexts/CurrencyContext";

const Goals = () => {
  const [openGoalForm, setOpenGoalForm] = useState(false);
  const [openAddMoneyForm, setOpenAddMoneyForm] = useState(false);
  const [id, setId] = useState<number>(NaN);

  // calculate goal % saved
  const goalSaved = (amount: number, saved: number): number => {
    return (saved / amount) * 100;
  };

  const { currency, formatNumber } = useCurrency();

  const queryClient = useQueryClient();

  // query to get goals
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["goals"],
    queryFn: getgoals,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  // mutation -delete goal
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deletegoal(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["financialData"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      <div className="mt-5">
        {/* add goal */}
        <Button
          onClick={() => setOpenGoalForm(true)}
          className="cursor-pointer"
        >
          Add Goal <Plus />
        </Button>

        {/* loader */}
        {isPending && (
          <div className="h-32 flex items-center justify-center">
            <Loader className="size-8 text-gray-600 animate-spin" />
          </div>
        )}
        {/* loader */}
        {isError && (
          <div className="h-32 flex items-center justify-center">
            <p>{error.message}</p>
          </div>
        )}

        {/* goals List */}
        {data?.length === 0 ? (
          <div className="">
            <p className="text-center">No goal found!</p>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {data?.map((goal: any) => (
              <Card key={goal.goalName}>
                {/* Card Header with Goal Name and Edit Button */}
                <CardHeader className="flex items-center justify-between">
                  <CardTitle className="text-xl font-medium">
                    {goal.goalName}
                  </CardTitle>
                  <div>
                    <button
                      onClick={() => deleteMutation.mutate(goal.id)}
                      className="p-2 rounded-full hover:bg-gray-200 cursor-pointer"
                    >
                      <Trash className="size-4" />
                    </button>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Target Amount */}
                  <p className="text-gray-500 mb-5">
                    Target: {currency} {formatNumber(goal.targetAmount)}
                  </p>

                  {/* Progress Section */}
                  <div>
                    <p className="flex items-center justify-between text-gray-800 text-sm">
                      <span>Progress</span>{" "}
                      <span>
                        {goalSaved(goal.targetAmount, goal.savedAmount).toFixed(
                          0
                        )}
                        %
                      </span>
                    </p>

                    {/* Visual Progress Bar */}
                    <Progress
                      value={Number(
                        goalSaved(goal.targetAmount, goal.savedAmount).toFixed(
                          0
                        )
                      )}
                    />
                  </div>

                  {/* Saved and Remaining Amounts */}
                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <p className="text-gray-500">Saved</p>
                      <p className="font-semibold">{currency} {formatNumber(goal.savedAmount)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Remaining</p>
                      <p className="font-semibold">
                        {currency} {formatNumber(goal.targetAmount - goal.savedAmount)}
                      </p>
                    </div>
                  </div>

                  {/* Target Date */}
                  <p className="mt-5">
                    Target date:{" "}
                    {goal.targetDate !== "undefined"
                      ? new Date(goal.targetDate)
                          .toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })
                          .replace(",", "")
                      : "Date is not provided"}
                  </p>
                </CardContent>

                {/* Add Money Button */}
                <CardFooter>
                  <Button
                    onClick={() => {
                      setId(goal.id);
                      setOpenAddMoneyForm(true);
                    }}
                    className="w-full cursor-pointer"
                  >
                    Add Money to Goal
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
      {openGoalForm && <GoalForm closeForm={setOpenGoalForm} />}
      {openAddMoneyForm && (
        <AddMoneyForm id={id} closeForm={setOpenAddMoneyForm} />
      )}
    </>
  );
};

export default Goals;
