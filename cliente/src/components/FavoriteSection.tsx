import { useFavorites } from "@/contexts/FavoriteContext";
import ProductCard from "./ProductCard";
import { useEffect } from "react";

const FavoriteSection = () => {
  const { favorites } = useFavorites();

  useEffect(() => {
    // Desplázate a la parte superior al cargar el componente
    window.scrollTo(0, 0);
  }, []);

  if (favorites.length === 0) {
    return (
      <h3 className="flex items-center justify-center text-lg font-semibold text-red-600">
        No hay productos en la Lista de favoritos
      </h3>
    );
  }

  console.log("favoritos");
  return (
    <div className="container mx-auto px-8 md:px-16 py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Favoritos</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
        {favorites.map((product) => (
          <ProductCard key={product._id} product={{ ...product }} />
        ))}
      </div>
    </div>
  );
};

export default FavoriteSection;
