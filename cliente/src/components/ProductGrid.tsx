import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import { useState,memo,useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ListTodo } from "lucide-react";
import { config }  from "../constants/config";
import useProductStore  from "../store/productStore";


interface ProductGridProps {
  selectedCategory: string;
  searchQuery?: string;
}

const ProductGrid = memo(({ selectedCategory, searchQuery = "" }: ProductGridProps) => {
  const [visibleProducts, setVisibleProducts] = useState(config.itemsVisibles || 6);
  const { products} = useProductStore();
  const { t } = useLanguage();

  // Filtrar productos según la categoría seleccionada
  // esta funcion es candidata a useMemo
  // useMemo(() => proceso,[] proceso es lo que se memoriza lo que retorna (lo que esta despues de flecha)
  const filteredProducts = useCallback(products.filter((product) => {
    const matchesCategory = selectedCategory === "0000" ||
     product.categoriaId === selectedCategory;
    const matchesSearch = product.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }),[products,selectedCategory,searchQuery]);

  const showMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 6, filteredProducts.length));
  };

  const currentProducts = filteredProducts.slice(0, visibleProducts);
  const hasMoreProducts = visibleProducts < filteredProducts.length;

  return (
    <div className="mx-auto py-8">
      <div className="flex justify-start items-start gap-4">
        <ListTodo className="h-8 w-8 text-red-500"/>
        <h2 className="text-2xl font-bold text-gray-900 mb-8 hover:border-b-2
         border-red-500 transition-color duration-500">
          {t("featuredProducts")}
        </h2>
      </div>
      <div className="grid w-full md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4
       xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {currentProducts.map((product) => (
          <ProductCard key={product._id} product={{...product}} viewInLine={false}/>
        ))}
      </div>
      {hasMoreProducts && (
        <div className="mt-8 flex justify-center">
          <Button onClick={showMore} className="bg-gray-900 hover:bg-gray-800">
            {t("seeMore")}
          </Button>
        </div>
      )}
    </div>
  );
});

export default ProductGrid;
