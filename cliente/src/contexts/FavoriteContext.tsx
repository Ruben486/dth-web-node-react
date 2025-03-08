import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface Product {
  _id: string;
  descripcion: string;
  precio: number;
  category: string;
  urlImagen: string;
  itemsDestacados: string[];
}

interface FavoriteContextType {
  favorites: Product[];
  // actions
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
  isFavoriteInStorage: () => boolean;
  addFavoriteToStorage: () => void;
  removeFavoritesFromStorage: () => void;
  cargarFavoritosFromLocalStorage: () => void;
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

  useEffect(() => {
    if (isFavoriteInStorage()) {
      cargarFavoritosFromLocalStorage()
    }  
  }, []);

  useEffect(()=> {
    if (favorites.length > 0) {
      addFavoriteToStorage(favorites);
    } else {
      removeFavoritesFromStorage();
    }
  },[favorites])

  const isFavorite = (productId: string) => {
    return favorites.some((fav) => fav._id === productId);
  };

  const isFavoriteInStorage = () => {
    if (localStorage.getItem("favoritos") !== null) return true;
    return false;
  };

  const addFavoriteToStorage = (favorites) => {
    localStorage.setItem("favoritos", JSON.stringify(favorites));
  };

  const removeFavoritesFromStorage = () => {
    if (isFavoriteInStorage()) {
      localStorage.removeItem("favoritos");
    }
  };

  const cargarFavoritosFromLocalStorage = () => {
    setFavorites(JSON.parse(localStorage.getItem("favoritos")));
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        isFavoriteInStorage,
        removeFavoritesFromStorage,
        cargarFavoritosFromLocalStorage,
        addFavoriteToStorage
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
