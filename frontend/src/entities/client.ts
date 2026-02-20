const BASE_URL = import.meta.env.VITE_BASE_URL;
const API = {
	AUTH_GOOGLE: BASE_URL + "/auth/google",
	AUTH_FACEBOOK: BASE_URL + "/auth/facebook",
	REGISTER: BASE_URL + "/auth/register",
	LOGIN: BASE_URL + "/auth/login",
	LOGOUT: BASE_URL + "/auth/logout",
	ME: BASE_URL + "/auth/me",
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
			const res = await fetch(API.ME, { credentials: "include" }).then(res=>res);
			if (!res.ok) throw new Error("Unexpected error occured");
			const data = res.json();
			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			}
		}
	},
};
