import {
  useEffect,
  useRef,
  useState,
  memo,
  useCallback,
  lazy,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Eye } from "lucide-react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { LoadImage } from "./LoadImage";
import { AddToCartButton } from "./AddToCartButton";
const AddToFavoriteButton = lazy(() => import('../AddToFavoriteButton'))
const AcordeonDestacados = lazy(() => import("./AcordeonDestacados"));
import { Product} from "./types/productTypes";

interface ProductProps {
  product: Product,
  viewInLine?: boolean,
  setProductToView?: (product:Product) => void
};

const ProductCard = memo(
  ({product,viewInLine= false,setProductToView= null}: ProductProps) => {
    const { _id, descripcion, precio, urlImagen, category, caracDestacados } =
      product;
 
    const cardRef = useRef(null);
    const [imageError, setImageError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const node = cardRef.current;
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

      if (node) {
        observer.observe(node);
      }
      return () => {
        if (node) {
          observer.unobserve(node);
        }
      };
    }, []);

    const handleImageError = () => {
      setImageError(true);
    };

    const handleViewProduct = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        setProductToView(product);
      },
      [setProductToView, product]
    );

    const handleNavigate = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        navigate(`/product/${_id}`);
      },
      [navigate, _id]
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
            <p className="flex justify-center items-center text-sm xl:text-xs text-gray-600">
              {descripcion}
            </p>
          ) : (
            <LoadImage src={urlImagen} alt={descripcion} />
          )}
          {/* Pass the memoized product to prevent unnecessary rerenders */}
          <AddToFavoriteButton product={product} />
        </div>
        <div className="p-3 flex flex-col flex-grow">
          <h3 className="font-medium text-sm xl:text-base text-gray-900 mb-2 line-clamp-2 flex-grow">
            {descripcion}
          </h3>
          <p className="text-xs text-gray-450 mb-1">{category}</p>
          {/* accordion */}
          <AcordeonDestacados destacados={caracDestacados} />
          <div className="flex items-center justify-between gap-2 mt-auto">
            <span className={`text-xl xl:text-xl font-semibold`}>
              ${precio}
            </span>

            <div className="flex gap-1">
              {viewInLine && setProductToView && (
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
                product={product}
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
