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

function formatDate(format?: string | null): string {
	const now = new Date();

	if (!format || format === "YYYY") {
		return now.getFullYear().toString();
	}

	if (format === "YYYY-MM") {
		const month = String(now.getMonth() + 1).padStart(2, "0");
		return `${now.getFullYear()}-${month}`;
	}

	if (format === "YYYY-MM-DD") {
		const month = String(now.getMonth() + 1).padStart(2, "0");
		const day = String(now.getDate()).padStart(2, "0");
		return `${now.getFullYear()}-${month}-${day}`;
	}

	return now.toISOString();
}

async function getNextSequence(inventoryId: string): Promise<number> {
	const [lastItem] = await db.select({ seq: items.sequenceValue }).from(items).where(eq(items.inventoryId, inventoryId)).orderBy(desc(items.sequenceValue)).limit(1);

	return (lastItem?.seq || 0) + 1;
}

export async function generateCustomId(inventoryId: string): Promise<{ customId: string; sequenceValue?: number }> {
	// Get ID format elements for this inventory
	const elements = await db.select().from(idFormatElements).where(eq(idFormatElements.inventoryId, inventoryId)).orderBy(asc(idFormatElements.order));

	// If no format configured, use default
	if (elements.length === 0) {
		const seq = await getNextSequence(inventoryId);
		return {
			customId: `ITEM-${String(seq).padStart(4, "0")}`,
			sequenceValue: seq,
		};
	}

	let customId = "";
	let sequenceValue: number | undefined;

	for (const element of elements) {
		switch (element.type) {
			case "fixed":
				customId += element.value || "";
				break;

			case "date":
				customId += formatDate(element.value);
				break;

			case "sequence":
				const seq = await getNextSequence(inventoryId);
				const padding = parseInt(element.value || "1");
				customId += String(seq).padStart(padding, "0");
				sequenceValue = seq;
				break;

			case "6-digit":
				customId += random6Digit();
				break;

			case "9-digit":
				customId += random9Digit();
				break;

			case "20-bit":
				customId += random20Bit();
				break;

			case "32-bit":
				customId += random32Bit();
				break;

			case "guid":
				customId += randomGUID();
				break;
		}
	}

	return { customId, sequenceValue };
}
