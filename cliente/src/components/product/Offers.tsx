import { memo,lazy } from "react";
import { HandCoins } from "lucide-react";
import {useProductStore} from "./store/productStore";

const SectionHeader = lazy(() =>
  import("../SectionHeader").then((module) => ({
    default: module.SectionHeader || module.default,
  }))
);
import OfferProductCard from "./OfferProductCard";
import {Product} from './types/productTypes';

const Offers = memo(() => {
  const { productosOferta: offers } = useProductStore();

  // Indica que offers es un arreglo del tipo Product
  const typedOffers: Product[] = offers;

  console.log("ofertas");

  return (
    <>
      <section className="mx-auto py-4">
        <SectionHeader Icon={HandCoins} title={"Ofertas Especiales"} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 align-center">
          {typedOffers.map((offer: Product) => (
            <OfferProductCard key={offer._id} offer={offer} />
          ))}
        </div>
      </section>
    </>
  );
});

export default Offers;
