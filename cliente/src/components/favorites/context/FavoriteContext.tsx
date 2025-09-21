import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { addItemsToStorage, removeItemsFromStorage, cargarItemsFromStorage }
from '../../localStorageManager/localStorageStore';
import type { Product } from '../../product/types/productTypes';

type Favorites = {
  favorites: Product[];
}
interface FavoriteContextType {
  favorites: Product[];
  // actions
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const toggleFavorite = (product: Product) => {

    setFavorites((prev) => {
      const isFavorited = prev.some((fav) => fav._id === product._id);
      if (isFavorited) {
        return prev.filter((fav) => fav._id !== product._id);
      }
      return [...prev, product];
    });
  };
  const isFavoriteInStorage = () => {
    if (localStorage.getItem("favoritos") !== null) return true;
    return false;
  };

  useEffect(() => {
    if (isFavoriteInStorage()) {
      const items = cargarItemsFromStorage({ keyName: "favoritos" });
      if (items) {
        setFavorites(items);
      }
    }
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      addItemsToStorage({
        keyName: "favoritos",
        items: favorites
      });
    } else {
      removeItemsFromStorage({ keyName: "favoritos" });
    }
  }, [favorites]);

  const isFavorite = (productId: string) => {
    return favorites.some((fav) => fav._id === productId);
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoriteProvider");
  }
  return context;
};
