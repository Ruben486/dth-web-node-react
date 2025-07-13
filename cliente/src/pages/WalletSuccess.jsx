export const WalletSuccess = () => {


  return (
    <>
      <div className="container flex justify-center items-center mx-auto">
        <div className="flex flex-col w-[60%] mx-auto p-10 justify-content-center items-center bg-slate-200 my-10  rounded-lg shadow-lg">
          <h3 className="text-center text-2xl font-semibold mb-3">
            Confirmación de Pago
          </h3>
          <h4 className="text-5xl font-semibold text-orange-600 ">
            ¡Gracias por tu compra!
          </h4>
        </div>
        <p className="text-center text-md mb-3">
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
    </>
  );
};
