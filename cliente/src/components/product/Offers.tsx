import { memo, useState } from "react";
import { HandCoins } from "lucide-react";
import { SectionHeader } from "../header/SectionHeader";
import OfferProductCard from "./OfferProductCard";
import { Product } from './types/productTypes';
import { config } from "@/config/config";
import { Button } from "@/components/ui/button"
import { Loader } from "../Loader";
import { useQueryProduct } from "./hooks/useQueryProduct";

const itemsToShow = config.itemsVisibles || 8;

const Offers = memo(() => {
  const [visibleProducts, setVisibleProducts] = useState(itemsToShow);
  const { offerQuery } = useQueryProduct();

  const { data: offers,isLoading } = {...offerQuery};
  { isLoading && <Loader /> }

  const currentOffers = offers?.slice(0, visibleProducts);
  const hasMoreProducts = visibleProducts < offers?.length;

  const showMore = () => {
    setVisibleProducts((prev) => Math.min(prev + itemsToShow, offers?.length));
  };
  const showLess = () => {
    setVisibleProducts((prev) => Math.max(prev - itemsToShow, itemsToShow));
  }
  return (
    <section className="mx-auto py-3 animate-fade-in">
      <header className="flex justify-between items-start mb-2">
        <SectionHeader
          Icon={HandCoins}
          title={`Ofertas Especiales`} 
        />
        <div className="flex justify-center items-start gap-4">
          {
            hasMoreProducts &&
            <Button
              onClick={showMore}
              className={
                ["bg-gray-900 hover:bg-gray-800",
                  "hover:bg-purple-600 hover:text-white ",
                  "transition-all duration-300",
                ].join(' ')}
            >
              Ver más Ofertas
            </Button>
          }
          {visibleProducts > itemsToShow
            ?
            <Button
              onClick={showLess}
              className={
                ["bg-gray-900 hover:bg-gray-800",
                  "hover:bg-pink-600 hover:text-white ",
                  "transition-all duration-300",
                ].join(' ')}
            >
              Ver menos Ofertas
            </Button>
            :
            null
          }
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 align-center">
        {currentOffers?.map((offer: Product) => (
          <OfferProductCard key={offer._id} offer={offer} />
        ))}
      </div>

    </section>

  );
});

export default Offers;
