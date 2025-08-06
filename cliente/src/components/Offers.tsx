import { memo,lazy } from "react";
import { HandCoins } from "lucide-react";

import useProductStore from "../store/productStore";
//import { SectionHeader } from "./SectionHeader";
const SectionHeader = lazy(() =>
  import("./SectionHeader").then((module) => ({
    default: module.SectionHeader || module.default,
  }))
);
import OfferProductCard from "./OfferProductCard";

type Offer = {
  _id: string;
  descripcion: string;
  detalle: string;
  precio: number;
  precioOferta: number;
  urlImagen: string;
  category: string;
  itemsDestacados: string[];
  masVendido?: boolean;
  default?: boolean 
};

const Offers = memo(() => {
  const { productosOferta: offers } = useProductStore();

  console.log("ofertas");

  return (
    <>
      <section className="mx-auto py-4">
        <SectionHeader Icon={HandCoins} title={"Ofertas Especiales"} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 align-center">
          {offers.map((offer:Offer) => (
            <OfferProductCard key={offer._id} offer={offer} />
          ))}
        </div>
      </section>
    </>
  );
});

export default Offers;
