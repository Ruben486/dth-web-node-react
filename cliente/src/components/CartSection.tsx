import { useEffect, useState, useMemo } from "react";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { GoBackButton } from "./GoBackButton";
import { CartItemsList } from "./CartItemsList";
import { SectionHeader } from "./SectionHeader";
import { CartTotals } from "./CartTotals";
import { PaymentProcess } from "./PaymentProcess";

// titulo de Cart
type CartTitleProps = {
  header: JSX.Element,
  cartItemsSize: number,
}
const CartTitle = ({ header, cartItemsSize }: CartTitleProps) => {
  return (
    <div className="px-3 my-4 flex gap-2 items-Start justify-normal">
      {header}
      {cartItemsSize > 0 &&
        <span className="md:text-xl"> {cartItemsSize} items </span>
      }
    </div>
  );
};

// Cart Empty
const EmptyCart = () => {
  return (
    <p className="text-gray-500 flex items-center justify-center">
      El carrito está vacío. Agrega productos para continuar con la compra.
    </p>
  )
};
// submodulos de CartWithItems //
type PaymenComponentProps = {
  total: number,
  user: string,
  paymentProcess: boolean,
  setPaymentProcess: (value:boolean) => void,
}
const PaymentComponent = ({ total, user, paymentProcess,
  setPaymentProcess }: PaymenComponentProps) => {
  return (
    <>
      {total > 0 && (
        <button
          className={`w-full py-3 rounded-lg font-medium ${(!user || paymentProcess)
            ? "bg-gradient-to-r from-slate-300 to-cyan-100 hover:cursor-not-allowed"
            : " bg-gradient-to-r from-airbnb-red to-orange-400 text-white hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:cursor-pointer"
            }`}
          disabled={!user || paymentProcess}
          onClick={() => setPaymentProcess(true)}
        >
          Proceder a la Compra
        </button>
      )
      }
      {!user && (
        <p className="text-sm text-gray-500 mt-2 text-center">
          Inicia sesión para proceder a la compra.
        </p>
      )
      }
      {/* Proceso de pago */}
      {paymentProcess && (
        <PaymentProcess
          user={user}
          setPaymentProcess={setPaymentProcess}
        />
      )
      }
    </>
  );
};

// Cart with items
type CartWithItemsProps = {
  items: JSX.Element,
  user: string,
  paymentProcess: boolean,
  setPaymentProcess: (value: boolean) => void,
  
}
const CartWithItems= ({ items, user, paymentProcess,setPaymentProcess}: CartWithItemsProps) => {
  const { total } = useCart();
  return (
    <section className="container mx-auto px-1 py-2">
      <div className="flex flex-col md:flex-row items-start px-3 justify-between gap-4">
        {items}
        <div className="w-full flex-[40%]  rounded-xl shadow-lg p-1 mb-2">
          <div className="flex flex-col items-center justify-between  ">
            <div className="w-full flex flex-col bg-slate-200 p-4 mb-3 gap-4 rounded-xl shadow-md">
              {/* caja de totales */}
              <CartTotals />
              <PaymentComponent total={total}
                user={user}
                paymentProcess={paymentProcess}
                setPaymentProcess={setPaymentProcess}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Componente Principal //

const CartSection = ({ user }) => {
  const { cartItems } = useCart();
  const [paymentProcess, setPaymentProcess] = useState(false);
  const memoizedSectionHeader = useMemo(
    () => <SectionHeader Icon={ShoppingCart} title={"Carrito de Compras"} />
    , []);

  const memoizedGoBackButton = useMemo(() => <GoBackButton />, []);
  const memoizedCartItemsList = useMemo(() => <CartItemsList />, []);


  useEffect(() => {
    // Desplázate a la parte superior al cargar el componente
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="container mx-auto px-1 py-2">
      {memoizedGoBackButton}
      <CartTitle header={memoizedSectionHeader} cartItemsSize={cartItems.length} />
      {(cartItems.length === 0)
        ? <EmptyCart />
        : <CartWithItems
          items={memoizedCartItemsList}
          user={user}
          paymentProcess={paymentProcess}
          setPaymentProcess={setPaymentProcess}
        />}
    </section>
  );
};

export default CartSection;

