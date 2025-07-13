import React, { useEffect, useState, memo } from "react";
import { Modal } from "./Modal";
import { useToast } from "./ui/use-toast";
import { sendVerificationEmail } from "../api/verifyEmailApi";
import { verifyCode } from "../api/verifyCode";
import { LottieFiles } from "./LottieFiles";
import EditV2 from "../assets/Edit V2-1.json";
import Vacancy from "../assets//Vacancy";

export const VerifyEmail = memo(({ isOpen, onClose, user, processStep, setProcessStep}) => {

  const [isSending, setIsSending] = useState(false);
  const [miles, setMiles] = useState(0);
  const [centenas, setCentenas] = useState(0);
  const [decenas, setDecenas] = useState(0);
  const [unidades, setUnidades] = useState(0);
  const [validNum, setvalidNum] = useState(false);
  let codigo = 0;
  
  
  const { toast } = useToast();
  
  const handleSendEmail = async () => {
    setIsSending((prev) => true);
    const email = { email: user.email };
    const res = await sendVerificationEmail(email);
    setIsSending((prev) => false);
    if (res.status === 200) setProcessStep("verifyCode");
    else {
      toast({
        title: "Verificación de correo",
        description: `Se produjo un error durante el proceso de validación`,
        variant: "destructive",
      });
      onClose();
    }
  };
  if (validNum == true) {
    codigo =
    parseInt(miles, 10) * 1000 +
    parseInt(centenas, 10) * 100 +
    parseInt(decenas, 10) * 10 +
    parseInt(unidades, 10);
  }
  
  const handleSendCode = async () => {
    const data = { email: user.email, code: codigo };
    setIsSending((prev) => true);
    const result = await verifyCode(data);
    setIsSending((prev) => false);
    if (result.status === 200) {
      toast({
        title: "Verificación de Código",
        description: `proceso de validación: ${result.data.message}`,
      });
      if (result.data.success) {
        setProcessStep("loadWallet")
        onClose();
      }; 
    } else {
      toast({
        title: "Verificación de Código",
        description: `Se produjo un error durante la validación del código`,
        variant: "destructive",
      });
    }
  };
  
  const handleCancel = () => {
    setProcessStep("sendEmail");
  };
  
  const inputClassName =
  "w-14 h-10 bg-neutral-200 rounded-md p-3 text-center text-2xl";

  const buttonClassName = "bg-zinc-800 text-gray-50 rounded-md hover:cursor-pointer hover:bg-red-500 transition-all duration-75 p-3 disabled:bg-gray-300 disabled:hover:cursor-not-allowed";

  const setValue = (e) => {
    const value = e.target.value;
    switch (e.target.name) {
      case "miles":
        setMiles(value);
        break;
      case "cientos":
        setCentenas(value);
        break;
      case "decenas":
        setDecenas(value);
        break;
      case "unidades":
        setUnidades(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const checkInputValues = (e) => {
      if (
        parseInt(miles, 10) >= 0 &&
        parseInt(miles, 10) <= 9 &&
         parseInt(centenas, 10) >= 0 &&
        parseInt(centenas, 10) <= 9 &&
        parseInt(decenas, 10) >= 0 &&
        parseInt(decenas, 10) <= 9 &&
        parseInt(unidades, 10) >= 0 &&
        parseInt(unidades, 10) <= 9
      ) {
        return true;
      }
      return false;
    };
    setvalidNum(() => checkInputValues());
  }, [miles, centenas, decenas, unidades]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Verificación de Correo">
      <div className="p-2 rounded-lg shadow-md">
        <form>
          {processStep === "sendEmail" ? (
            <p>
              {" "}
              Se enviará un código para verificar el correo asociado a su
              cuenta.
            </p>
          ) : (
            <p className="text-center">
              Ingrese el código que ha recibido en el correo
            </p>
          )}
          {processStep === "verifyCode" && (
            <div className="my-4 flex justify-center items-center gap-4 ">
              <input
                type="text"
                name="miles"
                value={miles}
                onChange={setValue}
                className={inputClassName}
              />

              <input
                type="text"
                required
                name="cientos"
                value={centenas}
                onChange={setValue}
                className={inputClassName}
              />

              <input
                type="text"
                required
                name="decenas"
                value={decenas}
                onChange={setValue}
                className={inputClassName}
              />
              <input
                type="text"
                required
                name="unidades"
                value={unidades}
                onChange={setValue}
                className={inputClassName}
              />
            </div>
          )}

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>
          <div className="flex justify-between items-center gp-2 p-3 mt-5">
            <>
              {processStep === "sendEmail" ? (
                <>
                  <button
                    type="button"
                    className={`${buttonClassName}`}
                    onClick={handleSendEmail}
                    disabled={isSending}
                  >
                    Enviar Mail
                  </button>
                  <div
                    className={`"w-10 h-10 bg-gray-200 rounded-full flex justify-center items-start shadow-lg" ${
                      isSending ? "visible" : "invisible"
                    }`}
                  >
                    <LottieFiles lotie={EditV2} />
                  </div>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    disabled={!validNum || isSending}
                    className={`${buttonClassName}`}
                    onClick={handleSendCode}
                  >
                    Enviar Código
                  </button>
                  <div
                    className={`"w-10 h-10 bg-gray-200 rounded-full flex justify-center items-start border-1 border-zinc-400 shadow-lg" ${
                      isSending ? "visible" : "invisible"
                    }`}
                  >
                    <LottieFiles lotie={Vacancy} />
                  </div>
                </>
              )}

              <button
                className={`${buttonClassName}`}
                onClick={onClose}
              >
                Cancelar
              </button>
            </>
          </div>
        </form>
      </div>
    </Modal>
  );
});


