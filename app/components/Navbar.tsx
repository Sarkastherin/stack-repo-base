import {
  DarkThemeToggle,
  Navbar,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import { NavLink, useNavigate } from "react-router";
import { LogoComponent } from "./LogoComponent";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";
import { useNavItems } from "~/hooks/useNavItems";
import { LuLogOut, LuShieldCheck, LuUserRound } from "react-icons/lu";

const NavLinkComponent = ({ children, to }: { children: React.ReactNode; to: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 md:w-auto md:justify-start md:rounded-full md:px-4 md:py-2 ${
        isActive
          ? "bg-violet-600 text-white shadow-sm shadow-violet-500/30 dark:bg-violet-500"
          : "text-gray-600 hover:bg-white hover:text-violet-700 dark:text-gray-300 dark:hover:bg-gray-700/80 dark:hover:text-violet-300"
      }`
    }
  >
    {children}
  </NavLink>
);

export function NavBar() {
  const { activeUser, isLoading } = useUser();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { navItems } = useNavItems();

  const fullName = activeUser
    ? `${activeUser.nombre} ${activeUser.apellido}`.trim()
    : "Cargando usuario";
  const initials = activeUser
    ? `${activeUser.nombre?.[0] ?? ""}${activeUser.apellido?.[0] ?? ""}`.toUpperCase()
    : "..";

  const handleLogout = async () => {
    try {
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesion:", error);
    }
  };

  return (
    <Navbar className="sticky top-0 z-50 border-b border-white/50 bg-linear-to-r from-slate-50 via-white to-violet-50/80 shadow-sm backdrop-blur-xl dark:border-gray-700/70 dark:from-gray-900 dark:via-gray-900 dark:to-violet-950/40">
      <NavLink to="/" className="flex items-center gap-2">
        <LogoComponent />
      </NavLink>
      <NavbarToggle className="rounded-full border border-gray-200 bg-white/80 hover:bg-white dark:border-gray-700 dark:bg-gray-800/80 dark:hover:bg-gray-800" />
      <NavbarCollapse className="mt-4 w-full gap-3 rounded-3xl border border-white/70 bg-white/80 p-3 shadow-lg backdrop-blur-xl dark:border-gray-700/70 dark:bg-gray-900/80 md:mt-0 md:w-auto md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none">
        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:gap-3 mb-2 md:mb-0">
          {navItems.map((item) => (
            <NavLinkComponent key={item.to} to={item.to}>
              {item.name}
            </NavLinkComponent>
          ))}
        </div>

        <div className="h-px w-full bg-linear-to-r from-transparent via-violet-200 to-transparent dark:via-violet-800 md:hidden" />

        <div className="flex w-full flex-col gap-3 md:ml-auto md:w-auto md:flex-row md:items-center">
          <div className="flex w-full items-center gap-3 rounded-2xl border border-violet-200/70 bg-white/80 px-3 py-3 shadow-sm backdrop-blur-md dark:border-violet-800/60 dark:bg-gray-800/80 md:min-w-55 md:py-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-violet-600 to-indigo-500 text-sm font-bold text-white shadow-sm shadow-violet-500/30">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                {fullName}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300">
                <LuShieldCheck className="h-3.5 w-3.5 text-violet-500" />
                <span className="truncate uppercase tracking-[0.18em]">
                  {isLoading ? "Sincronizando" : activeUser?.role ?? "Usuario"}
                </span>
              </div>
            </div>
            <div className="hidden h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:flex dark:bg-violet-500/10 dark:text-violet-300">
              <LuUserRound className="h-4 w-4" />
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-2 md:flex md:w-auto md:items-center">
            <DarkThemeToggle className="flex h-11 w-full items-center justify-center rounded-2xl border border-gray-200 bg-white/80 hover:bg-white dark:border-gray-700 dark:bg-gray-800/80 dark:hover:bg-gray-800 md:w-auto md:rounded-full" />
            <button
              onClick={handleLogout}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-600 transition-all duration-200 hover:bg-red-100 dark:border-red-700/50 dark:bg-red-950/30 dark:text-red-300 dark:hover:bg-red-900/40 md:w-auto md:rounded-full md:px-2.5"
              title="Cerrar sesión"
            >
              <LuLogOut className="h-4.5 w-4.5" />
              <span className="md:hidden">Salir</span>
            </button>
          </div>
        </div>
      </NavbarCollapse>
    </Navbar>
  );
}
