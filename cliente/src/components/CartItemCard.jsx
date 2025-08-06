import { Minus, Plus, Trash2 } from "lucide-react";
import { LoadImage } from "./LoadImage";
import { useCart } from "../contexts/CartContext";

const CartItemCard = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  return (
    <>
      <div className="w-full flex flex-col md:flex-row gap-6 p-2 bg-white rounded-xl shadow-airbnb"
      >
        {/* imagen */}
        <div className="w-full md:w-40 h-40 object-cover rounded-lg">
          <LoadImage src={item.urlImagen} alt={item.descripcion} />
        </div>

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
          <p className="text-sm text-airbnb-gray-600 mb-4">{item.category}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateQuantity(item._id, Math.max(0, item.quantity - 1))
                }
                className="p-1 rounded-full hover:bg-airbnb-gray-100 text-airbnb-gray-600"
              >
                <Minus className="text-sm md:text-base w-5 h-5" />
              </button>
              <span className="text-sm md:text-base w-8 text-center font-medium">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
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
    </>
  );
};

export default CartItemCard;
