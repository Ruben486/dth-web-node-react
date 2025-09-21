import { memo, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { CreditCard, BookmarkCheck, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import ListaDestacados from "./ListaDestacados";
import { LoadImage } from "../LoadImage";
import { AddToCartButton } from "./AddToCartButton";
import { motionProps } from "../../constants/motionProps"
import { stdBtn } from "../uiDesign/standarUi"
import { Product } from './types/productTypes';
import { formatValor } from '@/services/formatValor'
import { getCategoryDescription } from "./actions/getCategoryDescription";

type ViewProductProps = {
  viewProduct: Product;
  setViewProduct?: (product: Product) => void;
};

const LoadImageComponent = ({ img, alt }) => {
  return (
    <div className="w-full md:w-[60%]">
      <div className="aspect-[4/3] relative overflow-hidden rounded-lg shadow-sm">
        <LoadImage src={img} alt={alt} />
      </div>
    </div>
  )
};


const ViewProduct = memo(({ viewProduct, setViewProduct }: ViewProductProps) => {
  const memoizedViewProduct = useMemo(() => viewProduct, [viewProduct]);
  const discountedPrice = memoizedViewProduct?.precio * (1 - memoizedViewProduct?.porcDtoEfectivo / 100) || 0

  const handleViewProduct = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setViewProduct(null);
  }, [setViewProduct]);

  return (
    <motion.div
      {...motionProps}>
      <div className="w-full overflow-hidden max-w-6xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:gap-8 justify-between p-6">
          <LoadImageComponent img={viewProduct.urlImagen} alt={viewProduct.descripcion} />
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
              <p className="text-sm text-gray-500">
                {getCategoryDescription(memoizedViewProduct?.categoriaId)}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Precio regular: {formatValor(viewProduct?.precio)}
                </span>
              </div>
              {
                discountedPrice > 0 && (
                  <div className="flex items-center gap-2">
                    <BookmarkCheck className="h-6 w-6 text-orange-500" />
                    <span className="text-xl font-semibold text-orange-500">
                      Precio en efectivo: {formatValor(discountedPrice)} (
                      {memoizedViewProduct?.porcDtoEfectivo}% OFF)
                    </span>
                  </div>
                )
              }
              {memoizedViewProduct?.itemsDestacados &&
                <ListaDestacados
                  itemsDestacados={memoizedViewProduct?.itemsDestacados}
                />
              }
              <AddToCartButton
                size="default"
                variant="default"
                className={`"w-full md:w-auto transition-colors duration-200" ${stdBtn.className} }`}
                product={viewProduct}
                text="Agregar al carrito"
              />
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
});
export default ViewProduct;
//{"json":{"_id":"688255d1df7426c6fb4f5dcb","idGestion":"001","descripcion":"Acondicionadores de Aire","frecuente":true,"icono":"AirVent"}}