
import { ListTodo, ArrowUpFromDot, FileStack } from "lucide-react";
import { Button } from "../ui/button";
import { SectionHeader } from "../header/SectionHeader";
import { useSearchFilterProduct } from "@/components/product/hooks/useSearchFilterProduct";
import { useQueryProduct } from './hooks/useQueryProduct'
import ProductCard from "./ProductCard";

import type { Product } from './types/productTypes'
import { Loader } from "../Loader";

type MoreProductButtonProps = {
  showMore: () => void
};
const MoreProductsButton = ({ showMore }: MoreProductButtonProps) => {
  return (
    <div className="mt-8 flex justify-center">

      <Button
        onClick={showMore}
        className={
          ["group relative bg-gray-900 hover:bg-gray-800",
            "hover:bg-purple-600 hover:text-white ",
            "transition-all duration-300",
          ].join(' ')
        }
        onMouseEnter={e => (e.currentTarget.style.paddingLeft = "2.5rem")}
        onMouseLeave={e => (e.currentTarget.style.paddingLeft = "")}
        // style={{ paddingLeft: "2.5rem" }}
      >
        <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <FileStack size={20} />
        </span>

        Ver más productos
      </Button>
    </div>
  )
};

// Compoente principal
interface ProductGridProps {
  searchString?: string;
  searchCategory: string
}
const ProductGrid = ({ searchString, searchCategory }: ProductGridProps) => {

  const { productQuery } = useQueryProduct();
  const { data: products, isLoading } = { ...productQuery }
  const { currentProducts, hasMoreProducts, showMore } = useSearchFilterProduct(
    { searchString, searchCategory, products });
  isLoading && <Loader />
  return (
    <div className="mx-auto py-8">
      <SectionHeader Icon={ListTodo} title={"Nuestros Productos"} />
      <div
        className="grid w-full md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4
       xl:grid-cols-5 2xl:grid-cols-6 gap-4"
      >
        {currentProducts?.map((product: Product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
      {hasMoreProducts && (<MoreProductsButton showMore={showMore} />)}
    </div>
  );
}
export default ProductGrid;
// className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"