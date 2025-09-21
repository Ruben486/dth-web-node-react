
import { useAuth } from "@/components/user/context/authContext";
import PageHeader from "../components/header/PageHeader";

export const WalletSuccess = () => {
  const { user } = useAuth();
  return (
    <>
      < PageHeader />
      <div className="container h-screen flex justify-center items-center mx-auto animate-fade-in"
        style={{
          backgroundImage: `radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #ec4899 100%)`,
          backgroundSize: "100% 100%",
        }}
      >
     

      <div className="flex flex-col w-[60%] p-10 justify-content-center items-center my-3 bg-slate-100 rounded-lg"
        style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px" }}
      >
        <h3 className="text-center text-2xl font-semibold mb-3">
          Confirmación de Pago
        </h3>
        <h4 className="text-5xl font-semibold text-pink-600 mb-6 font-['Montserrat']">
          ¡ Gracias por tu compra !
        </h4>
        <h3 className="text-center text-6xl font-bold mb-6">{user?.username}</h3>
        <p className="text-center text-md mb-6">
          Tu pago ha sido procesado exitosamente.A continuacion se generará una
          oden de Pago consignando todos los datos y te será enviada a tu correo
        </p>
        <button
          className="btn btn-primary mt-3 bg-slate-800 text-white px-4 py-3 rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Regresar
        </button>
      </div>
    </div >

    </>
  );
};
export default WalletSuccess;
