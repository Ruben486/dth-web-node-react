import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Index from "../pages/Index";
import ProductDetail from "../pages/ProductDetail"; 
import Cart from "../pages/Cart";
import Favorites from "../pages/Favorites";

const Rutas = () => { 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
        
      </Routes>
    </BrowserRouter>
  );
};
export default Rutas;

