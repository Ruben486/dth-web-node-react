import { lazy } from "react";
import { motion } from "framer-motion";
import { motionProps } from "../constants/motionProps";

const Hero = lazy(() => import("@/components/Hero"));
const Offers = lazy(() =>
  import("@/components/Offers")
);
const FeaturedProducts = lazy(() =>
  import("@/components/FeaturedProducts")
);

const PaymentAds = lazy(() =>
  import("@/components/PaymentAds")
);
export const MiddleZone = () => {
  return (
    <>
      <motion.div {...motionProps}>
        <Hero />
      </motion.div>
      <Offers />
      <PaymentAds />
      <FeaturedProducts />
    </>
  );
};
