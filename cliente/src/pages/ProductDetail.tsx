import { useEffect, memo, useMemo, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { motionProps } from "../constants/motionProps";
import { Card } from "../components/ui/card";
import { stdBtn } from "../components/uiDesign/standarUi";
import {Loader} from "../components/Loader";
import useProductStore from "../store/productStore";

const ListaDestacados = lazy(() => import("@/components/ListaDestacados"));
const ProductFeaturesTab = lazy(
  () => import("@/components/ProductFeaturesTab")
);
const Header = lazy(() => import("@/components/Header"));
import { AddToCartButton } from "../components/AddToCartButton";
import { LoadImage } from "../components/LoadImage";
import { GoBackButton } from "../components/GoBackButton";

const ProductDetail = memo(() => {
  console.log("detalles");

  const { products } = useProductStore();
  const { id } = useParams();
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

  const optimizedLoadImage = useMemo(
    () => <LoadImage src={image} alt={name} />,
    [image, name]
  );

  if (!product) {
    return (
      <div className="container mx-auto px-8 py-16">
        No se encontró el Producto
      </div>
    );
  }
  return (
    <>
      <div className="container bg-white">
        <Suspense fallback={<Loader />}>
          <Header />
        </Suspense>
        <main className="flex flex-col my-2">
          <GoBackButton />

          {/* zona de datos */}
          <div className="md:h-[90%]">
            <motion.div {...motionProps}>
              {/* zona de la imagen y de info*/}
              <div className="w-full flex md:flex-row gap-4">
                <div className="w-full aspect-[4/3] md:h-full overflow-hidden rounded-lg md:flex-1">
                  {optimizedLoadImage}
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
                      <Suspense fallback={<Loader />}>
                        <ListaDestacados
                          itemsDestacados={product.itemsDestacados}
                        />
                      </Suspense>
                    )}
                  </div>
                  <AddToCartButton
                    size="default"
                    variant="default"
                    className={`"w-full md:w-auto transition-colors duration-200" ${stdBtn.className}`}
                    product={product}
                    text="Agregar al carrito"
                  />
                </Card>
              </div>
              <section className="bg-gray-50 p-3 rounded-lg text-base my-3 ">
                <h2 className="sticky font-semibold text-xl flex items-center justify-center ">
                  Información Adicional del Producto
                </h2>
                <div className="my-2">
                  <Suspense fallback={<Loader />}>
                    <ProductFeaturesTab data={product.tabsData} />
                  </Suspense>
                </div>
              </section>
            </motion.div>
          </div>
          {/* fin zona de datos */}
        </main>
      </div>
    </>
  );
});

export default ProductDetail;
