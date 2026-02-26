import { createContext } from "react";

export const UserProvider = createContext<{ user: TUser | null }>({
  user: null,
});
