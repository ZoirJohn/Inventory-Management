import { createContext } from "react";

export const UserProvider = createContext<{ user: UserType | null }>({ user: null });
