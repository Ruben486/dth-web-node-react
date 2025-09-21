import { useEffect, memo, useMemo, Suspense } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { motionProps } from "../constants/motionProps";
import { Card } from "../components/ui/card";
import { stdBtn } from "../components/uiDesign/standarUi";
import { Loader } from "../components/Loader";
import Header from '@/components/header/PageHeader';
import ListaDestacados from '@/components/product/ListaDestacados';
import ProductFeaturesTab from "@/components/product/ProductFeaturesTab";
import { AddToCartButton } from "../components/product/AddToCartButton";
import { LoadImage } from "../components/LoadImage";
import { GoBackButton } from "../components/header/GoBackButton";
import { useQueryProduct } from '../components/product/hooks/useQueryProduct'
import { formatValor } from '../services/formatValor'
import { getCategoryDescription } from "@/components/product/actions/getCategoryDescription";
import { LoaderSpinner } from "@/services/LoadSpinner";

const ProductDetail = memo(() => {
  console.log("detalles");

  const { productQuery } = useQueryProduct()
  const {data:products, isLoading} = {...productQuery}
  const { id } = useParams();
  const product = products.find((p) => p._id === id);

  const {
    descripcion,
    urlImagen: image,
    precio: price,
    categoriaId
  } = { ...product };

  useEffect(() => {
    // Desplázate a la parte superior al cargar el componente
    window.scrollTo(0, 0);
  }, []);

  const optimizedLoadImage = useMemo(
    () => <LoadImage src={image} alt={descripcion} />,
    [image, name]
  );

  if (!product) {
    return (
      <div className="container mx-auto px-8 py-16">
        No se encontró el Producto
      </div>
    );
  }
  isLoading && <LoaderSpinner />
  
  return (
    <>
      <div className="container bg-white">
        <Header />
        <GoBackButton />
        <main className="flex flex-col my-2">

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
                      {descripcion}
                    </h1>
                    <p className="text-sm text-gray-500"></p>
                    <p className="md:text-2xl font-semibold text-gray-900">
                      {formatValor(price)}
                    </p>
                    <p className=" text-sm">{getCategoryDescription(categoriaId)}</p>
                    <p className="text-gray-600">{descripcion}</p>
                    {product.itemsDestacados.length > 0 && (
                      <ListaDestacados
                        itemsDestacados={product.itemsDestacados}
                      />
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
