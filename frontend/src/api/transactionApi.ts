import axiosInstance from "./axiosInstance";

// make transaction
type FormData = {
  description: string;
  amount: number;
  date: string;
  category: string;
  type: string;
};

export const makeTransaction = async (formdata: FormData) => {
  try {
    const { data } = await axiosInstance.post(
      "/transaction/make-transaction",
      formdata
    );

    if (data.success) return data;
    else {
      return data.message;
    }
  } catch (err: any) {
    const message = err?.response?.data?.message || "Something went wrong";
    throw new Error(Array.isArray(message) ? message[0] : message);
  }
};
