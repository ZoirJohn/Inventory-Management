import { client } from "../client";

export async function createInventory(body: unknown) {
  const res = await client.CREATE_INVENTORY(body);

  return res;
}
