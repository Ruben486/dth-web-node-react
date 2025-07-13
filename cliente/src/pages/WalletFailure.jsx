import React, { useState } from "react";
import { useNavigate,} from "react-router-dom";

export const WalletFailure = () => {
  const [walletFailureOpen, setWalletFailureOpen] = useState(true);
  const navigate = useNavigate();
  
  const handleClose = () => {
    setWalletFailureOpen(false);
    navigate("/");
  };

  const handleRedirect = () => {
    setWalletFailureOpen(false);
  };
   return (
    <>
      <div
        className={`fixed inset-0 z-50 backdrop-blur-none bg-black/60 ${
          walletFailureOpen ? "flex" : "hidden"
        } items-center justify-center `}
      >
        <div
          className="bg-slate-300 backdrop-blur-md rounded-lg p-6 w-96 shadow-lg"
          style={{
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)",
          }}
        >
          <h2 className="text-xl font-bold mb-4">Error en el pago</h2>
          <p className="mb-4">
            Tu pago ha fallado. Por favor, intenta nuevamente.
          </p>
          <div className="flex justify-between">
            <button
              onClick={handleClose}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            >
              Cerrar
            </button>
            <button
              onClick={handleRedirect}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Volver al Carrito
            </button>
          </div>
        </div>
      </div>
    </>
  );
};


