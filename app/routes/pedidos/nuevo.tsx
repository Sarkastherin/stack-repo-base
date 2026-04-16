import { SubTitles } from "~/components/SubTitles";
import PedidosForm from "~/forms/PedidosForm";
import { LuBookPlus } from "react-icons/lu";
export default function NuevoPedido() {
  return (
    <>
      <SubTitles title="Nuevo pedido" back_path="/" icon={{ component: LuBookPlus, color: "text-blue-500" }} />
      <PedidosForm />
    </>
  );
}
