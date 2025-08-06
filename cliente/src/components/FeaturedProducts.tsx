import { useState, memo, useEffect, lazy, Suspense, useMemo, useCallback } from "react";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import useProductStore from "../store/productStore";
import {Loader} from "./Loader";

const ProductCard = lazy(() => import("./ProductCard"))
const ViewProduct = lazy(() => import("./ViewProduct"));
const SectionHeader = lazy(() => import("./SectionHeader"));
import { useScreenSize } from "../hooks/useScreenSizes";
import { Product} from "../types/types";

const FeaturedProducts = memo(() => {
  const { productosDestacados } = useProductStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewInLine, setViewInLine] = useState<boolean>(true)
  const [productToView, setProductToView]= useState<Product | null>(null);
  const [itemsPerView, setItemsperView] = useState(4);
  const { width } = useScreenSize();

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

  const destacados = useMemo(() => productosDestacados.slice(0, 8), [productosDestacados]);
  const maxIndex = useMemo(() => destacados.length - itemsPerView, [destacados, itemsPerView]);

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

  const classNameEnabled = "text-gray-700 border-gray-300 hover:bg-gray-100"
  const classNameDisabled = "text-gray-400 border-gray-200 cursor-not-allowed"
  console.log("destacados");

  const transformStyle = useMemo(() => ({
    transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
  }), [currentIndex, itemsPerView]);

  // Memoize ChevronLeft to prevent unnecessary re-renders
  const memoizedChevronLeft = useMemo(() => <ChevronLeft className="w-6 h-6" />, []);

  return (
    <>
      <section className=" p-3 bg-gradient-to-tr from-green-50 to-cyan-50">
        {/* zona titulo */}
        <section className="flex md:flex-row my-2 items-center justify-between">
          <SectionHeader Icon={Sparkles} title={"Productos Destacados"} />
          {/* flechas de navegacion */}
          <div className="flex gap-4 items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`p-2 rounded-full border ${
                currentIndex === 0
                  ? classNameDisabled
                  : classNameEnabled
              }`}
            >
              {memoizedChevronLeft}
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
              className={`p-2 rounded-full border ${
                currentIndex === maxIndex
                  ? classNameDisabled
                  : classNameEnabled
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
            style={transformStyle}
          >
            {destacados.map((product) => (
              <div
                key={product._id}
                className="min-w-[50%] md:min-w-[33%] lg:min-w-[25%] px-2 first:pl-0 last:pr-0 flex"
              >
                <ProductCard
                  key={product._id}
                  product={product}
                  viewInLine={viewInLine}
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
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index
                    ? "bg-airbnb-red w-4"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </section>

        {/* zona detalle */}
        <Suspense fallback={<Loader />}>
          {productToView && (
            <ViewProduct
              viewProduct={productToView}
              setViewProduct={setProductToView}
            />
          )}
        </Suspense>
      </section>
    </>
  );
});

export default FeaturedProducts;
