import { useEffect, useState } from "react";

import { client } from "../client";

export default function useCustomID(inventoryId: string) {
	const [customId, setCustomId] = useState([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	function fetchCustomID(inventoryId: string) {
		setLoading(true);
		client
			.GET_CUSTOM_ID(inventoryId)
			.then(setCustomId)
			.catch((error) => {
				setError(error.message);
				setCustomId([]);
			})
			.finally(() => setLoading(false));
	}
	useEffect(() => {
		fetchCustomID(inventoryId);
	}, []);

	return { customId, loading, error, refetch: fetchCustomID };
}
