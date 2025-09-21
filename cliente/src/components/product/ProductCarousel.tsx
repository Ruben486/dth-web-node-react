import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Edit, ShoppingCart } from 'lucide-react';
import { getOffers } from './hooks/useQueryProduct';
import { formatValor } from '@/services/formatValor';
import SectionHeader from '../header/SectionHeader';
import { HandCoins } from "lucide-react";
import { AddToCartButton } from './AddToCartButton';
import { EditButton } from './EditButton';
import { LoaderSpinner } from '@/services/LoadSpinner';

const ProductCarousel = () => {
  const { product: offers } = getOffers();
  const [currentIndex, setCurrentIndex] = useState(1);

  
  // Si no hay productos, mostrar mensaje vacío
  if (!offers || offers.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4 bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen ">
        <SectionHeader Icon={HandCoins} title={"Ofertas Especiales"} />

        <div className="flex flex-col items-center justify-center py-16">
          <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
            <div className="text-6xl mb-4">🛍️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              No hay productos disponibles
            </h2>
            <p className="text-gray-600">
              En este momento no tenemos productos para mostrar.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const products = offers;

  const nextSlide = () => {
    if (products.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    if (products.length === 0) return;
    setCurrentIndex((prev) => {
      const newIndex = prev - 1;
      return newIndex < 0 ? products.length - 1 : newIndex;
    });
  };

  const getVisibleProducts = () => {
    if (!products || products.length === 0) return [];

    const visible = [];

    // Si solo hay 1 producto, mostrarlo en el centro
    if (products.length === 1) {
      return [{ ...products[0], position: 0 }];
    }

    // Si hay 2 productos, mostrar ambos
    if (products.length === 2) {
      return [
        { ...products[0], position: currentIndex === 0 ? 0 : -1 },
        { ...products[1], position: currentIndex === 1 ? 0 : 1 }
      ];
    }

    // Si hay 3 o más productos, usar la lógica original
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + products.length) % products.length;
      visible.push({ ...products[index], position: i });
    }
    return visible;
  };


  return (
    //<div className="w-full max-w-6xl mx-auto p-8 bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen"></div>
    <div className="w-full mx-auto py-2 animate-fade-in">
      <SectionHeader Icon={HandCoins} title={"Ofertas Especiales"} />

      <div className="relative flex items-center justify-center">
        {/* Botón Anterior */}
        <button
          onClick={prevSlide}
          className="absolute left-4 z-30 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-200 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        {/* Carousel Container */}
        <div className="flex items-center justify-center space-x-8 py-2">
          {products.length > 0 && getVisibleProducts().map((product, index) => (
            <div
              key={product._id || index}
              className={`group transition-all duration-600 transform ${product.position === 0
                ? 'scale-105 z-20 shadow-2xl'
                : product.position === -1
                  ? 'scale-90 -translate-x-4 opacity-75 z-10'
                  : 'scale-90 translate-x-4 opacity-75 z-10'
                }`}
            >
              <div className={`bg-white rounded-2xl overflow-hidden w-80 ${product.position === 0
                ? 'shadow-2xl ring-4 ring-purple-200 hover:ring-purple-300'
                : 'shadow-lg hover:shadow-xl'
                } transition-all duration-600`}>
                {/* Imagen del producto */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.urlImagen}
                    alt={product.descripcion || "Producto"}
                    className="w-full h-64 object-cover transition-transform duration-600 hover:scale-105"
                  />
                  {product.position === 0 && (
                    <div className="absolute top-4 right-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Destacado
                    </div>
                  )}
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-3">
                  <h4 className="text-lg font-semibold text-gray-800 mb-1">
                    {product.descripcion || "Producto sin nombre"}
                  </h4>

                  {/* Precio */}
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-xl font-bold text-pink-600">
                      {formatValor(product.precio) || "$0.00"}
                    </span>

                  </div>

                  {/* Botones */}
                  <div className="flex justify-end space-x-3">
                    <EditButton
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 xl:h-10 xl:w-10 p-0 bg-gray-100 text-gray-600 hover:bg-gray-900 hover:text-white transition-all duration-300"
                      product={product}
                      text=""
                    />
                    <AddToCartButton
                      size="sm"
                      variant="ghost"
                      className="h-12 w-12 xl:h-10 xl:w-10 p-0 bg-gray-100 text-pink-600 font-bold group-hover:bg-gray-900 group-hover:text-white transition-all duration-200"
                      product={product}
                      text=""
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón Siguiente */}
        <button
          onClick={nextSlide}
          className="absolute right-4 z-30 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-200 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Indicadores */}
      {products.length > 1 && (
        <div className="flex justify-center space-x-2 mt-8">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentIndex
                ? 'bg-pink-600 scale-125'
                : 'bg-pink-200 hover:bg-purple-300'
                }`}
            />
          ))}
        </div>
      )}

      {/* Información del producto actual */}
      {/* {products.length > 0 && (
        <div className="mt-12 text-center bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {products[currentIndex]?.descripcion || "Producto sin nombre"}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {products[currentIndex]?.descripcion || "Sin descripción disponible"}
          </p>
        </div>
      )} */}
    </div>
  );
};


export default ProductCarousel;