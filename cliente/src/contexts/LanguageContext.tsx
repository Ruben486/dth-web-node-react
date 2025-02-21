import React, { createContext, useContext, useState } from "react";

type Language = "en" | "es";

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    heroHeader: "Discover the Home of Your Dreams",
    heroParrafo:"The best selection of products to transform every corner. Explore our categories and find everything you need to create unique spaces. Shop now and make your home a special place!",
    products: "Products",
    categories: "Categories",
    deals: "Deals",
    productNoFound: "Product Not Found",
    seeMore: "See More",
    addToCart: "Add to Cart",
    backToMain: "Return to Main Page",
    shoppingCart: "Shopping Cart",
    emptyCart: "Your cart is empty",
    total: "Total",
    favorites: "My Favorites",
    featuredProducts: "Featured Products",
    quantity: "Qty",
    cartTitle: "Shopping Cart",
    cartEmpty: "Your cart is empty",
    added:  "Added to cart",
    inTheCart: "has been added to your cart.",
    goBack: 'Back',
    features: 'Features',
    details: 'Detalis',
    connectivity:'Conectivity',
    technology: 'Tecnology',
    dimensions: 'Dimensions',
  },
  es: {
    heroHeader: "Descubre el Hogar de tus Sueños",
    heroParrafo: "La mejor selección de productos para transformar cada rincón de tu hogar. Explora nuestras categorías y encuentra todo lo que necesitas para crear espacios únicos. ¡Compra ahora y haz de tu hogar un lugar especial!", 
    products: "Productos",
    categories: "Categorías",
    deals: "Ofertas",
    productNoFound: "No se encontraron Productos",
    seeMore: "Ver Más",
    addToCart: "Agregar al Carrito",
    backToMain: "Volver a la Página Principal",
    shoppingCart: "Carrito de Compras",
    emptyCart: "Tu carrito está vacío",
    total: "Total",
    favorites: "Mis Favoritos",
    featuredProducts: "Nuestros Productos",
    quantity: "Cant",
    cartTitle: "Carrito de Compras",
    cartEmpty: "El Carrito está vacío",
    added: "Agregado al carrito",
    inTheCart: "se ha agregado a tu carrito.",
    goBack: 'Retornar',
    features: 'Características',
    details: 'Detalles',
    connectivity:'Conectividad',
    technology: 'Tecnología',
    dimensions: 'Dimensiones',
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("es");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};