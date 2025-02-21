import  Header from "../components/Header"
import CartSection from "@/components/CartSection";
import Footer from "@/components/Footer";

const Cart = () => {
  return (
    <div className="bg-white">
      <Header />
      <main className="pt-4 min-h-screen">
        <CartSection />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Cart;