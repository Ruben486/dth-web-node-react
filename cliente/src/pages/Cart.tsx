import { memo, Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/authContext";

const Header = lazy(() => import("../components/Header"));
const CartSection = lazy(() => import("../components/CartSection"));
// import Header from "../components/Header";
// import CartSection from "@/components/CartSection";

const Cart = memo(() => {
  const location = useLocation();
  console.log(location);
  // const user = location.state.user;
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
