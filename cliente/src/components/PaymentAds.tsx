import { memo } from "react";

import { MediosDePago } from "./MediosDePagos";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";

const PaymentAds = memo(() => {
  console.log("pagos");

  return (
    <section className="w-full md:flex gap-2 py-6 items-start justify-between">
      <Card
        className="w-full overflow-hidden bg-white text-sm/6
       rounded-3xl md:p-1 shadow-3lg ring-1 ring-gray-900/5 min-h-96 flex-1 mb-3 md:max-w-[65%]"
      >
        <CardHeader>
          <CardTitle className="flex justify-center text-gray-600 my-2">
            ¡ Ahorrá más pagando en efectivo !
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full lg:flex gap-2 items-start justify-between p-2 ">
          <div className="w-full lg:w-[40%] text-base mb-2">
            Obtené un descuento exclusivo del 15% al pagar en efectivo. ¡Oferta
            por tiempo limitado!
          </div>

          <div className="lg:w-[60%] overflow-hidden rounded-lg min-h-64">
            <img
              src="https://images.unsplash.com/photo-1618667054276-690d5271d35d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGFnbyUyMGVuJTIwZWZlY3Rpdm98ZW58MHx8MHx8fDI%3D"
              alt="Oferta especial"
              className="w-full rounded-lg shadow-xl h-64 object-cover"
            />
          </div>
        </CardContent>
      </Card>
      {/* aca va la segunda tarjeta */}

      <MediosDePago />
    </section>
  );
});

export default PaymentAds;
