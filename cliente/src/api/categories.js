import api from "./axiosApi";

export const getCategories = async () => {
  const response = await api.get("/categorias");
  return response.data;
};

export const getFrequentCategories = async () => {
  const resp = await api.get("/categorias/frecuentes");
  return resp.data
};
