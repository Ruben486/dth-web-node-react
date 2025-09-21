import axiosApi from "../../../api/axiosApi";
import { ProductCartProps } from '@/components/cart/types/cartTypes'

interface LoadMPProps {
  cartItems: ProductCartProps[],
}
export const loadMercadoPago = async ({cartItems}:LoadMPProps) => {
  try {
    const data = {
      cartItems, 
    } 
    const res = await axiosApi.post("/mercadopago/createpreferences", data);
    return res;
  } catch (error) {
    return error;
  }
};

export const getPagoPorId = async (paymentId) => {
  try {
    const res = await axiosApi.get("/mercadopago/getpagoporid",paymentId);
    return res;
  } catch (error) {
    return error;
  }
};