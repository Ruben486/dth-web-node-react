import { memo } from "react";
import { Clock, HandCoins } from "lucide-react";
import { Card } from "./ui/card";

import useProductStore from "../store/productStore";
import { LoadImage } from "./LoadImage";
import { SectionHeader } from "./SectionHeader";
import { AddToCartButton } from "./AddToCartButton";

const Offers = memo(() => {
  const { productosOferta: offers } = useProductStore();
  const endTime = "72h";

  console.log("ofertas");

  return (
    <>
      <section className="mx-auto py-4">
        <SectionHeader Icon={HandCoins} title={"Ofertas Especiales"} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 align-center">
          {offers.map((offer) => (
            <Card
              key={offer._id}
              className={`transition-transform duration-200 hover:scale-105`}
            >
              <div className="flex flex-col gap-4">
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-white relative">
                  <LoadImage src={offer.urlImagen} alt={offer.descripcion} />

                  {offer.masVendido && (
                    <div
                      className="absolute top-1 right-1
                  bg-orange-500 text-white px-2 py-2
                  rounded-lg text-xs font-semibold"
                    >
                      Más Vendido
                    </div>
                  )}
                </div>
                <div className="px-2">
                  <h3 className="text-lg font-semibold mb-2">
                    {offer.descripcion}
                  </h3>
                  <p className="text-sm text-gray-700 mb-2">{offer.detalle}</p>
                  <div className="flex items-center gap-2 ">
                    <span className="text-lg font-bold text-orange-500">
                      ${offer.precioOferta}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${offer.precio}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 mb-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{endTime}</span>
                  </div>
                  <AddToCartButton
                    size="sm"
                    variant="ghost"
                    className="h-10 w-10 xl:h-10 xl:w-10 p-0 bg-gray-100 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-200"
                    product={offer}
                    text=""
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
});

export default Offers;
