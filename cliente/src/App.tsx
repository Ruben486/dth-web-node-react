import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./components/user/context/authContext";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "./components/cart/context/CartContext";
import { FavoriteProvider } from "./components/favorites/context/FavoriteContext";
import AppRutas from "./routes/AppRutas";
const queryClient = new QueryClient();

const App: React.FC = () => {
  console.log('render App');
  const [searchString, setSearchString] = useState('')
  const [searchCategory, setSearchCategory] = useState('000');
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <FavoriteProvider>
            <AppRutas searchString={searchString} setSearchString={setSearchString} searchCategory={searchCategory}
              setSearchCategory={setSearchCategory}
            />
          </FavoriteProvider>
        </CartProvider>
      </AuthProvider>
      <Toaster />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
export default App;
// cloudflared tunnel --url http://localhost:5173