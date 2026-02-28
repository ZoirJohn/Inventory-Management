import { useEffect, useState } from "react";

import { client } from "../client";

export default function useUsers() {
	const [users, setUsers] = useState<TUser[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		setLoading(true);
		client
			.GET_USERS()
			.then(setUsers)
			.catch((error) => setError(error.message))
			.finally(() => setLoading(false));
	}, []);

	return { users, loading, error };
}
