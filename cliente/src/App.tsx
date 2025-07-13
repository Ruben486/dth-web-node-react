import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "./contexts/CartContext";
import { FavoriteProvider } from "./contexts/FavoriteContext";

import AppRutas from "./routes/AppRutas";

const queryClient = new QueryClient();

function App() {
  /* if (typeof window !== 'undefined') {
    scan({
      enabled: true,
      log: true, // logs render info to console (default: false)
    });
  } */
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
          <FavoriteProvider>
            <CartProvider>
              <Toaster />
              <AppRutas />
            </CartProvider>
          </FavoriteProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
