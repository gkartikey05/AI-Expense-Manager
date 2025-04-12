import axiosInstance from "./axiosInstance";

type User = {
  fullName: string;
  email: string;
  password: string;
};

// register user
export const registerUser = async (formData: User) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", formData);

    if (data.success) {
      return data;
    } else {
      throw new Error(data.message || "Registration failed.");
    }
  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      "Something went wrong during registration.";
    throw new Error(Array.isArray(message) ? message[0] : message);
  }
};

// login user
type UserLogin = {
  email: string;
  password: string;
};

export const loginUser = async (formData: UserLogin) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", formData);

    if (data.success) {
      return data;
    } else {
      throw new Error(data.message || "login failed.");
    }
  } catch (err: any) {
    const message =
      err?.response?.data?.message || "Something went wrong during login.";
    throw new Error(Array.isArray(message) ? message[0] : message);
  }
};

// Logout
export const logoutUser = async () => {
  try {
    const { data } = await axiosInstance.get("/auth/logout");

    if (data.success) {
      return data;
    } else {
      throw new Error(data.message || "login failed.");
    }
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};
