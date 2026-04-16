import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAllSheets } from "~/backend/Database/apiGoogleSheets";
import { getDataInJSONFormat } from "~/backend/Database/helperTransformData";
import { useAuth } from "~/context/AuthContext";
import type { UsersTable } from "~/types/users";
const SHEET_ID =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_SHEET_ID_USERS_DEV
    : import.meta.env.VITE_SHEET_ID_USERS;
const SHEETS = ["usuarios!A:J"];
type UserContextType = {
  getUserData: () => Promise<UsersTable[]>;
  activeUser: UsersTable | null;
  getUser: (email: string) => Promise<UsersTable | null>;
  isLoading: boolean;
};
const UserContext = createContext<UserContextType | undefined>(undefined);
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { auth, email } = useAuth();
  const [users, setUsers] = useState<UsersTable[]>([]);
  const [activeUser, setActiveUser] = useState<UsersTable | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getUserData = useCallback(async (): Promise<UsersTable[]> => {
    try {
      const { data, error } = await getAllSheets(SHEET_ID, SHEETS);
      if (error) {
        throw new Error(
          `Error al obtener los datos de la hoja de usuarios: ${error.message}`,
        );
      }
      if (!data || data.length === 0) {
        console.warn("No se encontraron datos en la hoja de usuarios.");
        return [];
      }
      const normalizedUsers = getDataInJSONFormat<UsersTable>(data[0]);
      setUsers(normalizedUsers);
      return normalizedUsers;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return [];
    }
  }, []);

  const getUser = useCallback(
    async (userEmail: string): Promise<UsersTable | null> => {
      const cachedUsers = users.length > 0 ? users : await getUserData();
      if (cachedUsers.length === 0) {
        setActiveUser(null);
        return null;
      }

      const user = cachedUsers.find((item) => item.email === userEmail) || null;
      setActiveUser(user);
      return user;
    },
    [getUserData, users],
  );

  useEffect(() => {
    const syncActiveUser = async () => {
      if (!auth || !email) {
        setActiveUser(null);
        return;
      }

      setIsLoading(true);
      try {
        await getUser(email);
      } finally {
        setIsLoading(false);
      }
    };

    void syncActiveUser();
  }, [auth, email, getUser]);

  return (
    <UserContext.Provider
      value={{ getUserData, activeUser, getUser, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
