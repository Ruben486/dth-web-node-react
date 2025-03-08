import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Card } from "../components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/use-toast";
import Footer from "@/components/Footer";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";
import ProductFeaturesTab from "../components/ProductFeaturesTab";
import useProductStore from "../store/productStore";
import ListaDestacados from "@/components/ListaDestacados";

const ProductDetail = () => {
  console.log('detalles')
  const { products } = useProductStore();

  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { t } = useLanguage();
  const product = products.find((p) => p._id === id);

  const {
    descripcion: name,
    urlImagen: image,
    precio: price,
    detalle: detalle,
  } = { ...product };

  useEffect(() => {
    // Desplázate a la parte superior al cargar el componente
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="container mx-auto px-8 py-16">
        No se encontró el Producto
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: t("added"),
      description: `${name} ${t("inTheCart")}`,
    });
  };
  const variants = {
    show: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
    hide: {
      opacity: 0,
    },
  };

  return (
    <div className="container bg-white">
      {/* <Header /> */}
      <main className="flex flex-col my-3">
        {/* panel de control superior */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <Button
            variant="ghost"
            className="mb-2 transition-colors duration-300 ease-in-out hover:bg-zinc-600 hover:text-slate-200 hover:rounded-md"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("goBack")}
          </Button>
        </div>
        {/* zona de datos */}
        <div className="md:h-[90%]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* zona de la imagen y de info*/}
            <div className="w-full flex md:flex-row gap-4">
              <div className="w-full aspect-[4/3] md:h-full overflow-hidden rounded-lg md:flex-1">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              {/* zona de la info */}
              <Card className="w-full flex-1 shadow-lg px-4 py-2 mb-2 space-y-3">
                <div className="space-y-3">
                  <h1 className="md:text-3xl font-bold text-gray-900">
                    {name}
                  </h1>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <p className="md:text-2xl font-semibold text-gray-900">
                    ${price}
                  </p>
                  <p className="text-gray-600">{detalle}</p>
                  {product.itemsDestacados.length > 0 && (
                    <ListaDestacados itemsDestacados = {product.itemsDestacados} />
                  )}
                </div>
                <Button className="md:w-auto my-3" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {t("addToCart")}
                </Button>
              </Card>
            </div>
            <section className="bg-gray-50 p-3 rounded-lg text-base my-3 ">
              <h2 className="sticky font-semibold text-xl flex items-center justify-center ">
                Información Adicional del Producto
              </h2>
              <div className="my-2">
                <ProductFeaturesTab data={product.tabsData} />
              </div>
            </section>
          </motion.div>
        </div>
        {/* fin zona de datos */}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
