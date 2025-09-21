import { memo } from 'react'
import { useLocation } from "react-router-dom";
import { useAuth } from "@/components/user/context/authContext";
import Header from "@/components/header/PageHeader";
import CartSection from "../components/cart/CartSection";
//const Header = lazy(() => import("../components/Header"));
// const CartSection = lazy(() => import("../components/cart/CartSection"));

const Cart = memo(() => {
  const location = useLocation();
  
  const { user } = useAuth();
  return (
    <>
      <div className="bg-white">
        <Header />
        <main className="pt-4 min-h-screen">
          <CartSection user={user} />
        </main>
      </div>
    </>
  );
});

export default Cart;
