import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { ProductCartProps } from "../types/cartTypes";

import { addItemsToStorage, cargarItemsFromStorage, removeItemsFromStorage }
  from '../../localStorageManager/localStorageStore';

interface CartContextType {
  cartItems: ProductCartProps[];
  addToCart: (product: Omit<ProductCartProps, "quantity">) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  shipping: number;
  total: number;
};

const isLocalStorageAvailable = () => {
  try {
    const testKey = "__test__";
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<ProductCartProps[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setSetshipping] = useState(0);
  const [total, setTotal] = useState(0);

  const addToCart = (product: Omit<ProductCartProps, "quantity">) => {
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
 
  const cargarCartFromStorage = () => {
    if (typeof window !== "undefined" && isLocalStorageAvailable()) {
      const storedCart = cargarItemsFromStorage({ keyName: "carrito" });
      setCartItems(storedCart);
    }
  };


  useEffect(() => {
    if (localStorage.getItem("carrito") !== null) {
      cargarCartFromStorage();
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
     addItemsToStorage({ keyName: "carrito", items: cartItems });
    } else {
      removeItemsFromStorage({ keyName: "carrito" });
    }
  }, [cartItems]);

  useEffect(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.precio * item.quantity,
      0
    );
    setSubtotal(subtotal);
    const shipping = subtotal > 999 ? 0 : subtotal * 0.05; // 5% de envío
    setSetshipping(shipping);
    const total = subtotal + shipping; // Total con envío
    setTotal(total);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        shipping,
        total,
      }}
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
