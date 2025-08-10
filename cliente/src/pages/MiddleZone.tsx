import { lazy } from "react";

const Offers = lazy(() => import("@/components/product/Offers"));
const FeaturedProducts = lazy(() => import("@/components/product/FeaturedProducts"));
const PaymentAds = lazy(() => import("@/components/PaymentAds"));

const MiddleZone = () => {
  return (
    <>  
      <Offers />
      <PaymentAds />
      <FeaturedProducts />
    </>
  );
};
export default MiddleZone;
