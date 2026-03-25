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

	SALESFORCE: BASE_URL + "/salesforce/contact",
} as const;

export const client = {
	AUTH_GOOGLE: async () => {
		window.location.href = API.AUTH_GOOGLE;
	},
	AUTH_FACEBOOK: async () => {
		window.location.href = API.AUTH_FACEBOOK;
	},
	LOGIN: async (body: Body) => {
		const res = await fetch(API.LOGIN, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
			credentials: "include",
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message);
		return data;
	},
	REGISTER: async (body: Body) => {
		const res = await fetch(API.REGISTER, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message);
		return data;
	},
	GET_ME: async () => {
		const res = await fetch(API.ME, { credentials: "include" });
		const data = await res.json();
		if (!res.ok) throw new Error(data.message);
		return data;
	},
	GET_INVENTORIES: async () => {
		const res = await fetch(API.INVENTORIES);
		const data = await res.json();
		if (!res.ok) throw new Error(data.message);
		return data;
	},
	GET_INVENTORY: async (inventoryId: string) => {
		const res = await fetch(API.INVENTORIES + "/" + inventoryId);
		const data = await res.json();
		if (!res.ok) throw new Error(data.message);
		return data;
	},
	CREATE_INVENTORY: async (body: Body) => {
		const res = await fetch(API.INVENTORIES, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
			credentials: "include",
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message);
		return data;
	},
	DELETE_INVENTORY: async (inventoryId: string) => {
		const res = await fetch(API.INVENTORIES + "/" + inventoryId, {
			method: "DELETE",
			credentials: "include",
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message);
		return data;
	},
	GET_ITEMS: async (inventoryId: string) => {
		const res = await fetch(API.INVENTORIES + "/" + inventoryId + "/items");
		const data = await res.json();
		if (!res.ok) throw new Error(data.message);
		return data;
	},
	CREATE_ITEM: async (inventoryId: string, body: object) => {
		const res = await fetch(API.INVENTORIES + "/" + inventoryId + "/items", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...body }),
			credentials: "include",
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message);
		return data;
	},
	DELETE_ITEM: async (itemId: string) => {
		const res = await fetch(API.ITEMS + "/" + itemId, {
			method: "DELETE",
			credentials: "include",
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message);
		return data;
	},
	GET_CUSTOM_ID: async (inventoryId: string) => {
		const res = await fetch(API.INVENTORIES + "/" + inventoryId + "/id-format");
		const data = await res.json();
		if (!res.ok) throw new Error(data.message);
		return data;
	},
	CREATE_CUSTOM_ID: async (inventoryId: string, customId: Array<{ type: string; value: string; order: number }>) => {
		const res = await fetch(API.INVENTORIES + "/" + inventoryId + "/id-format", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ idFormat: customId }),
			credentials: "include",
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message);
		return data;
	},
	GET_USERS: async () => {
		const res = await fetch(API.USERS, { credentials: "include" });
		const data = await res.json();
		if (!res.ok) throw new Error(data.message);
		return data;
	},
	GRANT: async (userId: string) => {
		const res = await fetch(API.USERS + "/" + userId + "/make-admin", {
			method: "PATCH",
			credentials: "include",
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message);
		return data;
	},
	REVOKE: async (userId: string) => {
		const res = await fetch(API.USERS + "/" + userId + "/remove-admin", {
			method: "PATCH",
			credentials: "include",
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message);
		return data;
	},
	BAN: async (userId: string) => {
		const res = await fetch(API.USERS + "/" + userId + "/block", {
			method: "PATCH",
			credentials: "include",
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message);
		return data;
	},
	UNBAN: async (userId: string) => {
		const res = await fetch(API.USERS + "/" + userId + "/unblock", {
			method: "PATCH",
			credentials: "include",
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message);
		return data;
	},
	DELETE_USER: async (userId: string) => {
		const res = await fetch(API.USERS + "/" + userId, {
			method: "DELETE",
			credentials: "include",
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message);
		return data;
	},
	SYNC_WITH_SALESFORCE: async (formData: { FirstName: string; LastName: string; Title: String; Email: string }) => {
		const body = JSON.stringify(formData);
		const res = await fetch(API.SALESFORCE, { method: "POST", body, headers: { "Content-Type": "application/json" } });
		const data = await res.json();
		console.log(data);
		if (!res.ok) throw new Error(data[0].errorCode);
		return data;
	},
};
