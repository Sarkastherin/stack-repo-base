import type { Route } from "../+types/home";
import { useParams } from "react-router";
import { LoadingComponent } from "~/components/LoadingComponent";
import { useAdministracion } from "~/context/AdministracionContext";
import { Card } from "flowbite-react";
import { formatCuit } from "~/components/InputsForm";
import { useMemo } from "react";
import ButtonsActionsCtaCte from "~/components/specials/ButtonsActionsCtaCte";
import TableMovimientos from "~/components/specials/TableMovimientos";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cuenta Corriente" },
    {
      name: "description",
      content: "Bienvenido a la gestión de cuenta corriente",
    },
  ];
}

export default function CuentaCorriente() {
  const { socioId } = useParams();
  const { ctasCorrientesData } = useAdministracion();
  const ctaCte = ctasCorrientesData?.find(
    (s) => String(s.cliente.id) === socioId,
  );
  const saldo = useMemo(() => {
    if (!ctaCte) return 0;
    return ctaCte.debe - ctaCte.haber;
  }, [ctaCte]);
  
  if (!ctaCte) {
    return <LoadingComponent />;
  }
  return (
    <div className="container mx-auto px-6 lg:px-0">
      <div className="px-6 py-8 w-full flex flex-col items-center max-w-7xl mx-auto">
          <Card className="w-full mb-4">
            <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Razón social
                  </p>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                    {ctaCte.cliente?.razon_social}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    CUIT: {formatCuit(ctaCte.cliente?.cuit_cuil)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Cond. IVA: {ctaCte.cliente?.condicion_iva}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Saldo actual
                </span>
                <div
                  className={`mt-2 inline-flex items-center px-4 py-3 rounded-2xl text-white text-2xl font-bold ${saldo < 0 ? "bg-red-500" : saldo > 0 ? "bg-green-500" : "bg-gray-500"}`}
                >
                  {saldo.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </div>
              </div>
            </div>
          </Card>
          <div className="w-full mt-6">
            <ButtonsActionsCtaCte ctaCte={ctaCte}/>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white my-4">
              Movimientos
            </h2>
            <TableMovimientos movimientos={ctaCte.movimientos} />
          </div>
        </div>
    </div>
  );
}
