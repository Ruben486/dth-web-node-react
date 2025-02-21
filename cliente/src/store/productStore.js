import { create } from "zustand";

import { dthDBProducts} from "../data/products";

const useProductStore = create((set) => ({
  products: dthDBProducts,

  productosDestacados: dthDBProducts.filter(product => {
    return (product.destacado)
  }),
  
  productosOferta: dthDBProducts.filter(product => {
    return (product.oferta && product.precioOferta > 0 && product.precioOferta < product.precio)
  }),


  //actions
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),

  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),

  updateProduct: (updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      ),
    })),

  getProductById: (productId) =>
    set((state) => state.products.find((product) => product.id === productId)),
}));

export default useProductStore;
