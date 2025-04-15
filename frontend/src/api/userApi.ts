import axiosInstance from "./axiosInstance";

// get user data
export const getUserData = async () => {
  try {
    const { data } = await axiosInstance.get("/user/get-user");
    if (data.success) {
      return data.user;
    }
    throw new Error("Failed to fetch user");
  } catch (err: any) {
    const message =
      err.response?.data?.message || "Failed to fetch authenticated user.";
    console.log("Auto-auth error:", message);
    throw new Error(message);
  }
};

// update user data
type UpdateType = {
  profile?: File;
  fullName?: string;
  phoneNumber?: string;
};
export const updateUserData = async (formData: UpdateType) => {
  try {
    const { data } = await axiosInstance.put(
      "/user/update-user-data",
      formData
    );
    if (data.success) {
      return data;
    } else {
      return data.message;
    }
  } catch (err: any) {
    const message =
      err?.response?.data?.message || "Something went wrong during update";
    throw new Error(Array.isArray(message) ? message[0] : message);
  }
};

// get user financial data
export const getData = async () => {
  try {
    const { data } = await axiosInstance.get("/user/get-data");
    if (data.success) {
      return data.data;
    }
    throw new Error("Failed to fetch data");
  } catch (err: any) {
    const message = err.response?.data?.message || "Failed to fetch Data";
    throw new Error(message);
  }
};

// get user category breakdown
export const getCategoryBreakdown = async () => {
  try {
    const { data } = await axiosInstance.get("/user/category-breakdown");
    if (data.success) {
      return data;
    }
    throw new Error("Failed to fetch data");
  } catch (err: any) {
    const message = err.response?.data?.message || "Failed to fetch Data";
    throw new Error(message);
  }
};
