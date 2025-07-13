import { CreditCard, BookmarkCheck, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import ListaDestacados from "./ListaDestacados";
import { LoadImage } from "./LoadImage";
import { motion } from "framer-motion";
import { AddToCartButton } from "./AddToCartButton";
import { memo, useMemo, useCallback } from "react";
import { motionProps } from "../constants/motionProps"
import { stdBtn} from "./uiDesign/standarUi"

type Product = {
  _id: string,
  descripcion: string,
  precio: number,
  urlImagen: string,
  category: string,
  itemsDestacados: string[],
  detalle?: string, 
  porcDtoEfectivo?: number,
};

type ViewProductProps = {
  viewProduct: Product;
  setViewProduct?: (product: Product) => void;
};
const ViewProduct = memo(({ viewProduct, setViewProduct = null }:ViewProductProps) => {

  const memoizedViewProduct = useMemo(() => viewProduct, [viewProduct]);

  const discountedPrice = useMemo(() => {
    return memoizedViewProduct?.precio * (1 - memoizedViewProduct?.porcDtoEfectivo / 100);
  }, [memoizedViewProduct]);

  const memoizedLoadImage = useMemo(() => (
    <LoadImage
      src={memoizedViewProduct?.urlImagen}
      alt={memoizedViewProduct?.descripcion}
    />
  ), [memoizedViewProduct?.urlImagen, memoizedViewProduct?.descripcion]);


  const handleViewProduct = useCallback((e) => {
    e.stopPropagation();
    setViewProduct(null);
  }, [setViewProduct]);

  return (
    <>
      <motion.div    
      {...motionProps}>
        <div className="w-full overflow-hidden max-w-6xl mx-auto relative">
          <div className="flex flex-col md:flex-row md:gap-8 justify-between p-6">
            {/* zona izquierda imagen de producto */}

            <div className="w-full md:w-[60%]">
              <div className="aspect-[4/3] relative overflow-hidden rounded-lg shadow-sm">
                {memoizedLoadImage}
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2 h-6 w-6 bg-white/80 backdrop-blur-sm hover:bg-gray-900 hover:text-white transition-all duration-200"
              onClick={handleViewProduct}
            >
              <EyeOff className={`h-3 w-3 transition-colors duration-200`} />
            </Button>

            {/* Detalles del producto */}
            <section className="w-full md:w-[40%] pt-6 md:pt-0 space-y-3">
              {/* zona derecha */}
              <div className="">
                <h3 className="text-2xl font-bold text-gray-900">
                  {memoizedViewProduct?.descripcion}
                </h3>
                <p className="text-sm text-gray-500">{memoizedViewProduct?.category}</p>
              </div>

              <p className="text-gray-600">{memoizedViewProduct?.detalle}</p>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Precio regular: ${memoizedViewProduct?.precio}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BookmarkCheck className="h-6 w-6 text-orange-500" />
                  <span className="text-xl font-semibold text-orange-500">
                    Precio en efectivo: ${discountedPrice.toFixed(2)} (
                    {memoizedViewProduct?.porcDtoEfectivo}% OFF)
                  </span>
                </div>

                <ListaDestacados
                  itemsDestacados={memoizedViewProduct.itemsDestacados}
                />
                <AddToCartButton
                  size="default"
                  variant="default"
                  className={`"w-full md:w-auto transition-colors duration-200" ${stdBtn.className} }`}
                  product= {viewProduct}
                  text="Agregar al carrito"
                />
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </>
  );
});
export default ViewProduct;
