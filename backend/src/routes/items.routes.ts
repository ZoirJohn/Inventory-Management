import express from "express";
import { db } from "../config/database.ts";
import { items, inventories, users } from "../config/schema.ts";
import { eq, and, desc } from "drizzle-orm";
import { isAuthenticated } from "../middleware/auth.middleware.ts";
import { canEditItems } from "../middleware/inventory.middleware.ts";

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
				creatorId: items.creatorId,
				creatorName: users.name,
				createdAt: items.createdAt,
			})
			.from(items)
			.leftJoin(users, eq(items.creatorId, users.id))
			.where(eq(items.inventoryId, req.params.id))
			.orderBy(desc(items.createdAt));

		res.json(allItems);
	} catch (error) {
		res.status(500).json({ message: "Error fetching items" });
	}
});

router.get("/items/:id", async (req, res) => {
	try {
		const [item] = await db.select().from(items).where(eq(items.id, req.params.id));

		if (!item) {
			return res.status(404).json({ message: "Item not found" });
		}

		res.json(item);
	} catch (error) {
		res.status(500).json({ message: "Error fetching item" });
	}
});

router.post("/inventories/:id/items", isAuthenticated, canEditItems, async (req, res) => {
	try {
		const inventory = req.inventory!;
		const itemData = req.body;

		let customId = itemData.customId;

		if (!customId) {
			const [lastItem] = await db.select({ seq: items.sequenceValue }).from(items).where(eq(items.inventoryId, inventory.id)).orderBy(desc(items.sequenceValue)).limit(1);

			const nextSeq = (lastItem?.seq || 0) + 1;
			customId = `${inventory.customIdPrefix}${String(nextSeq).padStart(4, "0")}`;
			itemData.sequenceValue = nextSeq;
		}

		const [existing] = await db
			.select()
			.from(items)
			.where(and(eq(items.inventoryId, inventory.id), eq(items.customId, customId)));

		if (existing) {
			return res.status(400).json({ message: "Custom ID already exists in this inventory" });
		}

		const [newItem] = await db
			.insert(items)
			.values({
				inventoryId: inventory.id,
				customId,
				creatorId: req.user!.id,
				...itemData,
			})
			.returning();

		res.status(201).json(newItem);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error creating item" });
	}
});

router.patch("/items/:id", isAuthenticated, async (req, res) => {
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

		const canEdit = user.role === "ADMIN" || item.creatorId === user.id || inventory?.creatorId === user.id;

		if (!canEdit) {
			return res.status(403).json({ message: "You can only edit your own items" });
		}

		const updates = req.body;
		if (updates.version !== undefined && updates.version !== item.version) {
			return res.status(409).json({ message: "Item was modified. Please refresh." });
		}

		const [updated] = await db
			.update(items)
			.set({
				...updates,
				version: item.version + 1,
				updatedAt: new Date(),
			})
			.where(eq(items.id, req.params.id as string))
			.returning();

		res.json(updated);
	} catch (error) {
		res.status(500).json({ message: "Error updating item" });
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
