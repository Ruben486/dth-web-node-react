import { useState, memo, useEffect } from "react";
import { Sparkles, ChevronLeft, ChevronRight, CloudHail } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

import useProductStore from "../store/productStore";
import ProductCard from "./ProductCard";
import { ViewProduct } from "./viewProduct";

const FeaturedProducts = memo(() => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const { productosDestacados } = useProductStore();
  const [viewProduct, setViewProduct] = useState(null);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() );

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() );
    });
  }, [api]);

  const destacados = productosDestacados.slice(0, 8); // Show top 8 products
  
  const handlePrevious = () => {
    api?.scrollTo(current - 1 )
    
  };

  const handleNext = () => {
    api?.scrollTo(current + 1 )
  };

  const handleViewProduct = (product) => {
    setViewProduct(product);
  };

  console.log("destacados");
  return (
    <section className=" px-3 py-4 bg-gradient-to-tr from-green-50 to-cyan-50">
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
            disabled={current === 0}
            className={`p-2 rounded-full border ${
              current === 0
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            disabled={current === count - 1}
            className={`p-2 rounded-full border ${
              current === count -1
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
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {destacados.map((product) => (
              <CarouselItem
                key={product._id}
                className="pl-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4"
              >
                <ProductCard
                  product={{ ...product }}
                  viewInLine={true}
                  setViewProduct={setViewProduct}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          
        </Carousel>
        
        
        <div className="flex justify-center gap-2 my-5">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                current === index   
                  ? "bg-airbnb-red w-4"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Ir a slide ${index + 1}`}
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


 