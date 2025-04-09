const { z, date } = require("zod");

// register schema

const registerSchema = z.object({
  fullName: z.string().nonempty("Full name is required"),
  email: z.string().email().nonempty("Email is required"),
  password: z.string().min(6, "Password of minimum 6 length is required"),
});

// login schema
const loginSchema = z.object({
  email: z.string().email().nonempty("Email is required"),
  password: z.string().min(6, "Password of minimum 6 length is required"),
});

// user schema
const userSchema = z.object({
  fullName: z.string().trim().nonempty("Full name is required").optional(),
  phoneNumber: z
    .string()
    .trim()
    .length(10, "Phone number must be 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits")
    .optional(),
});

// transaction type
const transactionSchema = z.object({
  description: z.string().trim().nonempty("Description is required"),
  category: z.string().trim().toUpperCase().nonempty("Category is required"),
  amount: z.number().positive("Amount must be a positive number").min(1),
  type: z.string().toUpperCase().nonempty("Type is required"),
  date: z.string().trim().nonempty("Date is required"),
});

// budget schema
const budgetSchema = z.object({
  category: z.string().toUpperCase().nonempty("Category is required"),
  amount: z.number().positive("Amount is required"),
});

// update budget amount schema
const updatebudgetAmountSchema = z.object({
  amount: z.number().positive("Amount is required"),
});

//goal schema
const goalSchema = z.object({
  goalName: z.string().nonempty("Goal name is required"),
  targetAmount: z.number().positive("Target amount is required"),
  savedAmount: z.number().nonnegative("Saved amount is required"),
  targetDate: z.string().optional(),
});

//update goal schema
const updateGoalSchema = z.object({
  targetAmount: z.number().positive("Target amount is required"),
  savedAmount: z.number().nonnegative("Saved amount is required"),
  targetDate: z.string().optional(),
});

module.exports = {
  registerSchema,
  loginSchema,
  userSchema,
  transactionSchema,
  budgetSchema,
  updatebudgetAmountSchema,
  goalSchema,
  updateGoalSchema,
};
