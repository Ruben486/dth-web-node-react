import React, { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  _id: string;
  descripcion: string;
  precio: number;
  urlImagen: string;
  category: string;
  quantity: number;
  itemsDestacados: string[]
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addCartToStorage: (cartItems:CartItem[]) => void;
  removeCartFromStorage: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);


  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    );
  };

  const updateQuantity = (productId, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addCartToStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(cartItems));
  };

  const removeCartFromStorage = () => {
    localStorage.removeItem("carrito")
  };

  const cargarCartFromStorage = () => {
    setCartItems(JSON.parse(localStorage.getItem("carrito")))
  };

  useEffect(() => {
    if (localStorage.getItem("carrito") !== null) {
      cargarCartFromStorage()
    }
  },[]);

  useEffect(() => {
    if (cartItems.length > 0) {
      addCartToStorage()
    } else {
      removeCartFromStorage()
    }
  },[cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}