import { useFavorites } from "@/contexts/FavoriteContext";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useCallback,memo } from "react";

export const AddToFavoriteButton = memo(({ product }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();

  const handleToggleFavorite = useCallback(
    (e) => {
      e.stopPropagation();
      toggleFavorite(product);
      if (isFavorite(product._id)) {
        toast({
          title: "Quitar de favoritos",
          description: `${product.descripcion} se quitó de favoritos`,
        });
      } else {
        toast({
          title: "Agregar a favoritos",
          description: `${product.descripcion} se agregó a favoritos`,
        });
      }
    },
    [toggleFavorite, isFavorite, product, toast]
  );

  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        onClick={handleToggleFavorite}
        className="absolute top-2 right-2 h-6 w-6 bg-white/80 backdrop-blur-sm hover:bg-white transition-colors duration-200"
      >
        <Heart
      className={`h-3 w-3 transition-colors duration-200 ${
        isFavorite(product._id) ? "fill-red-500 text-red-500" : "text-gray-600"
      }`}
    />
      </Button>
    </>
  );
});
