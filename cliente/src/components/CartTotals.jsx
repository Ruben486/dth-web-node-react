import { useCart } from "../contexts/CartContext";

export const CartTotals = () => {
  const { subtotal, shipping, total } = useCart();
  return (
    <>
      <section>
        <h2 className="text-xl font-medium text-airbnb-gray-700 mb-6">
          Resumen del Pedido
        </h2>
        <div className="p-2 space-y-2">
          <div className="flex justify-between text-airbnb-gray-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-airbnb-gray-600">
            <span>Envío</span>
            <span>{shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="border-t border-airbnb-gray-200 pt-4">
            <div className="flex justify-between text-lg font-medium text-airbnb-gray-700">
              <span>Total</span>
              <span className="text-3xl font-semibold">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
          {shipping > 0 && (
            <p className="text-sm text-airbnb-gray-600 text-center mt-4">
              ¡Agrega ${(1000 - subtotal).toFixed(2)} más para envío gratis!
            </p>
          )}
        </div>
      </section>
    </>
  );
};
