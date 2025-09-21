import { memo, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Backpack } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { heroImages } from "@/constants/heroImages";
import { HeroAnimatedText } from "./HeroAnimatedText";

const CarouselSection = () => {
  return (
    <div className="relative w-full h-full max-w-xl mx-auto p-3 ">
      <Carousel className="w-full">
        <CarouselContent>
          {heroImages?.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-full overflow-hidden rounded-lg">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  )
};

const Hero = memo(() => {
  const heroParrafo = useMemo(
    () => "Encontrá todo lo que necesitás para tu hogar en un solo lugar",
    []
  );
  return (
    <div className="relative rounded-lg shadow-lg min-h-[480px] mb-10">
      <div className="grid lg:grid-cols-2 gap-2 items-center" >
        <section className="p-3">
          <HeroAnimatedText />
          <p className="text-base text-gray-700 mb-8">{heroParrafo}</p>
          
          <Button
            size="default"
            className="bg-gray-800 hover:cursor-pointer hover:bg-pink-500 transition-colors duration-500
                 ease-in-out p-6"
          >
            Ver Nuestros Productos
            <span><Backpack/></span>
          </Button>

          <div className="absolute top-80 left-10 inset-0 flex justify-end items-center">
          </div>
        </section>
        <CarouselSection />
      </div>
    </div>

  );
});
export default Hero;
