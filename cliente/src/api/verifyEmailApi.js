import api from "./axiosApi";

export const sendVerificationEmail = async (email) => {
  try {
    const res = await api.post("/auth/sendverificationemail", email);
    return res;
  } catch (error) {
    return error;
  }
};
