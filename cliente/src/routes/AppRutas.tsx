import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react';
import MainLoader from "@/components/MainLoader";
const Index = lazy(() => import("../pages/Index"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const Cart = lazy(() => import("../pages/Cart"));
const Favorites = lazy(() => import("../pages/Favorites"));
const MiddleZone = lazy(() => import('../pages/MiddleZone'));
const WalletSuccess = lazy(() => import("../pages/WalletSuccess"));
const WalletFailure = lazy(() => import('../pages/WalletFailure'));
const WalletPending = lazy(() => import('../pages/WalletPending'));


import React from "react";

interface AppRutasProps {
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
  searchCategory: string;
  setSearchCategory: React.Dispatch<React.SetStateAction<string>>;
}


const AppRutas: React.FC<AppRutasProps> = ({ searchString, setSearchString, searchCategory, setSearchCategory }) => {
  console.log('AppRoutes')
  return (
    <Suspense fallback={<MainLoader />}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Index
              searchString={searchString}
              setSearchString={setSearchString}
              searchCategory={searchCategory}
              setSearchCategory={setSearchCategory}
            />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/middle" element={<MiddleZone />} />
          <Route path="/wallet/success" element={<WalletSuccess />} />
          <Route path="/wallet/failure" element={<WalletFailure />} />
          <Route path="/wallet/pending" element={<WalletPending />} />
          <Route path='*' element={<div>Pagina no encontrada</div>} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
export default AppRutas;
