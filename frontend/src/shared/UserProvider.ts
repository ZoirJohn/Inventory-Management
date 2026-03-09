import { createContext } from "react";

export const UserProvider = createContext<{ user: TUser | null; refetch: () => void ,}>({
	user: null,
	refetch: () => {},
});
