import { useState } from "react";
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
import { Calendar as CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const TransactionTypes = [
  { id: 1, title: "income" },
  { id: 2, title: "expense" },
];

const incomeCategories = [
  "Salary",
  "Freelance",
  "Investments",
  "Gift",
  "Other Income",
];

const expenseCategories = [
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
  description: z.string().min(1, "Description is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
  date: z.date({ required_error: "Date is required" }),
  category: z.string().min(1, "Category is required"),
});

type FormData = z.infer<typeof formSchema>;

const TransactionForm = ({
  closeForm,
}: {
  closeForm: (value: boolean) => void;
}) => {
  const [transactionType, setTransactionType] = useState<string>("income");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const selectedDate = watch("date");
  // const category = watch("category");

  const onSubmit = (data: FormData) => {
    const finalData = {
      ...data,
      amount: Number(data.amount),
      type: transactionType,
    };
    console.log("Transaction Submitted:", finalData);
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
          <CardTitle className="text-xl font-medium">Add Transaction</CardTitle>
          <CardDescription className="text-gray-500">
            Enter your transaction details below
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Transaction Type */}
          <div>
            <p className="mb-2 font-medium">Type</p>
            <div className="flex items-center gap-5 mb-6">
              {TransactionTypes.map((type) => (
                <Button
                  onClick={() => setTransactionType(type.title)}
                  variant={
                    transactionType === type.title ? "default" : "outline"
                  }
                  key={type.id}
                  className="flex-1 cursor-pointer uppercase"
                  type="button"
                >
                  {type.title}
                </Button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Description */}
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                {...register("description")}
                placeholder="e.g. Grocery shopping"
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input {...register("amount")} placeholder="0.00" />
              {errors.amount && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.amount.message}
                </p>
              )}
            </div>

            {/* Date Picker */}
            <div className="space-y-2">
              <Label>Date</Label>
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
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setValue("date", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.date && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.date.message}
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
                  {(transactionType === "income"
                    ? incomeCategories
                    : expenseCategories
                  ).map((item) => (
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
              Add Transaction
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionForm;
