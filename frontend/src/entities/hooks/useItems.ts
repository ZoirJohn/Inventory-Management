import { useEffect, useState } from "react";

import { client } from "../client";

export default function useItems(inventoryId: string) {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState<boolean>();
	const [error, setError] = useState<string>("");

	function fetchItems(inventoryId: string) {
		setLoading(true);
		client
			.GET_ITEMS(inventoryId)
			.then(setItems)
			.catch((error) => {
				setError(error.message);
				setItems([]);
			})
			.finally(() => setLoading(false));
	}

	useEffect(() => {
		fetchItems(inventoryId);
	}, []);

	return { items, loading, error, refetch: fetchItems };
}
