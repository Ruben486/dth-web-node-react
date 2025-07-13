import api from "./axiosApi";

export const verifyCode = async (data) => {
  try {
    const res = await api.post("/auth/verifyCode", data);
    return res;
  } catch (error) {
    return error;
  }
};