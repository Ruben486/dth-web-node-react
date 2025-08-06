import { Button } from "./ui/button";
import { categoryIcons } from "../constants/categoryIcons";
import { Tags } from "lucide-react";

export const CategoryButton = ({
  category,
  selectedCategory,
  setSelectedCategory,
}) => {
  const Icon = categoryIcons[category.id];

  const handleCategorySelect = (id) => {
    setSelectedCategory(prevId => id);
  };

  return (
    <Button
      key={category.id}
      variant="outline"
      className={`h-23 w-23 flex-none flex flex-col items-center
                  justify-center gap-2 bg-gray-200 rounded-md
                  transition-colors  hover:bg-gray-300 shadow-lg border-gray-300  
                  ${
                    selectedCategory === category.id
                      ? "bg-gray-800 text-white"
                      : ""
                  }`}
      onClick={() => handleCategorySelect(category.id)}
    >
      {Icon ? <Icon /> : <Tags />}
      <span className="text-xs font-medium">{category.label}</span>
    </Button>
  );
};
