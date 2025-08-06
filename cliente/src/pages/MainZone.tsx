import { lazy } from "react";
const Categories = lazy(() => import("@/components/Categories"));
const ProductGrid = lazy(() => import("@/components/ProductGrid"));

const MainZone = ({
  selectedCategory,
  setSelectedCategory,
  searchString,
  
}) => {
  return (
    <>
      <Categories 
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      />
      <ProductGrid
        selectedCategory={selectedCategory}
        searchQuery={searchString}
      />
    </>
  );
};

export default MainZone;
