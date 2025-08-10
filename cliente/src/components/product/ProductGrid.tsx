import { lazy } from "react";
import { ListTodo } from "lucide-react";
import { Button } from "../ui/button";
const ProductCard = lazy(() => import("./ProductCard"));
import { SectionHeader } from "../SectionHeader";
import { useProduct } from "@/components/product/hooks/useProduct";
import { Product } from '../../types/types'

// Componente boton Mas Productos
type MoreProductButtonProps = {
  showMore: () => void
};
const MoreProductsButton= ({showMore}:MoreProductButtonProps) => {
    return (
      <div className="mt-8 flex justify-center">
        <Button onClick={showMore} className="bg-gray-900 hover:bg-gray-800">
          Ver más productos
        </Button>
      </div>
    )
  };

// Compoente principal
interface ProductGridProps {
  searchQuery?: string;
  selectedCategory: string
}
const ProductGrid=({ searchQuery= '', selectedCategory }: ProductGridProps) => {
  // Filtrar productos según la categoría seleccionada
  // esta funcion es candidata a useMemo
  // useMemo(() => proceso,[] proceso es lo que se memoriza lo que retorna (lo que esta despues de flecha)
  const {currentProducts, hasMoreProducts, showMore }= useProduct({searchQuery, selectedCategory});

  return (
    <div className="mx-auto py-8">
      <SectionHeader Icon={ListTodo} title={"Nuestros Productos"} />
      <div
        className="grid w-full md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4
       xl:grid-cols-5 2xl:grid-cols-6 gap-4"
      >
        {currentProducts.map((product: Product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
      {hasMoreProducts && (<MoreProductsButton showMore={showMore}/>)}
    </div>
  );
}

export default ProductGrid;
