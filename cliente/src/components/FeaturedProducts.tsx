import { useState, memo, useEffect } from "react";
import { Button } from "./ui/button";
import { Sparkles, ChevronLeft, ChevronRight, Eye } from "lucide-react";

import { useCart } from "@/contexts/CartContext";
import { useToast } from "./ui/use-toast";
import { useLanguage } from "../contexts/LanguageContext";
import useProductStore from "../store/productStore";
import ProductCard from "./ProductCard";
import { ViewProduct } from "./viewProduct";
import { useScreenSize } from "../hooks/useScreenSizes";
import { it } from "node:test";
import { view } from "framer-motion";

const FeaturedProducts = memo(() => {
  const { productosDestacados } = useProductStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewProduct, setViewProduct] = useState(null);
  const [itemsPerView, setItemsperView] = useState(4);
  const { width, height } = useScreenSize();
  // moviles 480
  // tabletas 768
  // let itemsPerView = 4;

  // let breakPoint = 1200;
  let breakPoint;
  if (width < 769) {
    breakPoint = 768; // Mobile breakpoint
  } else if (width < 990) {
    breakPoint = 990; // Tablet breakpoint
  } else {
    breakPoint = 1200; // Desktop breakpoint
  }

  /* 
  if (width < 769) {  breakPoint = 768; }
  else if (width < 990) { breakPoint = 990; }
  else { breakPoint = 1200; } */

  useEffect(() => {
    if (breakPoint === 768) {
      setItemsperView(2);
    } else if (breakPoint === 990) {
      setItemsperView(3);
    } else {
      setItemsperView(4);
    }
  }, [breakPoint]);

  const destacados = productosDestacados.slice(0, 8); // Show top 8 products
  const maxIndex = destacados.length - itemsPerView;

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleViewProduct = (product) => {
    setViewProduct(product);
  };

  console.log("destacados");

  return (
    <section className=" md:px-3 py-4 bg-gradient-to-tr from-green-50 to-cyan-50">
      {/* zona titulo */}
      <section className="flex md:flex-row my-2 items-center justify-between">
        {/* titulo e icon estrella  */}
        <div className="flex gap-4">
          <Sparkles className="h-4 w-4 md:h-8 md:w-8 text-yellow-400" />

          <h2 className="text-sm md:text-2xl font-bold text-gray-900 mb-2 hover:underline ">
            Productos Destacados
          </h2>
        </div>
        {/* flechas de navegacion */}
        <div className="flex gap-4 items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`p-2 rounded-full border ${
              currentIndex === 0
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            className={`p-2 rounded-full border ${
              currentIndex === maxIndex
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>
      {/* zona Carrusel y los indicadores */}
      <section className="flex flex-col w-full relative overflow-hidden py-2">
        <div
          className="flex w-full transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {destacados.map((product) => (
            <div
              key={product._id}
              className="min-w-[50%] md:min-w-[33%] lg:min-w-[25%] px-2 first:pl-0 last:pr-0 flex"
            >
              <ProductCard
                key={product._id}
                product={{ ...product }}
                viewInLine={true}
                setViewProduct={setViewProduct}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 my-5">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === index
                  ? "bg-airbnb-red w-4"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </section>

      {/* {/* zona detalle */}
      {viewProduct && (
        <ViewProduct
          viewProduct={viewProduct}
          setViewProduct={setViewProduct}
        />
      )}
    </section>
  );
});

export default FeaturedProducts;
