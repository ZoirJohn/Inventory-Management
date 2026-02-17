import type { TUser } from "../config/schema.ts";

declare global {
	namespace Express {
		interface User extends Omit<TUser, "password"> {}
	}
}

export {};
