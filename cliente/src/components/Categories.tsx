import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Tag, Tags } from "lucide-react";
import { useEffect, useRef, memo, useCallback } from "react";
import Loader from "./Loader";
import { useFrequentCategories } from "../hooks/useCategories";
import { useToast } from "./ui/use-toast";
import { categoryIcons } from "../constants/categoryIcons";
import { SectionHeader } from "./SectionHeader";
interface CategoriesProps {
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}


const Categories = memo(
  ({ selectedCategory, onCategorySelect }: CategoriesProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    const {
      status,
      data: categories,
      error,
      isError,
    } = useFrequentCategories();

    const handleCategorySelect = useCallback(
      (id) => {
        onCategorySelect(id);
      },
      [onCategorySelect]
    );

    useEffect(() => {
      if (isError) {
        toast({
          title: "Error de Red",
          description: `Se ha producido un error en la red:  ${error.message}`,
        });
      }
    }, [isError, toast, error?.message]);

    if (status === "pending") {
      return <Loader />;
    }

    const scroll = (direction: "left" | "right") => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollAmount = 300; // Increased scroll amount for better navigation
        const currentScroll = container.scrollLeft;
        const newScrollPosition =
          direction === "left"
            ? Math.max(0, currentScroll - scrollAmount)
            : Math.min(
                container.scrollWidth - container.clientWidth,
                currentScroll + scrollAmount
              );

        container.scrollTo({
          left: newScrollPosition,
          behavior: "smooth",
        });
      }
    };
    console.log("Categoria");
    return (
      <div className="container mx-auto px-8 md:px-8 py-6">
        <SectionHeader Icon={Tag} title={"Categorias"} />

        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
           bg-white shadow-md hover:bg-gray-100"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="overflow-hide md:px-10 ">
            <div
              ref={scrollContainerRef}
              className="flex space-x-4 overflow-x-auto scrollbar-hide"
              style={{ scrollBehavior: "smooth" }}
            >
              {categories?.map((category) => {
                const Icon = categoryIcons[category.id];
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
                    <span className="text-xs font-medium">
                      {category.label}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
           bg-white shadow-md hover:bg-gray-100"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }
);
export default Categories;
