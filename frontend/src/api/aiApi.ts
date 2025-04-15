import axiosInstance from "./axiosInstance";

export const getAiAnalysis = async () => {
  try {
    const { data } = await axiosInstance.get("/ai/get-ai-analytics");
    if (data.success) return data.analysis;
  } catch (err: any) {
    const message =
      err?.response?.data?.message || "Error in getting AI response";
    throw new Error(message);
  }
};
