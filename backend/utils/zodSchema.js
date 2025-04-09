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

// transaction schema
const transactionSchema = z.object({
  description: z.string().nonempty("Description is required"),
  category: z.string().nonempty("Category is required"),
  amount: z.number().positive("Amount must be a positive number").min(1),
  type: z.enum(["INCOME", "EXPENSE"], {
    required_error: "Transaction type is required",
  }),
  date: z.string().nonempty("Date is required"),
});

// budget schema
const budgetSchema = z.object({
  category: z.string().nonempty("Category is required"),
  amount: z.number().positive("Amount is required"),
});

module.exports = {
  registerSchema,
  loginSchema,
  userSchema,
  transactionSchema,
  budgetSchema,
};
