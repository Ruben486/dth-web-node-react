import { useMemo, memo } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, Zap, Heart } from "lucide-react";
import { Button } from "./ui/button";

import { config } from "../constants/config";
import { useCart } from "../contexts/CartContext";
import { AuthButtons } from "./AuthButtons";
import { useFavorites } from "@/contexts/FavoriteContext";
import { useAuth } from "../contexts//authContext";

const Navbar = memo(() => {
  const { cartItems } = useCart();
  const { favorites } = useFavorites();
  const { user, logout } = useAuth();

  const memoizedHeart = useMemo(() => <Heart className="h-5 w-5" />, []);
  const memoizedZap = useMemo(() => <Zap className="h-6 w-6 text-blue-600" />, []);

  return (
    <nav className="sticky top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-30 border-b ">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-2">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 flex-1">
          <Link to="/" className="flex items-center gap-2">
            {memoizedZap}
            <h1 className="text-sm lg:text-xl font-semibold">
              {config.nombreEmpresa}
            </h1>
          </Link>
        </div>

        {/* navegacion, favoritos,carrtio  */}
        <div className="hidden md:flex items-center gap-5">
          <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
            Productos
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
            Categorías
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
            Ofertas
          </a>

          <AuthButtons user={user} logout={logout} />

          <Link to="/favorites" viewTransition>
            <Button variant="ghost" size="icon" className="relative">
              {memoizedHeart}
              {favorites.length !== 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-red-500
                  text-white text-xs rounded-full h-5 w-5 flex
                  items-center justify-center"
                >
                  {favorites.length}
                </span>
              )}
            </Button>
          </Link>

          <Link to="/cart" viewTransition>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-8 w-8" />
              {cartItems.length !== 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-red-500
                  text-white text-xs rounded-full h-5 w-5 flex items-center
                  justify-center"
                >
                  {cartItems.length}
                </span>
              )}
            </Button>
          </Link>
        </div>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
});

export default Navbar;
