import type { TUser,TInventory } from "../config/schema.ts";

declare global {
	namespace Express {
		interface User extends Omit<TUser, "password"> {}
		interface Request {
			inventory?: TInventory;
			
		}
	}
}

export {};
