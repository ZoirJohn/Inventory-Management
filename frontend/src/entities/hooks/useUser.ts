import { useEffect, useState } from "react";

import { client } from "../client";

export default function useUser() {
	const [user, setUser] = useState<TUser | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>("");

	const fetchUser = () => {
		setLoading(true);
		client
			.GET_ME()
			.then(setUser)
			.catch((error) => {
				setError(error.message);
				setUser(null);
			})
			.finally(() => setLoading(false));
	};
	useEffect(() => {
		fetchUser();
	}, []);

	return { user, loading, error, refetch: fetchUser };
}
