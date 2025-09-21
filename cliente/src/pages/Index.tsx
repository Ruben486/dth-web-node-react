import React from "react";
import SearchBar from "@/components/header/SearchBar";
import Navbar from '@/components/header/Navbar'
import MiddleZone from './MiddleZone'
import Hero from "@/components/header/Hero";
import Categories from "@/components/categoriy/Categories";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from '../components/Footer'


interface IndexProps {
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
  searchCategory: string;
  setSearchCategory: React.Dispatch<React.SetStateAction<string>>;
}


const Index: React.FC<IndexProps> = ({ searchString, setSearchString, searchCategory, setSearchCategory }) => {
  console.log('Index')
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black flex flex-col">
      <div 
      /* style={{
        backgroundImage: `
        radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #ec4899 100%)
      `,
        backgroundSize: "100% 100%",
      }} */
      >

        <Navbar />
        <SearchBar searchString={searchString} setSearchString={setSearchString} />
        <main className="container pt-6 flex-grow">
          <Hero />
          <MiddleZone />
          <Categories
            searchCategory={searchCategory}
            setSearchCategory={setSearchCategory}
          />
          <ProductGrid
            searchString={searchString}
            searchCategory={searchCategory}
          />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
