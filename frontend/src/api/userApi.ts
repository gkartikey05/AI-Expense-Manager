import axiosInstance from "./axiosInstance";


// get user data
export const getUserData = async () => {
  try {
    const { data } = await axiosInstance.get("/user/get-user");
    if (data.success) {
      return data.user;
    }
    throw new Error("Failed to fetch user");
  } catch (err:any) {
    const message =
      err.response?.data?.message || "Failed to fetch authenticated user.";
    console.log("Auto-auth error:", message);
    throw new Error(message); 
  }
};
