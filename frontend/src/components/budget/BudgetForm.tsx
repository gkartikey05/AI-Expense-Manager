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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { X } from "lucide-react";

const categories = [
  "Food",
  "Housing",
  "Transportation",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Healthcare",
  "Education",
  "Personal",
  "Debt",
  "Other",
];

// zod schema
const formSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
  category: z.string().min(1, "Category is required"),
});

type FormData = z.infer<typeof formSchema>;

const BudgetForm = ({ closeForm }: { closeForm: (value: boolean) => void }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    const finalData = {
      ...data,
      amount: Number(data.amount),
    };
    console.log("Budget Submitted:", finalData);
  };

  return (
    <div className="absolute z-50 inset-0 min-h-screen overflow-hidden bg-black/70 flex items-center justify-center px-4">
      <Card className="w-full max-w-lg bg-white relative">
        {/* form close button */}
        <button
          onClick={() => closeForm(false)}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <X className="size-5" />
        </button>

        <CardHeader>
          <CardTitle className="text-xl font-medium">Add Budget</CardTitle>
          <CardDescription className="text-gray-500">
            Create a new budget category and amount
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Amount */}
            <div className="space-y-2">
              <Label>Monthly Budget Amount</Label>
              <Input {...register("amount")} placeholder="0.00" />
              {errors.amount && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.amount.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Select onValueChange={(val) => setValue("category", val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full mt-4">
              Add Budget
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetForm;
