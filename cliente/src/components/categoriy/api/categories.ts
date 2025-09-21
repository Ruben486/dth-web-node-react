import api from "../../../api/axiosApi";
import {Category } from '../types/categoryType'
export const getCategories = async ():Promise<Category[]> => {
  const res = await api.get("/categorias");
  return res.data;
};

export const getFrequentCategories = async () => {
  const res = await api.get("/categorias/frecuentes");
  return res.data
};
