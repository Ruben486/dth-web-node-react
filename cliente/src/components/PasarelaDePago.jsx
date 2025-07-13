import { loadMercadoPago } from "../api/mercadoPagoApi";
import { useEffect, useState, useCallback } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useCart } from "../contexts/CartContext";
import { useToast } from "./ui/use-toast";

export const PasarelaDePago = ({ loadWallet, setLoadWallet, onClose,user }) => {
  const { toast } = useToast();
  const { cartItems } = useCart();
  const [preferenceId, setPreferenceId] = useState(null);
  const [walletOnReady, setWalletOnReady] = useState(false);

  const handleMercadoPago = useCallback(async () => {
    const res = await loadMercadoPago(cartItems,user);
    if (res.data.data.id) {
      setPreferenceId(res.data.data.id);
    } else {
      toast({
        title: "Error",
        description: res.data.message,
        variant: "destructive",
      });
    }
  }, [cartItems, toast]);

  const handleMPOnReady = () => {
    console.log("Mercado Pago SDK is ready");
    setWalletOnReady(true);
  };

  // useEffect to handle Mercado Pago SDK initialization
  useEffect(() => {
    if (!loadWallet) return;
    handleMercadoPago();
    // Initialize Mercado Pago SDK

    initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, {
      locale: "es-AR",
    });

    return () => {
      // Cleanup function to reset the state when the component unmounts
      setPreferenceId(null);
      setWalletOnReady(false);
    };
  }, [handleMercadoPago, loadWallet]);

  return (
    <>
      {preferenceId && (
        <Wallet
          initialization={{ preferenceId }}
          onReady={handleMPOnReady}
          onSubmit={(event) => {
            console.log("Preference ID processed:", preferenceId);
            console.log("Payment details:", event);
          }}
        />
      )}
      {walletOnReady && (
        <button
          onClick={() => {
            setPreferenceId(null);
            setWalletOnReady(false);
            setLoadWallet(false);
            onClose();
            toast({
              title: "Pago Cancelado",
              description: "El pago ha sido cancelado.",
              variant: "default",
            });
          }}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Cancelar Pago
        </button>
      )}
    </>
  );
};
