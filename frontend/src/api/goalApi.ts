import axiosInstance from "./axiosInstance";

// add goal

type GoalType = {
  goalName: string;
  targetAmount: number;
  savedAmount: number;
  targetDate?: Date;
};

export const addGoal = async (formData: GoalType) => {
  try {
    const { data } = await axiosInstance.post("/goal/add-goal", formData);
    if (data.success) return data;
  } catch (err: any) {
    const message = err?.response?.data?.message || "Error in adding goal";
    throw new Error(Array.isArray(message) ? message[0] : message);
  }
};

//get all goals
export const getgoals = async () => {
  try {
    const { data } = await axiosInstance.get("/goal/get-goals");
    if (data.success) return data.goals;
  } catch (err: any) {
    const message = err?.response?.data?.message || "Error in adding goal";
    throw new Error(Array.isArray(message) ? message[0] : message);
  }
};

// delete a goal
export const deletegoal = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete(`/goal/delete-goal/${id}`);
    if (data.success) return data;
  } catch (err: any) {
    const message = err?.response?.data?.message || "Error in deleting goal";
    throw new Error(message);
  }
};

// add money to goal
type Amount = {
  amount: number;
};
export const addMoneyTogoal = async (id: number | null, formData: Amount) => {
  try {
    const { data } = await axiosInstance.patch(
      `/goal/add-amount/${id}`,
      formData
    );
    if (data.success) return data;
  } catch (err: any) {
    const message = err?.response?.data?.message || "Error in deleting goal";
    throw new Error(message);
  }
};
