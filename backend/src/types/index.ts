import type { TUser,TInventory } from "../config/schema.ts";

declare global {
	namespace Express {
		interface SafeUser extends TUser {}
		interface User extends TUser {}
		interface Request {
			inventory?: TInventory;
		}
	}
}

export {};
