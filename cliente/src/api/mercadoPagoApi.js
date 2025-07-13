import axiosApi from "./axiosApi";

export const loadMercadoPago = async (items,user) => {
  try {
    const data = {
      items,
      user
    }
    const res = await axiosApi.post("/mercadopago/createpreferences", data);
    return res;
  } catch (error) {
    return error;
  }
};

export const getPagoPorId = async (paymentId) => {
  console.log(paymentId)
  try {
    const res = await axiosApi.get("/mercadopago/getpagoporid",paymentId);
    console.log(res)
    return res;
  } catch (error) {
    return error;
  }
};