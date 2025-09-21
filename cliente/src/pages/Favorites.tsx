
import FavoriteSection from "@/components/favorites/FavoriteSection";
import Footer from "@/components/Footer";
import { GoBackButton } from "../components/header/GoBackButton";
import Header from "@/components/header/PageHeader";

const Favorites = () => {
  return (

    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="pt-4 flex-grow">
        <GoBackButton />
        <FavoriteSection />
      </main>
      <Footer />
    </div>

  );
};

export default Favorites;
