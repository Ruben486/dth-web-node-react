import { memo, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Categories from "@/components/Categories";
import Offers from "@/components/Offers";
import PaymentAds from "@/components/PaymentAds";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { SearchBar } from "@/components/SearchBar";
import { useCategories } from "../hooks/useCategories" 
import Loader from "../components/Loader";

const Index = memo(() => {
  const [selectedCategory, setSelectedCategory] = useState("0000");
  const [searchString, setSearchString] = useState("");
  

  const handleSearchString = (string: string) => {
    setSearchString(string);
  };
  
  
  return (
    <div className="min-h-screen  bg-gray-100 dark:bg-black flex flex-col">
      <Navbar />
      <SearchBar onSearch={handleSearchString} />
      <main className="container pt-6 flex-grow">
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          exit={{ opacity: 0 }}
        >
          <Hero />
        </motion.div>
        
        <Offers />
        <PaymentAds />
        <FeaturedProducts />
        <Categories
          onCategorySelect={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        <ProductGrid
          selectedCategory={selectedCategory}
          searchQuery={searchString}
        />
      </main>
      <Footer />
    </div>
  );
});

export default Index;
