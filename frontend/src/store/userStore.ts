import { create } from "zustand";

export type User = {
  fullName: string;
  email: string;
  password: string;
  profile?: string;
  phoneNumber?: string;
  transactions?: [];
  goals?: [];
  budgets?: [];
};

type AuthState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
