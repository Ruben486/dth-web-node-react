import { memo } from "react";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { mediosPagos } from "../constants/mediosPagos";

export const MediosDePago = memo(() => {
  type MedioPago = {
   id: string,
   texto: string,
   icono: React.ComponentType<React.SVGProps<SVGSVGElement>>; 
} 

  return (
    <>
      <Card
        className="md:max-w-md overflow-hidden bg-white text-sm/6 rounded-3xl p-2 
         shadow-lg ring-1 ring-gray-900/5 min-h-96"
      >
        <CardHeader>
          <CardTitle className="flex justify-center text-gray-600">
            Medios de Pagos y descuentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-6">
            {mediosPagos.map((medio: MedioPago, idx: number) => {
              const Icono = medio.icono;
              return (
                <li
                  key={medio.id}
                  className="flex h-12 gap-3 items-center space-x-2 px-2 bg-slate-100 rounded-sm"
                >
                  <Icono className="h-6 w-6 text-gray-600" />
                  <span
                    className={`font-semibold ${
                      idx === 0 ? "text-orange-600" : "text-gray-700"
                    } `}
                  >
                    {medio.texto}
                  </span>
                  <Check className="h-4 w-4 text-green-500" />
                </li>
              );
            })}
          </ul>
          {/*  */}
        </CardContent>
      </Card>
    </>
  );
});
