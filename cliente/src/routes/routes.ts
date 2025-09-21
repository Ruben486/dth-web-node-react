import {
  ComponentType,
  lazy,
  LazyExoticComponent,
  MemoExoticComponent,
} from "react";
import Index from "../pages/Index";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Favorites from "../pages/Favorites";
import WalletSuccess from "../pages/WalletSuccess";
import WalletFailure from "../pages/WalletFailure";
import WalletPending from "../pages/WalletPending";
/* const Index = lazy(() => import("../pages/Index"));
const ProductDetail = lazy( () => import("../pages/ProductDetail"));
const Cart = lazy(() => import("../pages/Cart"));
const Favorites = lazy(() => import("../pages/Favorites"));
const WalletSuccess = lazy(() => import("../pages/WalletSuccess"));
const WalletFailure = lazy(() => import("../pages/WalletFailure"));
const WalletPending = lazy(() => import("../pages/WalletPending")); */

type JSXComponent = () => JSX.Element;

interface Route {
  to: string;
  path: string;
  Component:
    | LazyExoticComponent<MemoExoticComponent<JSXComponent>>
    | JSXComponent
    | LazyExoticComponent<JSXComponent>
    | LazyExoticComponent<ComponentType<any>>;
  name: string;
}
export const routes: Route[] = [
   {
    to: "/",
    path: "/",
    Component: Index,
    name: "Home",
  }, 
  {
    to:  "/cart",
    path:"cart",
    Component: Cart,
    name: "Carrito",        
  },
  {
    to: "/favorites",
    path: "favorites",
    Component: Favorites,
    name: "Favoritos",        
  },
  {
    to: "/product/:id",
    path: "product/:id",
    Component: ProductDetail,
    name: "Detalle del Producto",
  },
  {
    to: "/walletsuccess",
    path: "walletsuccess",
    Component: WalletSuccess,
    name: "Pago exitoso",
  },
  {
    to: "/walletfailure",
    path: "walletfailure",
    Component: WalletFailure,
    name: "Pago fallido",
  },
  {
    to: "/walletpending",
    path: "walletpending",
    Component: WalletPending,
    name: "Pago Pendiente",
  },
];