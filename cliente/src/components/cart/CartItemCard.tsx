import { LucideProps, Minus, Plus, Trash2 } from "lucide-react";
import { LoadImage } from "../LoadImage";
import { useCart } from "./context/CartContext";
import { formatValor } from '../../services/formatValor';

const ItemImg = ({ url, descripcion }) => {
  return (
    <div className="w-full md:w-40 h-40 object-cover rounded-lg">
      <LoadImage src={url} alt={descripcion} />
    </div>
  )
};

const ItemInfoZona1 = ({ id, descripcion, removeFromCart }) => {
  return (
    <div className="flex justify-between mb-2">
      <h3 className="md:text-lg font-medium text-airbnb-gray-700">
        {descripcion}
      </h3>
      <button
        onClick={() => removeFromCart(id)}
        className="p-1 text-airbnb-gray-600 hover:text-airbnb-red transition-colors"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};
type Zona3ButtonsProps = {
  id: string,
  updateQuantity: (id:string, quantity:number) => void,
  quantity:number,
  Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> 
        & React.RefAttributes<SVGSVGElement>>
};

const Zona3Buttons = ({ id, updateQuantity, quantity, Icon }: Zona3ButtonsProps) => {
  return (
    <button
      onClick={() => updateQuantity(id, quantity)}
      className="p-1 bg-zinc-200 duration-200 hover:bg-gray-900 hover:text-white rounded-md"
    >
      <Icon className="text-sm md:text-base w-5 h-5" />
    </button>
  )
};

const ItemInfoZona3 = ({ id, quantity, precio, updateQuantity }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Zona3Buttons
          id={id}
          updateQuantity={updateQuantity}
          quantity={Math.max(0, quantity - 1)}
          Icon={ Minus }
        >
        </Zona3Buttons>
        <span 
          className="text-xl font-semibold w-10 h-10 text-center text-pink-800 
                     border-2 border-gray-100 rounded-full bg-slate-200"
        >
          {quantity}
        </span>

        <Zona3Buttons 
          id={id}
          updateQuantity={updateQuantity}
          quantity={quantity + 1}
          Icon={ Plus }
          >
        </Zona3Buttons>
      </div>
      <span className="text-2xl text-airbnb-gray-700">
        {formatValor((precio * quantity))}
      </span>
    </div>
  );
};


const CartItemCard = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  return (
    <div
      className="w-full flex flex-col md:flex-row gap-6 p-2 bg-white rounded-xl shadow-airbnb"
    >
      <ItemImg url={item.urlImagen} descripcion={item.descripcion} />

      <div className="flex-1">
        <ItemInfoZona1
          id={item._id}
          descripcion={item.descripcion}
          removeFromCart={removeFromCart}
        />
        <p className="text-sm text-airbnb-gray-600 mb-4">{item.category}</p>
        <ItemInfoZona3
          id={item._id}
          quantity={item.quantity}
          precio={item.precio}
          updateQuantity={updateQuantity}
        />
      </div>
    </div>
  );
};
export default CartItemCard;
