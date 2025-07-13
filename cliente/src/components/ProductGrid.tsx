import { useState, memo, useMemo,lazy } from "react";
import { Button } from "./ui/button";
import { ListTodo } from "lucide-react";
import { config } from "../constants/config";
import useProductStore from "../store/productStore";
const ProductCard = lazy(() =>
  import("./ProductCard").then((module) => ({
    default: module.ProductCard || module.default,
  })) 
);
// import ProductCard from "./ProductCard";
import isEqual from "lodash/isEqual";
import { SectionHeader } from "./SectionHeader";

interface ProductGridProps {
  selectedCategory: string;
  searchQuery?: string;
}
type Product = {
  _id: string;
  descripcion: string;  
  precio: number;
  urlImagen: string;  
  categoriaId: string;
  itemsDestacados: string[];
  detalle?: string;
  porcDtoEfectivo?: number;
  };

const areEqual = (prevProps: ProductGridProps, nextProps: ProductGridProps) => {
  return isEqual(prevProps, nextProps);
};

const ProductGrid = memo(
  
  ({ selectedCategory, searchQuery = "" }: ProductGridProps) => {
    const [visibleProducts, setVisibleProducts] = useState(
      config.itemsVisibles || 6
    );
    const { products } = useProductStore();
    

    // Filtrar productos según la categoría seleccionada
    // esta funcion es candidata a useMemo
    // useMemo(() => proceso,[] proceso es lo que se memoriza lo que retorna (lo que esta despues de flecha)

    const filteredProducts = useMemo(
      () =>
        products.filter((product:Product) => {
          const matchesCategory =
            selectedCategory === "0000" ||
            product.categoriaId === selectedCategory;
          const matchesSearch = product.descripcion
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          return matchesCategory && matchesSearch;
        }),
      [products, selectedCategory, searchQuery]
    );

    const showMore = () => {
      setVisibleProducts((prev) => Math.min(prev + 6, filteredProducts.length));
    };

    const currentProducts = filteredProducts.slice(0, visibleProducts);
    const hasMoreProducts = visibleProducts < filteredProducts.length;

    return (
      <div className="mx-auto py-8">
        <SectionHeader Icon={ListTodo} title={"Nuestros Productos"} />
        <div
          className="grid w-full md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4
       xl:grid-cols-5 2xl:grid-cols-6 gap-4"
        >
          {currentProducts.map((product:Product) => (
            <ProductCard
              key={product._id}
              product={{ ...product }}
              viewInLine={false}
              setViewProduct={null}
            />
          ))}
        </div>
        {hasMoreProducts && (
          <div className="mt-8 flex justify-center">
            <Button
              onClick={showMore}
              className="bg-gray-900 hover:bg-gray-800"
            >
              Ver más productos
            </Button>
          </div>
        )}
      </div>
    );
  },
  areEqual
);

export default ProductGrid;
