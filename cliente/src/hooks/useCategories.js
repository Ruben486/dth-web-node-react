import { useQuery, useQueryClient} from "@tanstack/react-query";
import { getCategories } from "../api/categories";
import { getFrequentCategories } from "../api/categories";

export const useCategories = () => {
  return (
    useQuery({
        queryKey:['categories'], 
        queryFn: getCategories,
    }) 
  )
}; 

export const useFrequentCategories = () => {
  return (
    useQuery({
      queryKey:['frequentCategories'],
      queryFn: getFrequentCategories,
      staleTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
    })
  )
};