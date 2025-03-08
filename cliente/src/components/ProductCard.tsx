import { memo } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ShoppingCart, Zap, Heart, Edit, Eye } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFavorites } from "@/contexts/FavoriteContext";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import { AcordeonDestacados } from "./AcordeonDestacados";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface ProductCardProps {
  _id: string;
  descripcion: string;
  precio: number;
  urlImagen: string;
  category: string;
  itemsDestacados: string[];
  viewInLine: boolean;
}

const ProductCard = memo(({
  product,
  viewInLine = false,
  setViewProduct = null,
}) => {
  const {
    _id,
    descripcion,
    precio,
    porcDtoEfectivo,
    urlImagen,
    category,
    itemsDestacados,
  } = product;

  const cardRef = useRef(null);
  const [imageError, setImageError] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const discountedPrice = parseFloat(
    (precio * (1 - porcDtoEfectivo / 100)).toFixed(2)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleImageError = () => {
    setImageError(true);
  };

  const { t } = useLanguage();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      _id,
      descripcion,
      precio,
      urlImagen,
      category,
      itemsDestacados,
    });
    toast({
      title: t("added"),
      description: `${descripcion} ${t("inTheCart")}`,
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite({
      _id,
      descripcion,
      precio,
      urlImagen,
      category,
      itemsDestacados,
    });
    if (isFavorite(_id)) {
      toast({
        title: "Quitar de favoritos",
        description: `${descripcion} se quitó de favoritos`,
      });
    } else {
      toast({
        title: "Agregar a favoritos",
        description: `${descripcion} se agregó a favoritos`,
      });
    }
  };

  const handleNavigate = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/product/${_id}`);
  };

  const handleViewProduct = (product) => {
    setViewProduct(product);
  };

  return (
    <Card
      ref={cardRef}
      className={`group overflow-hidden transition-all duration-300
         ease-in-out h-full hover:scale-[1.02]
         hover:shadow-lg opacity-0 translate-y-4
         w-full flex flex-col`}
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50">
            <Zap className="h-8 w-8 xl:h-6 xl:w-6 text-blue-600 mb-2" />
            <p className="text-sm xl:text-xs text-gray-500">ElectroHome</p>
          </div>
        ) : (
          <LazyLoadImage
            src={urlImagen}
            alt={descripcion}
            loading="lazy"
            decoding="async"
            onError={handleImageError}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            effect={"blur"}
          />
        )}
        <Button
          size="icon"
          variant="ghost"
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 h-6 w-6 bg-white/80 backdrop-blur-sm hover:bg-white transition-colors duration-200"
        >
          <Heart
            className={`h-3 w-3 transition-colors duration-200 ${
              isFavorite(_id) ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </Button>
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-medium text-sm xl:text-base text-gray-900 mb-2 line-clamp-2 flex-grow">
          {descripcion}
        </h3>
        <p className="text-xs text-gray-450 mb-1">{category}</p>
        {/* accordion */}
        <AcordeonDestacados destacados={itemsDestacados} />
        <div className="flex items-center justify-between gap-2 mt-auto">
          <span className={`text-xl xl:text-xl font-semibold`}>${precio}</span>

          <div className="flex gap-1">
            {viewInLine && setViewProduct && (
              <Button
                size="sm"
                variant="ghost"
                className={`h-7 w-7 xl:h-6 xl:w-6 p-0 transition-colors
                 duration-200 hover:bg-gray-900 hover:text-white`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewProduct(product);
                }}
              >
                <Eye className="w-3 h-3" />
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 xl:h-6 xl:w-6 p-0 transition-colors duration-200"
              onClick={handleNavigate}
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 xl:h-6 xl:w-6 p-0 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-200"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
});

export default ProductCard;
