import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "./contexts/CartContext";
import { FavoriteProvider } from "./contexts/FavoriteContext";
import MainLoader from "./components/MainLoader";
const AppRoutes = lazy(() => import("./routes/AppRutas"));

const queryClient = new QueryClient();

const App:React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <FavoriteProvider>
            <CartProvider>
              <AppRoutes />
            </CartProvider>
          </FavoriteProvider>
        </AuthProvider>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
