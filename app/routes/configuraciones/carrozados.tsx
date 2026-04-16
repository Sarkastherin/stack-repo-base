import { useState } from "react";
import type { Route } from "../+types/home";
import { Sidebar } from "~/components/Sidebar";
import { TableComponent } from "~/components/TableComponent";
import useItemsConfig from "~/hooks/useItemsConfig";
import { FaPlus } from "react-icons/fa";
import { Button, Card } from "flowbite-react";
import { useConfiguracion } from "~/context/ConfiguracionesContext";
import logo from "../../../public/camion.png";
import { useNavigate } from "react-router";
import {
  LuPaintBucket,
  LuTruck,
  LuDoorOpen,
  LuContactRound,
  LuDrill,
  LuPencilRuler,
  LuWrench,
} from "react-icons/lu";
import { SubTitles } from "~/components/SubTitles";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Configuraciones de Productos" },
    { name: "description", content: "Configuraciones de Productos en StockAR" },
  ];
}
export type TabsTypes =
  | "colores"
  | "carrozados"
  | "puertas_traseras"
  | "personal"
  | "trabajos_chasis"
  | "items_control";

const submenu = [
  {
    key: "colores" as TabsTypes,
    name: "Colores",
    icon: LuPaintBucket,
  },
  {
    key: "carrozados" as TabsTypes,
    name: "Carrozados",
    icon: LuTruck,
  },
  {
    key: "puertas_traseras" as TabsTypes,
    name: "Puertas traseras",
    icon: LuDoorOpen,
  },
  {
    key: "personal" as TabsTypes,
    name: "Personal",
    icon: LuContactRound,
  },
  {
    key: "trabajos_chasis" as TabsTypes,
    name: "Trabajos chasis",
    icon: LuDrill,
  },
  {
    key: "items_control" as TabsTypes,
    name: "Items de control",
    icon: LuPencilRuler,
  },
];

export default function ProductosSettings() {
  const navigate = useNavigate();
  const { carrozados } = useConfiguracion();
  const { getItemsConfig } = useItemsConfig();
  const [activeTab, setActiveTab] = useState<TabsTypes>("colores");
  const itemsConfig = getItemsConfig();
  const activeItem = itemsConfig.find((item) => item.tab === activeTab);
  return (
    <div
      className="container mx-auto h-full py-4 px-4 md:px-6"
      style={{ minHeight: "calc(100vh - 90px)" }}
    >
      <SubTitles
        title="Configuraciones Avanzadas"
        icon={{ component: LuWrench, color: "white" }}
        back_path="/configuraciones"
      />
      <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 mx-auto gap-6 p-6 w-full">
        {carrozados.map((carrozado) => (
          <Card
            key={carrozado.id}
            className="hover:bg-violet-100/50 dark:hover:bg-violet-900/15 transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => navigate(`/configuraciones/carrozados/valores-predefinidos/${carrozado.id}`)}
          >
            <img src={carrozado.imagen_url || logo} alt={carrozado.nombre} />
            <h5 className="text-md font-bold tracking-tight text-gray-700 dark:text-white">
              {carrozado.nombre}
            </h5>
          </Card>
        ))}
      </div>
    </div>
  );
}
