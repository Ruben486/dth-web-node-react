import { memo, useMemo } from "react";
import { Button } from "./ui/button";
import { Backpack } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

import { heroImages } from "../constants/heroImages";
import { HeroAnimatedText } from "./HeroAnimatedText";

const Hero = memo(() => {
  const heroParrafo = useMemo(
    () => "Encontrá todo lo que necesitás para tu hogar en un solo lugar",
    []
  );
  return (
    <div className="relative min-h-[500px] bg-neutral-100">
      <div className="container mx-auto px-2 py-2">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="absolute top-0 left-0 w-96 h-32 bg-blue-400 rounded-full blur-3xl opacity-30"></div>
          <section>
            <HeroAnimatedText />
            <p className="text-base text-gray-700 mb-8">{heroParrafo}</p>

            <Button
              size="default"
              className="bg-gray-800 hover:bg-pink-500 transition-colors duration-500
                 ease-in-out px-4 py-6"
            >
              Ver Nuestros Productos
              <Backpack className="ml-2" />
            </Button>

            <div className="absolute top-80 left-10 inset-0 flex justify-end items-center">
              <div className="w-96 h-32 bg-pink-300 rounded-full blur-3xl opacity-30"></div>
            </div>
          </section>
          <div className="relative w-full max-w-xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {heroImages?.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Hero;
