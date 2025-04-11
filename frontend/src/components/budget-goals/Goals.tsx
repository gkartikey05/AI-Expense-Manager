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
import { useState } from "react";
import GoalForm from "../goal/GoalForm";
import AddMoneyForm from "../goal/AddMoneyForm";

const goals = [
  {
    goalName: "Emergency fund",
    targetAmount: 40000,
    savedAmount: 18000,
    targetDate: "Dec 2023",
  },
  {
    goalName: "Vacation to Japan",
    targetAmount: 150000,
    savedAmount: 45000,
    targetDate: "Jun 2025",
  },
  {
    goalName: "Buy a new laptop",
    targetAmount: 80000,
    savedAmount: 25000,
    targetDate: "Sep 2025",
  },
  {
    goalName: "Home down payment",
    targetAmount: 500000,
    savedAmount: 120000,
    targetDate: "Dec 2026",
  },
  {
    goalName: "Wedding fund",
    targetAmount: 300000,
    savedAmount: 60000,
    targetDate: "Mar 2026",
  },
];

const Goals = () => {
  const [openGoalForm, setOpenGoalForm] = useState(false);
  const [openAddMoneyForm, setOpenAddMoneyForm] = useState(false);

  // calculate goal % saved
  const goalSaved = (amount: number, saved: number): number => {
    return (saved / amount) * 100;
  };

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

        {/* goals List */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {goals.map((goal) => (
            <Card key={goal.goalName}>
              {/* Card Header with Goal Name and Edit Button */}
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-xl font-medium">
                  {goal.goalName}
                </CardTitle>
                <button className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
                  <Pencil className="size-4" />
                </button>
              </CardHeader>

              <CardContent>
                {/* Target Amount */}
                <p className="text-gray-500 mb-5">
                  Target: Rs {goal.targetAmount}
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
                      goalSaved(goal.targetAmount, goal.savedAmount).toFixed(0)
                    )}
                  />
                </div>

                {/* Saved and Remaining Amounts */}
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Saved</p>
                    <p className="font-semibold">Rs {goal.savedAmount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Remaining</p>
                    <p className="font-semibold">
                      Rs {goal.targetAmount - goal.savedAmount}
                    </p>
                  </div>
                </div>

                {/* Target Date */}
                <p className="mt-5">Target date: {goal.targetDate}</p>
              </CardContent>

              {/* Add Money Button */}
              <CardFooter>
                <Button
                  onClick={() => setOpenAddMoneyForm(true)}
                  className="w-full cursor-pointer"
                >
                  Add Money to Goal
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      {openGoalForm && <GoalForm closeForm={setOpenGoalForm} />}
      {openAddMoneyForm && <AddMoneyForm closeForm={setOpenAddMoneyForm} />}
    </>
  );
};

export default Goals;
