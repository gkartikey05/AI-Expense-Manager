import axiosInstance from "./axiosInstance";

// add budget
type BudgetType = {
  category: string;
  amount: number;
};

export const addBudget = async (formData: BudgetType) => {
  try {
    const { data } = await axiosInstance.post("/budget/add-budget", formData);
    if (data.success) return data;
  } catch (err: any) {
    const message = err?.response?.data?.message;
    throw new Error(Array.isArray(message) ? message[0] : message);
  }
};

// get Budgets of me
export const getBudgets = async () => {
  try {
    const { data } = await axiosInstance.get("/budget/get-budgets");
    if (data.success) return data.budgets;
  } catch (err: any) {
    const message = err?.response?.data?.message || "Error in getting budgets";
    throw new Error(Array.isArray(message) ? message[0] : message);
  }
};

// delete budget
export const deleteBudget = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete(`/budget/delete-budget/${id}`);
    if (data.success) return data;
  } catch (err: any) {
    const message = err?.response?.data?.message || "Error in deleting budgets";
    throw new Error(message);
  }
};

// update budget

export const updateBudget = async (formData: BudgetType, id: number) => {
  try {
    const { data } = await axiosInstance.put(`/budget/update-budget/${id}`, formData);
    if (data.success) return data;
  } catch (err: any) {
    const message = err?.response?.data?.message;
    throw new Error(Array.isArray(message) ? message[0] : message);
  }
};
