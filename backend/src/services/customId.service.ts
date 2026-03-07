import { db } from "../config/database.ts";
import { items, idFormatElements } from "../config/schema.ts";
import { eq, desc, asc } from "drizzle-orm";

function random6Digit(): string {
	const num = (crypto.getRandomValues(new Uint32Array(1))[0]! % 900000) + 100000;
	return num.toString();
}

function random9Digit(): string {
	const num = (crypto.getRandomValues(new Uint32Array(1))[0]! % 900000000) + 100000000;
	return num.toString();
}

function random20Bit(): string {
	const arr = new Uint32Array(1);
	crypto.getRandomValues(arr);
	const num = arr[0]! & ((1 << 20) - 1);
	return num.toString(16).toUpperCase();
}

function random32Bit(): string {
	const arr = new Uint32Array(1);
	crypto.getRandomValues(arr);
	return arr[0]!.toString(16).toUpperCase();
}

function randomGUID(): string {
	return crypto.randomUUID();
}

function formatDate(): string {
	const now = new Date();
	return now.toISOString();
}

async function getNextSequence(inventoryId: string): Promise<number> {
	const [lastItem] = await db.select({ seq: items.sequenceValue }).from(items).where(eq(items.inventoryId, inventoryId)).orderBy(desc(items.sequenceValue)).limit(1);

	return (lastItem?.seq || 0) + 1;
}

export async function generateCustomId(inventoryId: string): Promise<{ customId: string; sequenceValue?: number }> {
	const elements = await db.select().from(idFormatElements).where(eq(idFormatElements.inventoryId, inventoryId)).orderBy(asc(idFormatElements.order));

	if (elements.length === 0) {
		return {
			customId: "",
			sequenceValue: undefined,
		};
	}

	let customId = "";
	let sequenceValue: number | undefined;
	const parts: string[] = [];

	for (const element of elements) {
		let part = "";

		switch (element.type) {
			case "fixed":
				part = element.value || "";
				break;

			case "date":
				part = formatDate();
				break;

			case "sequence":
				const seq = await getNextSequence(inventoryId);
				const padding = parseInt(element.value || "1");
				part = String(seq).padStart(padding, "0");
				sequenceValue = seq;
				break;

			case "6-digit":
				part = random6Digit();
				break;

			case "9-digit":
				part = random9Digit();
				break;

			case "20-bit":
				part = random20Bit();
				break;

			case "32-bit":
				part = random32Bit();
				break;

			case "guid":
				part = randomGUID();
				break;
		}

		if (part) {
			parts.push(part);
		}
	}

	customId = parts.join("-");

	return { customId, sequenceValue };
}
