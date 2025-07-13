import { useEffect, useRef, useState,memo,useCallback,lazy,useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Zap, Edit, Eye } from "lucide-react";
import { LoadImage } from "./LoadImage";
import "react-lazy-load-image-component/src/effects/blur.css";
import { AddToCartButton } from "./AddToCartButton";
import { AddToFavoriteButton } from "../components/AddToFavoriteButton";
const AcordeonDestacados = lazy(() =>
  import("./AcordeonDestacados").then(module => ({ default: module.AcordeonDestacados || module.default }))
);

// import { AcordeonDestacados } from "./AcordeonDestacados";

interface Product {
  _id: string;
  descripcion: string;
  precio: number;
  urlImagen: string;
  category: string;
  itemsDestacados: string[];
}

interface ProductCardProps {
  product: Product;
  viewInLine: boolean;
  setViewProduct: (product: Product) => void;
}

const ProductCard = memo(
  ({ product, viewInLine = false, setViewProduct = null }:ProductCardProps) => {
    const { _id, descripcion, precio, urlImagen, category, itemsDestacados } =
      product;

    // Memoize the product to stabilize its reference
    const stableProduct = useMemo(() => product, [product]);

    const cardRef = useRef(null);
    const [imageError, setImageError] = useState(false);
    const navigate = useNavigate();

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

    const handleViewProduct = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        setViewProduct(product);
      },
      [setViewProduct, product]
    );

    const handleNavigate = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        navigate(`/product/${_id}`);
      },
      [navigate, _id]
    );

    const MemoZap = useMemo(
      () => <Zap className="h-8 w-8 xl:h-6 xl:w-6 text-blue-600 mb-2" />,
      []
    );

    const MemoEdit = useMemo(() => <Edit className="h-3 w-3" />, []);

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
              {MemoZap}
              <p className="text-sm xl:text-xs text-gray-500">ElectroHome</p>
            </div>
          ) : (
            <LoadImage src={urlImagen} alt={descripcion} />
          )}
          {/* Pass the memoized product to prevent unnecessary rerenders */}
          <AddToFavoriteButton product={stableProduct} />
        </div>
        <div className="p-3 flex flex-col flex-grow">
          <h3 className="font-medium text-sm xl:text-base text-gray-900 mb-2 line-clamp-2 flex-grow">
            {descripcion}
          </h3>
          <p className="text-xs text-gray-450 mb-1">{category}</p>
          {/* accordion */}
          <AcordeonDestacados destacados={itemsDestacados} />
          <div className="flex items-center justify-between gap-2 mt-auto">
            <span className={`text-xl xl:text-xl font-semibold`}>
              ${precio}
            </span>

            <div className="flex gap-1">
              {viewInLine && setViewProduct && (
                <Button
                  size="sm"
                  variant="ghost"
                  className={`h-7 w-7 xl:h-6 xl:w-6 p-0 transition-colors
                 duration-200 hover:bg-gray-900 hover:text-white`}
                  onClick={handleViewProduct}
                >
                  <Eye className="w-3 h-3" />
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 xl:h-6 xl:w-6 p-0 transition-colors duration-200 hover:bg-slate-900 hover:text-white"
                onClick={handleNavigate}
              >
                {MemoEdit}
              </Button>
              <AddToCartButton
                size="sm"
                variant="ghost"
                className="h-7 w-7 xl:h-6 xl:w-6 p-0 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-200"
                product = {product}
                text=""
              />
            </div>
          </div>
        </div>
      </Card>
    );
  }
);


export default ProductCard;
