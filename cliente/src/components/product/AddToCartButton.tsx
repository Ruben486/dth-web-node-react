import { useMemo, useCallback, memo } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "../ui/use-toast";
import { ProductCardProps } from './types/productTypes';

type AddToCartButtonProps = {
  size?: "default" | "sm" | "lg" | "icon"; 
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
  product: ProductCardProps;
  text?: string;
};

export const AddToCartButton = memo(
  ({ size, variant, className, product, text }: AddToCartButtonProps) => {
    const { toast } = useToast();
    const { addToCart } = useCart();

    const MemoShoppingCart = useMemo(
      () => <ShoppingCart className="h-3 w-3" />,
      []
    );

    const handleAddToCart = useCallback(() => {
      addToCart(product);
      toast({
        title: "Incorporar al carrito",
        description: `El producto ${product.descripcion} ha sido añadido al carrito`,
      });
    }, [product, addToCart, toast]);

    return (
      <Button
        size={size}
        variant={variant}
        className={className}
        onClick={handleAddToCart}
      >
        {MemoShoppingCart}
        {text}
      </Button>
    );
  }
);
