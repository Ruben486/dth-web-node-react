import Navbar from "@/components/Navbar";
import FavoriteSection from "@/components/FavoriteSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const Favorites = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="pt-8 flex-grow">
        <div className="container mx-auto px-4 py-2">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="ml-8 transition-all duration-500 ease-in-out hover:rounded-lg hover:bg-black hover:text-slate-200"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            {t("goBack")}
          </Button>

          <FavoriteSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
