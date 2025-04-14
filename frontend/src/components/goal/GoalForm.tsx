import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addGoal } from "@/api/goalApi";
import toast from "react-hot-toast";

// zod schema
const formSchema = z.object({
  goalName: z.string().min(1, "Goal name is required"),
  targetAmount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
  savedAmount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Amount must be a positive number",
    }),
  targetDate: z.date().optional(),
});

type FormData = z.infer<typeof formSchema>;

const GoalForm = ({ closeForm }: { closeForm: (value: boolean) => void }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const selectedDate = watch("targetDate");

  const queryClient = useQueryClient();

  // mutation - add or update
  type GoalType = {
    goalName: string;
    targetAmount: number;
    savedAmount: number;
    targetDate?: string;
  };
  const mutation = useMutation({
    mutationFn: (data: GoalType) => addGoal(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      reset();
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // handle submit
  const onSubmit = (data: FormData) => {
    const finalData = {
      ...data,
      targetAmount: Number(data.targetAmount),
      savedAmount: Number(data.savedAmount),
      targetDate: String(data.targetDate),
    };
    console.log("Goal Submitted:", finalData);
    mutation.mutate(finalData);
  };

  return (
    <div className="absolute z-50 inset-0 min-h-screen overflow-hidden bg-black/80 flex items-center justify-center px-4">
      <Card className="w-full max-w-lg bg-white relative">
        {/* form close button */}
        <button
          onClick={() => closeForm(false)}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <X className="size-5" />
        </button>

        <CardHeader>
          <CardTitle className="text-xl font-medium">Add Saving Goal</CardTitle>
          <CardDescription className="text-gray-500">
            Create a new saving goal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* goal name */}
            <div className="space-y-2">
              <Label>Goal Name</Label>
              <Input
                {...register("goalName")}
                placeholder="e.g. New Car , Vacation"
              />
              {errors.goalName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.goalName.message}
                </p>
              )}
            </div>

            {/*Target Amount */}
            <div className="space-y-2">
              <Label>Target Amount</Label>
              <Input {...register("targetAmount")} placeholder="0.00" />
              {errors.targetAmount && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.targetAmount.message}
                </p>
              )}
            </div>

            {/*Saved Amount */}
            <div className="space-y-2">
              <Label>Current Amount Saved</Label>
              <Input {...register("savedAmount")} placeholder="0.00" />
              {errors.savedAmount && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.savedAmount.message}
                </p>
              )}
            </div>

            {/* Date Picker */}
            <div className="space-y-2">
              <Label>Target Date(Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>Pick a target date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setValue("targetDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.targetDate && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.targetDate.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full mt-4"
            >
              {mutation.isPending ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                "Add Goal"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalForm;
