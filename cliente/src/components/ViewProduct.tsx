import { ShoppingCart, CreditCard, BookmarkCheck, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "./ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import ListaDestacados from "./ListaDestacados";
import { motion, AnimatePresence } from "framer-motion";

const ViewProduct = ({ viewProduct, setViewProduct = null }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { t } = useLanguage();

  const discountedPrice =
    viewProduct?.precio * (1 - viewProduct?.porcDtoEfectivo / 100);

  const handleAddToCart = () => {
    addToCart(viewProduct);
    toast({
      title: t("added"),
      description: `${viewProduct.descripcion} ${t("inTheCart")}`,
    });
  };

  const handleViewProduct = (e) => {
    e.stopPropagation();
    setViewProduct(null);
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        exit={{ opacity: 0 }}
      >
        <div className="w-full overflow-hidden max-w-6xl mx-auto relative">
          <div className="flex flex-col md:flex-row md:gap-8 justify-between p-6">
            {/* zona izquierda imagen de producto */}

            <div className="w-full md:w-[60%]">
              <div className="aspect-[4/3] relative overflow-hidden rounded-lg shadow-sm">
                <img
                  src={viewProduct?.urlImagen}
                  alt={viewProduct?.descripcion}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2 h-6 w-6 bg-white/80 backdrop-blur-sm hover:bg-gray-900 hover:text-white  transition-all duration-200"
              onClick={handleViewProduct}
            >
              <EyeOff className={`h-3 w-3 transition-colors duration-200`} />
            </Button>

            {/* Detalles del producto */}
            <section className="w-full md:w-[40%] pt-6 md:pt-0 space-y-3">
              {/* zona derecha */}
              <div className="">
                <h3 className="text-2xl font-bold text-gray-900">
                  {viewProduct?.descripcion}
                </h3>
                <p className="text-sm text-gray-500">{viewProduct?.category}</p>
              </div>

              <p className="text-gray-600">{viewProduct?.detalle}</p>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Precio regular: ${viewProduct?.precio}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BookmarkCheck className="h-6 w-6 text-orange-500" />
                  <span className="text-xl font-semibold text-orange-500">
                    Precio en efectivo: ${discountedPrice.toFixed(2)} (
                    {viewProduct?.porcDtoEfectivo}% OFF)
                  </span>
                </div>

                <ListaDestacados
                  itemsDestacados={viewProduct.itemsDestacados}
                />

                <Button
                  onClick={handleAddToCart}
                  className="w-full md:w-auto bg-gray-900 hover:bg-gray-800 text-white transition-colors duration-200"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Agregar al carrito
                </Button>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </>
  );
};
export default ViewProduct;