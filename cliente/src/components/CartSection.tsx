import { useEffect, useState, useMemo, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
// const GoBackButton = lazy(() => import("./GoBackButton"));
// const CartItemsList = lazy(() => import("./CartItemsList"));
// const SectionHeader = lazy(() => import("./SectionHeader"));
// const CartTotals = lazy(() => import("./CartTotals"));
import { GoBackButton } from "./GoBackButton";
import { CartItemsList } from "./CartItemsList";
import { SectionHeader } from "./SectionHeader";
import { CartTotals } from "./CartTotals";
import { PaymentProcess } from "./PaymentProcess";

const CartSection = ({ user }) => {
  const { cartItems, total } = useCart();
  const [paymentProcess, setPaymentProcess] = useState(false);
  const [processStep, setProcessStep] = useState("loadWallet");

  const memoizedGoBackButton = useMemo(() => <GoBackButton />, []);
  const memoizedSectionHeader = useMemo(
    () => <SectionHeader Icon={ShoppingCart} title={"Carrito de Compras"} />,
    []
  );
  const memoizedCartItemsList = useMemo(() => <CartItemsList />, []);
  const navigate = useNavigate();

  const handlePaymentProcess = () => {
    setPaymentProcess(true);
  };

  const closePaymentProcess = () => {
    setPaymentProcess(false);
  };

  useEffect(() => {
    // Desplázate a la parte superior al cargar el componente
    window.scrollTo(0, 0);
  }, []);

  if (cartItems.length === 0) {
    return (
      <section className="container py-3">
        {memoizedGoBackButton}
        {memoizedSectionHeader}
        <p className="text-gray-500 flex items-center justify-center">
          El carrito está vacío. Agrega productos para continuar con la compra.
        </p>
      </section>
    );
  }
  return (
    <section className="container mx-auto px-1 py-2">
      
        {memoizedGoBackButton}

        {/* icon y titulo */}
        <div className="px-3 my-4 flex gap-2 items-Start justify-normal">
          {memoizedSectionHeader}
          <span className="md:text-xl"> {cartItems.length} items </span>
        </div>

        {/* contenedor de datos */}
        <div className="flex flex-col md:flex-row items-start px-3 justify-between gap-4">
          {/* lado izquierdo */}
          {memoizedCartItemsList}

          {/* lado derecho */}
          <div className="w-full flex-[40%]  rounded-xl shadow-lg p-1 mb-2">
            <div className="flex flex-col items-center justify-between  ">
              <div className="w-full flex flex-col bg-slate-200 p-4 mb-3 gap-4 rounded-xl shadow-md">
                {/* caja de totales */}
                <CartTotals />

                {total > 0 && (
                  <button
                    className={`w-full py-3 rounded-lg font-medium ${
                      !user
                        ? "bg-gradient-to-r from-slate-300 to-cyan-100 hover:cursor-not-allowed"
                        : " bg-gradient-to-r from-airbnb-red to-orange-400 text-white  hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:cursor-pointer"
                    }`}
                    disabled={!user}
                    onClick={handlePaymentProcess}
                  >
                    Proceder a la Compra
                  </button>
                )}
                {!user && (
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Inicia sesión para proceder a la compra.
                  </p>
                )}
                {/* Proceso de pago */}
                {paymentProcess && (
                  <PaymentProcess
                    user={user}
                    isOpen={paymentProcess}
                    onClose={closePaymentProcess}
                    processStep={processStep}
                    setProcessStep={setProcessStep}
                  />
                )}
              </div>
              <div className="mt-2 bg-slate-200 p-4 rounded-xl w-full flex flex-col items-center justify-center gap-2">
                
              </div>
            </div>
          </div>
        </div>
     
    </section>
  );
};

export default CartSection;
