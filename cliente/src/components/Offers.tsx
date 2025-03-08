import { memo } from "react";
import { Card } from "./ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "./ui/use-toast";
import useProductStore from "../store/productStore";

const Offers = memo(() => {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { productosOferta: offers } = useProductStore();
  const endTime = "72h";

  const handleAddToCart = (offer) => {
    addToCart({
      _id: offer._id, 
      descripcion: offer.descripcion,
      precio: offer.precioOferta,
      urlImagen: offer.urlImagen,
      category: offer.category,
      itemsDestacados: offer.itemsDestacados,
    });

    toast({
      title: language === "en" ? "Added to cart" : "Añadido al carrito",
      description:
        language === "en"
          ? `${offer.descripcion[language]} has been added to your cart.`
          : `${offer.descripcion[language]} ha sido añadido a tu carrito.`,
    });
  };

  console.log("ofertas");

  return (
    <section className="mx-auto py-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 hover:underline">
        {language === "en" ? "Special Offers" : "Ofertas Especiales"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 align-center">
        {offers.map((offer) => (
          <Card
            key={offer._id}
            className={`transition-transform duration-200 hover:scale-105` } >
            <div className="flex flex-col gap-4">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-white relative">
                <img
                  src={offer.urlImagen}
                  alt={offer.descripcion}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover text-xs"
                />
                {offer.masVendido && (
                  <div
                    className="absolute top-1 right-1
                     bg-orange-500 text-white px-2 py-2
                      rounded-lg text-xs font-semibold"
                  >
                    {language === "en" ? "Best Seller" : "Más Vendido"}
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
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{endTime}</span>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleAddToCart(offer)}
                  className="bg-white/80 hover:bg-slate-900 hover:text-white"
                >
                  <ShoppingCart className="h-4 w-4 " />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
});

export default Offers;
