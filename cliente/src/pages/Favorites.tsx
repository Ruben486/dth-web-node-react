import Navbar from "@/components/Navbar";
import FavoriteSection from "@/components/FavoriteSection";
import Footer from "@/components/Footer";
import { GoBackButton } from "../components/GoBackButton";

const Favorites = () => {
  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="pt-4 flex-grow">
          <GoBackButton />
          <FavoriteSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Favorites;
