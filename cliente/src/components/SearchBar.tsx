
import { Search, X } from "lucide-react";
import { Button } from "./ui/button";

function SearchBar({ searchString, setSearchString, onSearch }) {
  

  const handleInputChange = (e) => {
    e.preventDefault()
    setSearchString(e.target.value);
  };

  const handleSearchKey = (e) => {
    e.preventDefault()
    onSearch(searchString);
  };

  const handleClearSearch = () => {
    setSearchString("");
    onSearch("");
  }; 

  return (
    <div className="sticky top-16 left-0 right-0 w-full bg-white/90 backdrop-blur-md border-b z-30">
      <div className="container mx-auto flex justify-center py-4">
        <div className="relative w-full md:w-1/2 shadow-md border-gray-300 border-0 outline-none ">
          <input
            type="search"
            placeholder="Buscar productos..."
            className="w-full h-10 pl-5 pr-20 bg-transparent text-sm text-gray-700 placeholder-airbnb-gray-600 outline-none border-0 focus:outline-none focus:border-0"
            onChange={handleInputChange}
            value={searchString}
            
          />
          <div className="absolute right-0 top-0  flex">
            {searchString && (
              <Button
              type="button"
              size="icon"
              variant="ghost"
              className= "border-0 outline-none focus:border-0 focus:outline-none"
              onClick={handleClearSearch}
              >
                <X className= "w-4 h-4 border-0 outline-none focus:border-0 focus:outline-none" />
              </Button>
            )}
            <Button
             type = "submit"
             variant = "ghost"
             size= "icon"
             className="bg-gray-100 hover:bg-red-500 hover:text-gray-50 animation-color duration-100"
             onClick={handleSearchKey}
            >
             <Search className="w-4 h-4"></Search>
            </Button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
export default SearchBar;