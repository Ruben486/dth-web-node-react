import { memo, useState, lazy, Suspense } from "react";
import {Loader} from '../components/Loader';
const Navbar = lazy(() => import("@/components/Navbar"));
const HeaderZone = lazy(() => import("@/pages/HeaderZone"));
const MiddleZone = lazy(() => import("./MiddleZone"));
const MainZone = lazy(() => import("./MainZone"));
const Footer = lazy(() => import("@/components/Footer"));

const initialState = "0000";

const Index: React.FC = memo(() => {
  const [selectedCategory, setSelectedCategory] = useState(initialState);
  const [searchString, setSearchString] = useState("");

  return (
    <div className="min-h-screen  bg-gray-100 dark:bg-black flex flex-col">
      <Navbar />
       <main className="container pt-6 flex-grow">
        <HeaderZone
          searchString={searchString}
          setSearchString={setSearchString}
        />
        <MiddleZone />
        <Suspense fallback={<Loader />}>
          <MainZone
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchString={searchString}
          />
        </Suspense>
      </main> 
      
      <Footer />
    </div>
  );
});

export default Index;
