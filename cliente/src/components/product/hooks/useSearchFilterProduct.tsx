import { useState } from 'react'
import { config } from '../../../config/config';
import { Product } from '../types/productTypes';

interface FilterProductsProps {
  searchString: string,
  searchCategory: string, 
  products: Product[]
}
// FiletProducts 
const filterProducts = ({searchString,searchCategory,products}:FilterProductsProps) => {
    return (
      products?.filter((product: Product) => {
        const matchesCategory =
          searchCategory === config.allCategoriesCode ||
          product?.idGestion.rubro === searchCategory;

        const matchesSearch =
          product?.descripcion
            .toLowerCase()
            .includes(searchString.toLowerCase());
        return matchesCategory && matchesSearch;
      })
    )
  }
// This hook manages the product filtering and pagination logic
interface UseProductReturn {
  currentProducts: Product[];
  hasMoreProducts: boolean;
  showMore: () => void;
}
// el punto de ingreso
export const useSearchFilterProduct= ({searchString, searchCategory= config.allCategoriesCode,
    products}: FilterProductsProps): UseProductReturn => {
    const itemsToShow = config.itemsVisibles || 6;
    const [visibleProducts, setVisibleProducts] = useState(itemsToShow);
    const filteredProducts = filterProducts({searchString, searchCategory, products});
    const currentProducts = filteredProducts?.slice(0, visibleProducts);
    const hasMoreProducts = visibleProducts < filteredProducts?.length;
    const showMore = () => {
      setVisibleProducts((prev) => Math.min(prev + itemsToShow, filteredProducts?.length));
    };
    return (
      { currentProducts, hasMoreProducts, showMore }
    );
  };
