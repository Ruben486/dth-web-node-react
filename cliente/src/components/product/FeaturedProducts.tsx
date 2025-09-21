import { useState, memo, useEffect, lazy, Suspense, useMemo, useCallback } from "react";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import ViewProduct from "./ViewProduct";
import SectionHeader from "../header/SectionHeader";
import { useScreenSize } from "../../hooks/useScreenSizes";
import { Product } from "./types/productTypes";
import { getfeaturedProducts } from "./hooks/useQueryProduct";
import MainLoader from "../MainLoader";

const classNameEnabled = "text-gray-700 border-gray-300 hover:bg-gray-100";
const classNameDisabled = "text-gray-400 border-gray-200 cursor-not-allowed";

const FeaturedProducts = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productToView, setProductToView] = useState<Product | null>(null);
  const [itemsPerView, setItemsperView] = useState(4);
  const { width } = useScreenSize();
  const { featuredProducts: destacados, isLoading } = getfeaturedProducts()

  let breakPoint: number
  if (width < 769) {
    breakPoint = 768; // Mobile breakpoint
  } else if (width < 990) {
    breakPoint = 990; // Tablet breakpoint
  } else {
    breakPoint = 1200; // Desktop breakpoint
  }

  useEffect(() => {
    if (breakPoint === 768) {
      setItemsperView(2);
    } else if (breakPoint === 990) {
      setItemsperView(3);
    } else {
      setItemsperView(4);
    }
  }, [breakPoint]);

  const maxIndex = useMemo(() => destacados?.length - itemsPerView, [destacados, itemsPerView]);
  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  const handleIndicatorClick = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const memoizedSetProductToView = useCallback(setProductToView, []);

  const transformStyle = useMemo(() => ({
    transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
  }), [currentIndex, itemsPerView]);

  { isLoading && <MainLoader /> }

  return (

    <section>
      {/* zona titulo */}
      <section className="flex md:flex-row my-1 items-center justify-between">
        <SectionHeader Icon={Sparkles} title={"Productos Destacados"} />
        {/* flechas de navegacion */}
        <div className="flex gap-4 items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`p-2 rounded-full border ${currentIndex === 0
              ? classNameDisabled
              : classNameEnabled
              }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            className={`p-2 rounded-full border ${currentIndex === maxIndex
              ? classNameDisabled
              : classNameEnabled
              }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>
      {/* zona Carrusel y los indicadores */}
      <section className="flex flex-col w-full relative overflow-hidden py-1">
        <div
          className="flex w-full transition-transform duration-300 ease-in-out"
          style={transformStyle}
        >
          {destacados?.map((product) => (
            <div
              key={product._id}
              className="min-w-[50%] md:min-w-[33%] lg:min-w-[25%] px-2 first:pl-0 last:pr-0 flex"
            >
              <ProductCard
                key={product._id}
                product={product}
                viewInLine={true}
                setProductToView={memoizedSetProductToView}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 my-5">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className={`w-2 h-2 rounded-full transition-all ${currentIndex === index
                ? "bg-airbnb-red w-4"
                : "bg-gray-300 hover:bg-gray-400"
                }`}
            />
          ))}
        </div>
      </section>

      {/* zona detalle */}

      {productToView && (
        <ViewProduct
          viewProduct={productToView}
          setViewProduct={setProductToView}
        />
      )}
    </section>
  );
});

export default FeaturedProducts;
