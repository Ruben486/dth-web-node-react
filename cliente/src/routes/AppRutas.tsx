import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";
/* import Index from "../pages/Index";
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const Cart = lazy(() => import("../pages/Cart"));
const Favoritos = lazy(() => import("../pages/Favorites"));
const WalletSuccess = lazy(() => import("../pages/WalletSuccess"));
const WalletFailure = lazy(() => import("../pages/WalletFailure"));
const WalletPending = lazy(() => import("../pages/WalletPending")); */

const AppRutas = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {routes.map(({ path, Component }) => (
            <Route path={path} element={<Component />} />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
export default AppRutas;

