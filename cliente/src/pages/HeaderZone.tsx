import { lazy } from "react";
import { motion } from "framer-motion";
import { motionProps } from "../constants/motionProps";

const SearchBar = lazy(() => import("@/components/SearchBar"));
const Hero = lazy(() => import("@/components/Hero"));

const HeaderZone = ({ searchString, setSearchString }) => {
  const handleSearchString = (string: string) => {
    setSearchString(string);
  };

  return (
    <>
      
      <SearchBar
        searchString={searchString}
        setSearchString={setSearchString}
        onSearch={handleSearchString}
      />
      <motion.div {...motionProps} >
        <Hero />
      </motion.div>
    </>
  );
};
export default HeaderZone;
