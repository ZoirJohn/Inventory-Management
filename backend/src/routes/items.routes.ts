import express from "express";
import { db } from "../config/database.ts";
import { items, inventories, users } from "../config/schema.ts";
import { eq, and, desc } from "drizzle-orm";
import { isAuthenticated } from "../middleware/auth.middleware.ts";
import { canEditItems } from "../middleware/inventory.middleware.ts";
import { generateCustomId } from "../services/customId.service.ts";

const router = express.Router();

router.get("/inventories/:id/items", async (req, res) => {
	try {
		const allItems = await db
			.select({
				id: items.id,
				customId: items.customId,
				customString1: items.customString1,
				customString2: items.customString2,
				customString3: items.customString3,
				customText1: items.customText1,
				customText2: items.customText2,
				customText3: items.customText3,
				customInt1: items.customInt1,
				customInt2: items.customInt2,
				customInt3: items.customInt3,
				customLink1: items.customLink1,
				customLink2: items.customLink2,
				customLink3: items.customLink3,
				customBool1: items.customBool1,
				customBool2: items.customBool2,
				customBool3: items.customBool3,
				version: items.version,
				creatorId: items.creatorId,
				creatorName: users.name,
				createdAt: items.createdAt,
			})
			.from(items)
			.leftJoin(users, eq(items.creatorId, users.id))
			.where(eq(items.inventoryId, req.params.id as string))
			.orderBy(desc(items.createdAt));

		res.json(allItems);
	} catch (error) {
		res.status(500).json({ message: "Error fetching items" });
	}
});

router.post("/inventories/:id/items", isAuthenticated, canEditItems, async (req, res) => {
	try {
		const inventory = req.inventory!;
		const itemData = req.body;

		const { customId, sequenceValue } = await generateCustomId(inventory.id);

		const [existing] = await db
			.select()
			.from(items)
			.where(and(eq(items.inventoryId, inventory.id), eq(items.customId, customId)));

		if (existing) {
			return res.status(400).json({
				message: "Generated ID collision. Please try again.",
			});
		}

		Object.keys(itemData).forEach((key) => {
			if (itemData[key] === "") {
				itemData[key] = null;
			}

			if (key.startsWith("customInt") && typeof itemData[key] === "string") {
				itemData[key] = itemData[key] ? parseInt(itemData[key]) : null;
			}

			if (key.startsWith("customBool")) {
				if (itemData[key] === "Yes" || itemData[key] === "true" || itemData[key] === true) {
					itemData[key] = true;
				} else if (itemData[key] === "No" || itemData[key] === "false" || itemData[key] === false) {
					itemData[key] = false;
				} else {
					itemData[key] = null;
				}
			}
		});

		const [newItem] = await db
			.insert(items)
			.values({
				inventoryId: inventory.id,
				customId,
				sequenceValue,
				creatorId: req.user!.id,
				customString1: itemData.customString1,
				customString2: itemData.customString2,
				customString3: itemData.customString3,
				customText1: itemData.customText1,
				customText2: itemData.customText2,
				customText3: itemData.customText3,
				customInt1: itemData.customInt1,
				customInt2: itemData.customInt2,
				customInt3: itemData.customInt3,
				customLink1: itemData.customLink1,
				customLink2: itemData.customLink2,
				customLink3: itemData.customLink3,
				customBool1: itemData.customBool1,
				customBool2: itemData.customBool2,
				customBool3: itemData.customBool3,
			})
			.returning();

		res.status(201).json(newItem);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error creating item" });
	}
});

router.delete("/items/:id", isAuthenticated, async (req, res) => {
	try {
		const [item] = await db
			.select()
			.from(items)
			.where(eq(items.id, req.params.id as string));

		if (!item) {
			return res.status(404).json({ message: "Item not found" });
		}

		const user = req.user!;

		const [inventory] = await db.select().from(inventories).where(eq(inventories.id, item.inventoryId));

		const canDelete = user.role === "ADMIN" || item.creatorId === user.id || inventory?.creatorId === user.id;

		if (!canDelete) {
			return res.status(403).json({ message: "You can only delete your own items" });
		}

		await db.delete(items).where(eq(items.id, req.params.id as string));

		res.json({ message: "Item deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error deleting item" });
	}
});

export default router;
