import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { VerifyEmail } from "./VerifyEmail";
import { PasarelaDePago } from "./PasarelaDePago";

export const PaymentProcess = ({ isOpen, onClose, user,processStep,setProcessStep }) => {
  const [loadWallet, setLoadWallet] = useState(true);
  
  // validacion de email
  // lanzamiento de la pasarela de pago
  // redireccion a la pagina de gracias por tu compra
  // redireccion a generacion de la orden
  
  return (
    <>
      {processStep === "sendEmail" || processStep === "verifyCode" ? (
        <VerifyEmail
          isOpen={isOpen}
          onClose={onClose}
          user={user}
          processStep={processStep}
          setProcessStep={setProcessStep}
        />
      ) : (
        <PasarelaDePago
          loadWallet={loadWallet}
          setLoadWallet={setLoadWallet}
          isOpen={isOpen}
          onClose={onClose}
          user={user}
        />
      )}
    </>
  );
};
