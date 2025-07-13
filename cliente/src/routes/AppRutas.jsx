import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "../pages/Index";
import Loader from "../components/Loader";
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const Cart = lazy(() => import("../pages/Cart"));
const Favoritos = lazy(() => import("../pages/Favorites"));


// import ProductDetail from "../pages/ProductDetail";
// import { WalletSuccess } from "../pages/WalletSuccess";
// import { WalletFailure } from "../pages/WalletFailure";
// import WalletPending from "../pages/WalletPending";
const WalletSuccess = lazy(() => import("../pages/WalletSuccess"));
const WalletFailure = lazy(() => import("../pages/WalletFailure"));
const WalletPending = lazy(() => import("../pages/WalletPending"));

const AppRutas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/product/:id" element={
          <Suspense fallback={<Loader />}>
          <ProductDetail />
          </Suspense>
        } />

        <Route
          path="/cart"
          element={
            <Suspense fallback={<Loader />}>
              <Cart />
            </Suspense>
          }
        />

        <Route
          path="/favorites"
          element={
            <Suspense fallback={<Loader />}>
              <Favoritos />
            </Suspense>
          }
        />

        <Route
          path="/walletsuccess"
          element={
            <Suspense fallback={<Loader />}>
              <WalletSuccess />
            </Suspense>
          }
        />

        <Route
          path="/walletfailure"
          element={
            <Suspense fallback={<Loader />}>
              <WalletFailure />
            </Suspense>
          }
        />

        <Route
          path="/walletpending"
          element={
            <Suspense fallback={<Loader />}>
              <WalletPending />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRutas;
