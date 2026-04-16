import { Navigate } from "react-router";
import { useAuth } from "~/context/AuthContext";
import { useEffect } from "react";
import { useUser } from "~/context/UserContext";
import type { Role } from "~/types/users";
import { LoadingComponent } from "./LoadingComponent";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  allowedRoles?: Role[];
}
export default function ProtectedRoute({
  children,
  redirectTo = "/login",
  allowedRoles,
}: ProtectedRouteProps) {
  const { auth, getAuth, isLoading: authLoading } = useAuth();
  const { activeUser, isLoading: userLoading } = useUser();

  useEffect(() => {
    if (auth === null) {
      void getAuth();
    }
  }, [auth, getAuth]);

  if (auth === null || authLoading || (auth && userLoading)) {
    return <LoadingComponent />;
  }

  if (!auth) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!activeUser) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(activeUser.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
{/* <ProtectedRoute allowedRoles={["ADMIN", "SUPERVISOR"]}>
  <Outlet />
</ProtectedRoute> */}