import { memo } from "react";
import { Button } from "./ui/button";
import { Backpack } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const heroImages = [
  {
    url: "https://plus.unsplash.com/premium_photo-1680127402190-4ec85e040290?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9nYXJlcyUyMGx1bWlub3NvcyUyMGRvbmRlJTIwc2UlMjBhcHJlY2lhbiUyMGVsZXRyZG9tZXN0aWNvc3xlbnwwfHwwfHx8MA%3D%3D",
    alt: "Amoblamietos de Cocina ",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1664201890729-a9653a3592cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1vYmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    alt: "Telefonos celulares",
  },
  {
    url: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bHNpbGxvbiUyMGRlJTIwbGl2aW5nfGVufDB8fDB8fHww",
    alt: "Sillones de Living",
  },
  {
    url: "https://images.unsplash.com/photo-1568816642854-e5a99030f9af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1vdG9zfGVufDB8fDB8fHw",
    alt: "Motos",
  },
];

const Hero = memo(() => {
  const { t } = useLanguage();

  console.log("hero");
  return (
    <div className="relative min-h-[500px] bg-neutral-100">
      <div className="container mx-auto px-2 py-2">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="absolute top-0 left-0 w-96 h-32 bg-blue-400 rounded-full blur-3xl opacity-30"></div>
          <div className="animate-fadeIn">
            <h1 className="text-3xl md:text-6xl font-bold text-gray-900 mb-6">
              {t("heroHeader")}
            </h1>
            <p className="text-base text-gray-700 mb-8">{t("heroParrafo")}</p>

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
          </div>
          <div className="relative w-full max-w-xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {heroImages.map((image, index) => (
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
