import { NavBar } from "~/components/Navbar";
import ProtectedRoute from "~/components/ProtectedRoute";
import { Outlet } from "react-router";
import ModalManager from "~/components/modals/ModalManager";
import { PedidosProvider } from "~/context/PedidoContext";
import { ConfiguracionesProvider } from "~/context/ConfiguracionesContext";
import { AdministracionProvider } from "~/context/AdministracionContext";
import { GlobalProvider } from "~/context/GlobalContext";
import { SociosProvider } from "~/context/SociosComercialesContext";
export default function Layout() {
  return (
    <main className="min-h-screen w-full flex flex-col gap-4 text-gray-800 dark:text-white bg-white dark:bg-gray-900">
      <NavBar />
      <div className="">
        <ProtectedRoute>
          <GlobalProvider>
            <SociosProvider>
              <ConfiguracionesProvider>
                <AdministracionProvider>
                  <PedidosProvider>
                    <div className="container mx-auto px-6 lg:px-0">
                      <Outlet />
                    </div>
                    <ModalManager />
                  </PedidosProvider>
                </AdministracionProvider>
              </ConfiguracionesProvider>
            </SociosProvider>
          </GlobalProvider>
        </ProtectedRoute>
      </div>
    </main>
  );
}
