import api from "./axiosApi";

export const getCategories = async () => {
  const res = await api.get("/categorias");
  return res.data;
};

export const getFrequentCategories = async () => {
  const res = await api.get("/categorias/frecuentes");
  return res.data
};
