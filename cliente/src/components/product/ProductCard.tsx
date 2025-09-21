import { useEffect, useRef, useState, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import { Edit, Eye } from "lucide-react";
import { Button } from "../ui/button";
import { LoadImage } from "../LoadImage";
import AddToFavoriteButton from "../favorites/AddToFavoriteButton";
import { AddToCartButton } from "./AddToCartButton";
import AcordeonDestacados from "./AcordeonDestacados";
import { Product } from "./types/productTypes";
import { formatValor } from "../../services/formatValor";
import { getCategoryDescription } from './actions/getCategoryDescription';
// const AcordeonDestacados = lazy(() => import("./AcordeonDestacados"));

interface ProductCardProps {
  product: Product,
  viewInLine?: boolean,
  setProductToView?: (value: Product) => void
};

const CardImage = ({ urlImage, alt }: { urlImage: string, alt: string }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative mb-2">
      {imageError ? (
        <p className="flex justify-center items-center text-sm xl:text-xs text-gray-600">
          {alt}
        </p>
      ) : (
        <LoadImage src={urlImage} alt={alt} />
      )}
    </div>
  )
};
const CardDescription = ({ descripcion, categoriaId }) => {
  return (
    <>
      <h4 className="text-md font-semibold mb-2">{descripcion}</h4>
      <p className=" text-sm"> {getCategoryDescription(categoriaId)}</p>
    </>
  )
};

const CardButtons = ({ viewInLine, setProductToView, product }: ProductCardProps) => {
  const navigate = useNavigate();

  const editProduct = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      navigate(`/product/${product._id}`);
    },
    [navigate, product._id]
  );

  const handleViewProduct = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setProductToView(product);
    },
    [setProductToView, product]
  );

  return (
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
        onClick={editProduct}
      >
        <Edit />
      </Button>
      <AddToCartButton
        size="sm"
        variant="ghost"
        className="h-7 w-7 xl:h-6 xl:w-6 p-1 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-200"
        product={product}
        text=""
      />
    </div>
  )
};

const ProductCard = memo(
  ({ product, viewInLine=false, setProductToView }: ProductCardProps) => {
    const { descripcion, precio, urlImagen, categoriaId, itemsDestacados } =
      product;
    const cardRef = useRef(null);
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

    return (
      <Card
        ref={cardRef}
        className={`group overflow-hidden transition-all duration-300
         ease-in-out h-full hover:scale-[1.02]
         hover:shadow-lg opacity-0 translate-y-4
         w-full flex flex-col`}
      >
        <CardImage urlImage={urlImagen} alt={descripcion} />
        <AddToFavoriteButton product={product} />
        <div className="p-2 flex flex-col flex-grow">
          <CardDescription descripcion={descripcion} categoriaId={categoriaId} />

          <AcordeonDestacados destacados={itemsDestacados} />
          <div className="flex items-center justify-between gap-2 mt-2">
            <span className={`text-xl xl:text-xl font-semibold`}>
              {formatValor(precio)}
            </span>
            <CardButtons
              viewInLine={viewInLine}
              setProductToView={setProductToView}
              product={product} />
          </div>
        </div>
      </Card>
    );
  });

export default ProductCard;
