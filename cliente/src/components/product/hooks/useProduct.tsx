import { useState } from 'react'
import { config } from '../../../config/config';
import { useProductStore } from '../store/productStore';
import {Product} from './types/productTypes';      

// FiletProducts 
const filterProducts = (searchQuery: string, selectedCategory: string, products:Product[] ) => {
    return (
        products.filter((product: Product) => {
            const matchesCategory =
                selectedCategory === "0000" ||
                product.categoriaId === selectedCategory;

            const matchesSearch = product.descripcion
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
      })
    )
}
// This hook manages the product filtering and pagination logic
interface UseProductProps {
    searchQuery?: string;
    selectedCategory: string
}
export const useProduct = ({ searchQuery = '', selectedCategory = '0000' }: UseProductProps) => {
    const itemsToShow = config.itemsVisibles || 6; // Default value if not provided
    const [visibleProducts, setVisibleProducts] = useState(itemsToShow);
    const { products } = useProductStore();
    const filteredProducts = filterProducts(searchQuery, selectedCategory, products);
    const currentProducts = filteredProducts.slice(0, visibleProducts);
    const hasMoreProducts = visibleProducts < filteredProducts.length;
    const showMore = () => {
        setVisibleProducts((prev) => Math.min(prev + itemsToShow, filteredProducts.length));
    };
    return (
        {currentProducts,hasMoreProducts, showMore}
    );
};