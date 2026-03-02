const BASE_URL = import.meta.env.VITE_BASE_URL;
const API = {
	AUTH_GOOGLE: BASE_URL + "/auth/google",
	AUTH_FACEBOOK: BASE_URL + "/auth/facebook",
	REGISTER: BASE_URL + "/auth/register",
	LOGIN: BASE_URL + "/auth/login",
	LOGOUT: BASE_URL + "/auth/logout",
	ME: BASE_URL + "/auth/me",

	INVENTORIES: BASE_URL + "/inventories",
	USERS: BASE_URL + "/users",
	ITEMS: BASE_URL + "/items",
} as const;

export const client = {
	AUTH_GOOGLE: async () => {
		try {
			window.location.href = API.AUTH_GOOGLE;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			}
		}
	},
	AUTH_FACEBOOK: async () => {
		try {
			window.location.href = API.AUTH_FACEBOOK;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			}
		}
	},
	GET_ME: async () => {
		try {
			const res = await fetch(API.ME,{credentials:"include"}).then((res) => res);

			if (!res.ok) throw new Error(res.statusText);
			const data = await res.json();

			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			}
		}
	},
	GET_INVENTORIES: async () => {
		try {
			const res = await fetch(API.INVENTORIES).then((res) => res);

			if (!res.ok) throw new Error(res.statusText);
			const data = await res.json();

			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			}
		}
	},
	GET_INVENTORY: async (inventoryId: string) => {
		try {
			const res = await fetch(API.INVENTORIES + "/" + inventoryId).then((res) => res);

			if (!res.ok) throw new Error(res.statusText);
			const data = await res.json();

			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			}
		}
	},
	CREATE_INVENTORY: async (body: Body) => {
		try {
			const res = await fetch(API.INVENTORIES, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});

			if (!res.ok) {
				throw new Error(res.statusText);
			}
			const data = await res.json();

			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
		}
	},
	GET_ITEMS: async (inventoryId: string) => {
		try {
			const res = await fetch(API.INVENTORIES + "/" + inventoryId + "/items");
			if (!res.ok) throw new Error(res.statusText);
			const data = await res.json();
			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
		}
	},
	CREATE_ITEM: async (inventoryId: string, body: object) => {
		try {
			const res = await fetch(API.INVENTORIES + "/" + inventoryId + "/items", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...body }),
				credentials:"include"
			});
			if (!res.ok) {
				throw new Error(res.statusText);
			}
			const data = await res.json();

			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
		}
	},
	DELETE_ITEM: async (itemId: string) => {
		try {
			const res = await fetch(API.ITEMS + "/" + itemId, { method: "DELETE",credentials:"include" });
			if (!res.ok) {
				throw new Error(res.statusText);
			}
			const data = await res.json();

			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
		}
	},
	GET_USERS: async () => {
		try {
			const res = await fetch(API.USERS);
			if (!res.ok) {
				throw new Error(res.statusText);
			}
			const data = await res.json();

			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
		}
	},
};
