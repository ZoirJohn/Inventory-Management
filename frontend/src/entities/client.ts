const API = {
	AUTH_GOOGLE: import.meta.env.VITE_BASE_URL + "/auth/google",
	AUTH_FACEBOOK: import.meta.env.VITE_BASE_URL + "/auth/facebook",
	REGISTER: import.meta.env.VITE_BASE_URL + "/auth/register",
	LOGIN: import.meta.env.VITE_BASE_URL + "/auth/login",
	LOGOUT: import.meta.env.VITE_BASE_URL + "/auth/logout",
	ME: import.meta.env.VITE_BASE_URL + "/auth/me",
} as const;

export const client = {
	AUTH_GOOGLE: async (redirect: (route: string) => void) => {
		try {
			redirect(API.AUTH_GOOGLE);
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			}
		}
	},
	AUTH_FACEBOOK: async (redirect: (route: string) => void) => {
		try {
			redirect(API.AUTH_FACEBOOK);
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			}
		}
	},
};
