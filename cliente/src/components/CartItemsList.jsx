import { memo } from "react";
import CartItemCard from "./CartItemCard";
import { useCart } from "../contexts/CartContext";

export const CartItemsList = memo(() => {
  const { cartItems } = useCart();
  return (
    <>
      {/* i-size */}
      <div className="w-full md:flex-[55%]">
        <div className="space-y-3 p-2 overflow-y-scroll">
          {cartItems.map((item) => (
            <CartItemCard key={item._id} item={item}
            />
          ))}
        </div>
      </div>
    </>
  );
});
