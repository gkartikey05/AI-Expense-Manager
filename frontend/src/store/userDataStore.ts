import { create } from "zustand";

// Define FinancialData type
type FinancialData = {
  totalIncome: number;
  totalExpense: number;
  totalBudget: number;
  totalBudgetSpend: number;
  totalGoalsAmount: number;
  totalGoalAmountSaved: number;
};

type DataStore = {
  data: FinancialData | null;
  setData: (data: FinancialData) => void;
};

export const useDataStore = create<DataStore>((set) => ({
  data: null,
  setData: (data) => set({ data }),
}));
