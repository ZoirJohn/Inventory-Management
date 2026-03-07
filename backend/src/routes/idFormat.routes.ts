import express from "express";
import { db } from "../config/database.ts";
import { idFormatElements } from "../config/schema.ts";
import { eq, asc } from "drizzle-orm";
import { isAuthenticated } from "../middleware/auth.middleware.ts";
import { canEditInventory } from "../middleware/inventory.middleware.ts";

const router = express.Router();

router.get("/inventories/:id/id-format", async (req, res) => {
	try {
		const elements = await db
			.select()
			.from(idFormatElements)
			.where(eq(idFormatElements.inventoryId, req.params.id as string))
			.orderBy(asc(idFormatElements.order));

		res.json(elements);
	} catch (error) {
		res.status(500).json({ message: "Error fetching ID format" });
	}
});

router.put("/inventories/:id/id-format", isAuthenticated, canEditInventory, async (req, res) => {
	try {
		const inventoryId = req.params.id as string;
		const { idFormat } = req.body;

		if (!Array.isArray(idFormat)) {
			return res.status(400).json({ message: "idFormat must be an array" });
		}

		await db.delete(idFormatElements).where(eq(idFormatElements.inventoryId, inventoryId));

		if (idFormat.length > 0) {
			const formatElements = idFormat.map((element: any, index: number) => ({
				inventoryId,
				order: element.order ?? index + 1,
				type: element.type,
				value: element.value || null,
			}));

			await db.insert(idFormatElements).values(formatElements);
		}

		const newFormat = await db.select().from(idFormatElements).where(eq(idFormatElements.inventoryId, inventoryId)).orderBy(asc(idFormatElements.order));

		res.json(newFormat);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error updating ID format" });
	}
});

export default router;
