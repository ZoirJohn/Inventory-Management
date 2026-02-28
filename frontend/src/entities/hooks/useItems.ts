import { useEffect, useState } from "react";

import { client } from "../client";

export default function useItems(inventoryId: string) {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState<boolean>();
	const [error, setError] = useState<string>("");

	useEffect(() => {
		setLoading(true);
		client
			.GET_ITEMS(inventoryId)
			.then(setItems)
			.catch((error) => setError(error.message))
			.finally(() => setLoading(false));
	}, [items]);

	return { items, loading, error, clear: () => setItems([]) };
}
