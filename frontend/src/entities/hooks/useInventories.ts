import { useEffect, useState } from "react";

import { client } from "../client";

export default function useInventories() {
	const [inventories, setInventories] = useState([]);
	const [loading, setLoading] = useState<boolean>();
	const [error, setError] = useState<string>("");

	const fetchInventories = async () => {
		setLoading(true);
		client
			.GET_INVENTORIES()
			.then(setInventories)
			.catch((error) => {
				setError(error.message);
				setInventories([]);
			})
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		fetchInventories();
	}, []);

	return { inventories, loading, error };
}
