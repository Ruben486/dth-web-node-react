import { useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "./ui/button";
import { Minus, Plus, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";

const CartSection = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const { t } = useLanguage();
  console.log(cartItems);

  useEffect(() => {
    // Desplázate a la parte superior al cargar el componente
    window.scrollTo(0, 0);
  }, []);

  if (cartItems.length === 0) {
    return (
      <section className="container py-3">
        <Button variant="ghost" className="mb-3 rounded-full hover:bg-gray-800
         hover:text-white transition-color duration-300"
         onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("goBack")}
        </Button>
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart className="h-6 w-6" />
          <h2 className="text-2xl font-semibold">{t("cartTitle")}</h2>
        </div>
        <p className="text-gray-500 flex items-center justify-center">
          {t("cartEmpty")}
        </p>
      </section>
    );
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );
  const shipping = subtotal > 999 ? 0 : 99.99;
  const total = subtotal + shipping;

  return (
    <section className="container mx-auto px-1 py-2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        exit={{ opacity: 0 }}
      >
        <Button variant="ghost" className="mb-2 bg-gray-700 text-white "
         onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("goBack")}
        </Button>
        {/* icon y titulo */}
        <div className="flex items-center gap-2 my-3">
          <ShoppingCart className="h-6 w-6" />
          <h2 className="md:text-2xl font-semibold">
            {t("cartTitle")}
            <span> {cartItems.length} items </span>
          </h2>
        </div>
        {/* contenedor de datos */}
        <div className="flex flex-col md:flex-row items-start px-3 justify-between gap-6">
          {/* i-size */}
          <div className="w-full md:flex-[35%]">
            <div className="space-y-3 p-2 overflow-y-scroll">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="w-full flex flex-col md:flex-row gap-6 p-2 bg-white rounded-xl shadow-airbnb"
                >
                  {/* imagen */}
                  <img
                    src={item.urlImagen}
                    alt={item.descripcion}
                    className="w-full md:w-40 h-40 object-cover rounded-lg"
                  />
                  {/* info */}
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <h3 className="md:text-lg font-medium text-airbnb-gray-700">
                        {item.descripcion}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="p-1 text-airbnb-gray-600 hover:text-airbnb-red transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-sm text-airbnb-gray-600 mb-4">
                      {item.category}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              Math.max(0, item.quantity - 1)
                            )
                          }
                          className="p-1 rounded-full hover:bg-airbnb-gray-100 text-airbnb-gray-600"
                        >
                          <Minus className="text-sm md:text-base w-5 h-5" />
                        </button>
                        <span className="text-sm md:text-base w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                          className="p-1 rounded-full hover:bg-airbnb-gray-100 text-airbnb-gray-600"
                        >
                          <Plus className="text-sm md:text-base w-5 h-5" />
                        </button>
                      </div>
                      <span className="text-lg font-medium text-airbnb-gray-700">
                        ${(item.precio * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* r-size */}

          <div className="w-full flex-1 bg-white rounded-xl shadow-airbnb p-3">
            <h2 className="text-xl font-medium text-airbnb-gray-700 mb-6">
              Resumen del Pedido
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between text-airbnb-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-airbnb-gray-600">
                <span>Envío</span>
                <span>
                  {shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-airbnb-gray-200 pt-4">
                <div className="flex justify-between text-lg font-medium text-airbnb-gray-700">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-airbnb-red to-orange-300 text-white py-3 rounded-lg font-medium hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                Proceder al pago
              </button>
              {shipping > 0 && (
                <p className="text-sm text-airbnb-gray-600 text-center mt-4">
                  ¡Agrega ${(1000 - subtotal).toFixed(2)} más para envío gratis!
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CartSection;
