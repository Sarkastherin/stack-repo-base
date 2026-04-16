import type { Route } from "../+types/home";
import { useOutletContext } from "react-router";
import type { PedidoFormValues } from "~/types/pedido";
import DatosColocacion from "~/forms/DatosColocacionForm";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Editar Colocación" },
    { name: "description", content: "Edita los detalles de la colocación" },
  ];
}
export default function PedidosDatosColocacion() {
  const pedido = useOutletContext() as PedidoFormValues;
  return (
    <section className="ps-4 w-full">
      <DatosColocacion pedido={pedido} />
    </section>
  );
}
