import axiosInstance from "./axiosInstance";

// make transaction
type TransactionType = {
  description: string;
  amount: number;
  date: Date;
  category: string;
  type: string;
};

export const makeTransaction = async (formdata: TransactionType) => {
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

// get all transaction of a user
export const getTransaction = async (
  filter: string,
  sort: string,
  search: string,
  page: string
) => {
  try {
    const params = new URLSearchParams();
    if (filter) params.append("filter", filter);
    if (sort) params.append("sort", sort);
    if (search) params.append("search", search);
    if (page) params.append("page", page);

    const { data } = await axiosInstance.get(
      `/transaction/get-transactions?${params.toString()}`
    );

    if (data.success) return data;
  } catch (err: any) {
    const message = err?.response?.data?.message || "Something went wrong";
    throw new Error(Array.isArray(message) ? message[0] : message);
  }
};

//delete a transaction
export const deleteTransaction = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(
      `/transaction/delete-transaction/${id}`
    );
    if (data.success) return data;
  } catch (err: any) {
    throw new Error(err?.response?.data.message);
  }
};

// update a transcation

export const updateTransaction = async (formdata: TransactionType, id: string) => {
  try {
    const { data } = await axiosInstance.put(
      `/transaction/update-transaction/${id}`,
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
