import { memo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Destacados = {
  destacados: string[];
}
const AcordeonDestacados = memo(({destacados}:Destacados) => {
  return (
    <Accordion type="single" collapsible className="w-full mb-2">
      <AccordionItem value="caracteristicas">
        <AccordionTrigger className="text-xs font-medium py-2">
          Características principales
        </AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-1">
            {destacados.map((feature, index) => (
              <li
                key={index}
                className="text-xs text-gray-600 flex items-center gap-2"
              >
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                {feature}
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
});
export default AcordeonDestacados;