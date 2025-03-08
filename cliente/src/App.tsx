import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "./contexts/CartContext";
import { FavoriteProvider } from "./contexts/FavoriteContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Rutas from "./routes/Rutas";
import { AuthProvider } from "./contexts/AuthContext";
import { scan } from 'react-scan'; // import this BEFORE react
const queryClient = new QueryClient();

function App() {
  if (typeof window !== 'undefined') {
    scan({
      enabled: true,
      log: true, // logs render info to console (default: false)
    });
  }
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
