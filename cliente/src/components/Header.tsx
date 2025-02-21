import { Zap, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { config } from "../constants/config";
import { useCart} from "../contexts/CartContext";

const Header = () => {
  const { cartItems } = useCart()
  console.log('header')
  return (
    <nav className="top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b min-h-16 py-4">
      <div className="container flex items-center justify-between mx-auto px-4 gap-4 ">
        <div className="flex iitems-center justify-between gap-4">
          <Zap className="w-8 h-8 text-airbnb-red" />
          <h1 className="text-2xl font-semibold">{config.nombreEmpresa}</h1>
        </div>
        <Link to="/cart" >
          <Button variant= "ghost" className="relative p-2">
            <ShoppingCart size={32} className="text-gray-400" />
            {cartItems.length !== 0 && (<span className="absolute -top-1 -right-1 bg-red-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItems.length}
            </span>)}
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
