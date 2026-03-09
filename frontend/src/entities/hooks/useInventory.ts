import { useEffect, useState } from "react";

import { client } from "../client";

export default function useInventory(id: string) {
	const [inventory, setInventories] = useState<TInventory>({});
	const [loading, setLoading] = useState<boolean>();
	const [error, setError] = useState<string>("");

	useEffect(() => {
		setLoading(true);
		client
			.GET_INVENTORY(id)
			.then(setInventories)
			.catch((error) => {
				setError(error.message);
				setInventories({});
			})
			.finally(() => setLoading(false));
	}, []);

	return { inventory, loading, error };
}
