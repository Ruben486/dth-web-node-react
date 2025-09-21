import { Button } from "../ui/button";
import { categoryIcons } from "../../constants/categoryIcons";
import { Tags } from "lucide-react";
import type { Category } from './types/categoryType';

interface CategoryButtonProps {
  category: Category;
  searchCategory: string;
  setSearchCategory: (value: string) => void;
};

export const CategoryButton = (
  { category, searchCategory, setSearchCategory, }: CategoryButtonProps) => {
  const Icon = categoryIcons[category._id];
  
  // Solución 1: Si solo quieres establecer el nuevo valor (más común)
  const handleCategorySelect = (id: string) => {
    
    setSearchCategory(id); // Directamente asignar el nuevo valor
  };

  const capitalizeDescription = (description: string): string => {
    if (typeof description !== 'string' || description.length === 0) {
      return description
    }
    const descriptionMinusculas = description.toLowerCase()
    const descriptionCapitalized = descriptionMinusculas.charAt(0).toUpperCase()
      + descriptionMinusculas.slice(1)
    return descriptionCapitalized
  }
  return (
    <Button
      key={category._id}
      variant="outline"
      className={`h-23 w-23 flex-none flex flex-col items-center
                  justify-center gap-2 bg-gray-200 rounded-md
                  transition-colors  hover:bg-gray-300 shadow-lg border-gray-300  
                  ${searchCategory === category.idGestion
          ? "bg-gray-800 text-white"
          : ""
        }`}
      onClick={() => handleCategorySelect(category.idGestion)}
    >
      {Icon ? <Icon /> : <Tags />}
      <span className="text-xs font-medium">
        {capitalizeDescription(category?.descripcion)}
      </span>
    </Button>
  );
};