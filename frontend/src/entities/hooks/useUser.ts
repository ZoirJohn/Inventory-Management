import { useEffect, useState } from "react";
import { client } from "../client";

export default function useUser() {
	const [user, setUser] = useState<any>({});
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	useEffect(() => {
		setLoading(true);
		client
			.GET_ME()
			.then((data) => setUser(data))
			.catch((error) => setError(error.message))
			.finally(() => setLoading(false));
	}, []);

	return { user, loading, error };
}
