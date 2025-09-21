import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Edit } from "lucide-react";
import type { Product } from './types/productTypes'

type EditProductButtonProps = {
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
  product: Product;
  text?: string;
};

export const EditButton = ({ size, variant, className, product, text }: EditProductButtonProps) => {
  const navigate = useNavigate();

  const handleEditProduct = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/product/${product._id}`);
  }

  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      onClick={handleEditProduct }
    >
      <Edit className='w-6 h-6' />
      {text}
    </Button>
  )
};

