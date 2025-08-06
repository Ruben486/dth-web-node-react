import { lazy } from "react";

const Offers = lazy(() => import("@/components/Offers"));
const FeaturedProducts = lazy(() => import("@/components/FeaturedProducts"));

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
