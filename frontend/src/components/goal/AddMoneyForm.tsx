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
import { Loader, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMoneyTogoal } from "@/api/goalApi";
import toast from "react-hot-toast";

// zod schema
const formSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Amount must be a positive number",
    }),
});

type FormData = z.infer<typeof formSchema>;

const AddMoneyForm = ({
  id,
  closeForm,
}: {
  id: number;
  closeForm: (value: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const queryClient = useQueryClient();

  // mutate - path (add money to goal)
  const patchMutate = useMutation({
    mutationFn: (data: { amount: number }) => addMoneyTogoal(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["financialData"] });
      reset();
      closeForm(false);
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
      amount: Number(data.amount),
    };
    console.log("Amount Submitted:", finalData);
    patchMutate.mutate(finalData);
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
          <CardTitle className="text-xl font-medium">Add Amount</CardTitle>
          <CardDescription className="text-gray-500">
            Add amount to goal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/*Target Amount */}
            <div className="space-y-2">
              <Label>Add Amount</Label>
              <Input {...register("amount")} placeholder="0.00" />
              {errors.amount && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.amount.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={patchMutate.isPending}
              className="w-full mt-4 cursor-pointer"
            >
              {patchMutate.isPending ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                "Add Amount"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddMoneyForm;
