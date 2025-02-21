import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "./contexts/CartContext";
import { FavoriteProvider } from "./contexts/FavoriteContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Rutas from "./routes/Rutas";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <FavoriteProvider>
          <CartProvider>
            <Toaster />
            <Rutas />
          </CartProvider>
        </FavoriteProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
