import { client } from "../client";

export async function createInventory(body: any) {
	const res = await client.CREATE_INVENTORY(body);
	return res;
}
