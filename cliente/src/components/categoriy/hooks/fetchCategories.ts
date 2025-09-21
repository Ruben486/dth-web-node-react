import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/categories";

export const useAllCategories = () => {
    return useQuery({
      queryKey: ["categories"],
      queryFn: getCategories,
      staleTime: 1000 * 60 * 60
    });
};

export const getFrecCategories = () => {
  const { data:allCategories } = useAllCategories()
  return ( allCategories?.filter(category => category.frecuente)); 
};


/* export const useFrequentCategories = () => {
  return useQuery({
    queryKey: ["frequentCategories"],
    queryFn: getFrequentCategories,
    staleTime: 1000 * 60 * 60, // 1hs
    retry: 1,
  });
}; */
/* export const useFrequentCategories = () => {
  return useQuery({
    queryKey: ["frequentCategories"],
    queryFn: getFrequentCategories,
    staleTime: 1000 * 60 * 60, // 1hs
    retry: 1,
  });
}; */
