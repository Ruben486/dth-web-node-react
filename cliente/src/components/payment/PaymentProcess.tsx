import { useEffect, useState, useCallback } from "react";
import { loadMercadoPago } from "./api/mercadoPagoApi";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { useCart } from "@/components/cart/context/CartContext";
import { useToast } from "@/components/ui/use-toast";
import { IBrickError } from "@mercadopago/sdk-react/esm/bricks/util/types/common";

import type { User } from "@/components/user/types/usertypes"; 
// para que paso user ?
type PaymentProcessProps = {
   setPaymentProcess: (value: boolean) => void;
};
export const PaymentProcess = ({ setPaymentProcess }: PaymentProcessProps) => {
  const [loadWallet, setLoadWallet] = useState(true);
  const { toast } = useToast();
  const { cartItems } = useCart();
  const [preferenceId, setPreferenceId] = useState(null);
  const [walletOnReady, setWalletOnReady] = useState(false);
  //const res = loadMercadoPago({ items: cartItems, user })
  
  const handleMercadoPago = useCallback(async () => {
    // creaatePreference
    const res = await loadMercadoPago({ cartItems })
    
    if (res.data.data.id) {
      setPreferenceId(res.data.data.id);
      console.log(res.data)
    } else {
      toast({
        title: "Error",
        description: res.data.message,
        variant: "destructive",
      });
    }
  }, [cartItems, toast]);

  const mpOnSubmit = async () => {
    console.log("Payment submitted");
    // You can add any async logic here if needed
    return Promise.resolve();
  }
  const mpOnReady = () => {
    console.log("Mercado Pago SDK is ready");
    setWalletOnReady(true);
  };

  const mpOnError = (error: IBrickError) => {
    console.error("Error initializing Mercado Pago SDK:", error);
  };

  const handleCancelPayment = () => {
    setPreferenceId(null);
    setPaymentProcess(false);
    setWalletOnReady(false);
    setLoadWallet(false);
    toast({
      title: "Pago Cancelado",
      description: "El pago ha sido cancelado.",
      variant: "default",
    });
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
          onReady={mpOnReady}
          onSubmit={mpOnSubmit}
          onError={mpOnError}
        />
      )}
      {walletOnReady && (
        <button
          onClick={handleCancelPayment}
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
