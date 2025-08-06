import { useState } from "react";

import { PasarelaDePago } from "./PasarelaDePago";

export const PaymentProcess = ({
  isOpen,
  onClose,
  user,
}) => {
  const [loadWallet, setLoadWallet] = useState(true);

  
  return (
    <>
      <PasarelaDePago
        loadWallet={loadWallet}
        setLoadWallet={setLoadWallet}
        isOpen={isOpen}
        onClose={onClose}
        user={user}
      />
    </>
  );
};
