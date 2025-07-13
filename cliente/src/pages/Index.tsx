import { memo, useState, Suspense, lazy } from "react";

const HeaderZone = lazy(() =>
  import("@/pages/HeaderZone").then((module) => ({
    default: module.HeaderZone,
  }))
);
const MiddleZone = lazy(() =>
  import("./MiddleZone").then((module) => ({
    default: module.MiddleZone,
  }))
);

const ProductGrid = lazy(() => import("@/components/ProductGrid"));

const Categories = lazy(() => import("@/components/Categories"));

// import PaymentAds from "@/components/PaymentAds";
const Footer = lazy(() => import("@/components/Footer"));
// import Footer from "@/components/Footer";

const Index = memo(() => {
  const [selectedCategory, setSelectedCategory] = useState("0000");
  const [searchString, setSearchString] = useState("");

  return (
    <div className="min-h-screen  bg-gray-100 dark:bg-black flex flex-col">
      <Suspense
        fallback={
          <div className="flex flex-row items-center justify-center py-10 w-full min-h-screen bg-gray-300">
            <div className="flex items-center space-x-4">
              <span className="font-bold text-6xl">DTH</span>
              <svg
                className="animate-spin h-6 w-6 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            </div>
          </div>
        }
      >
        <HeaderZone
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchString={searchString}
          setSearchString={setSearchString}
        />

        <main className="container pt-6 flex-grow">
          <MiddleZone />
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
      </Suspense>
    </div>
  );
});

export default Index;
