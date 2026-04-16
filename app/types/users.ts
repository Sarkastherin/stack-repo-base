import type { CommonTypes } from "./commonTypes";
export type Role = "ADMIN" | "SUPERVISOR" | "SELLER" | "USER";
export type UsersTable = CommonTypes & {
  nombre: string;
  apellido: string;
  email: string;
  role: Role;
};
