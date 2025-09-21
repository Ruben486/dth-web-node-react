import { useQuery } from "@tanstack/react-query";
import { getProductFromDatabase } from "../apifetch/apiProduct";

export const useQueryProduct = () => {
  const productQuery = useQuery({
    queryKey: ['product'],
    queryFn: getProductFromDatabase,
    staleTime: 1000 * 60 * 60
  });

  const offerQuery = useQuery({
    queryKey: ['offer'],
    queryFn: () => productQuery?.data?.filter(product => product.oferta === true) || [],
    staleTime: 1000 * 60 * 10,
    enabled: productQuery.data !== undefined
  })
    const featuredQuery = useQuery({
    queryKey: ['featured'],
    queryFn: () => productQuery?.data?.filter(product => product.destacado === true) || [],
    staleTime: 1000 * 60 * 10,
    enabled: productQuery.data !== undefined
  })
  return ({
    productQuery,
    offerQuery,
    featuredQuery
  })
};

export const getOffers = () => {
  const { productQuery } = useQueryProduct()
  const products = productQuery.data
  return (
    {
      product: products?.filter(product => product.oferta === true),

    }
  )
};

export const getfeaturedProducts = () => {
  const { productQuery } = useQueryProduct()
  const { data, isLoading } = { ...productQuery }
  return (
    {
      featuredProducts: data?.filter(product => product.destacado === true),
      isLoading
    }
  )
};

