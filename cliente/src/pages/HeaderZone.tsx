import { lazy } from "react";

const Navbar = lazy(() =>
  import("@/components/Navbar")
);

const SearchBar = lazy(() =>
  import("@/components/SearchBar")
);

export const HeaderZone = ({
  selectedCategory,
  setSelectedCategory,
  searchString,
  setSearchString,
}) => {
  const handleSearchString = (string: string) => {
    setSearchString(string);
  };

  return (
    <>
      <Navbar />
      <SearchBar
        searchString={searchString}
        setSearchString={setSearchString}
        onSearch={handleSearchString}
      />
    </>
  );
};


