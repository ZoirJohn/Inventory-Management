import express from "express";
import { db } from "../config/database.ts";
import { inventories, users } from "../config/schema.ts";
import { eq, desc } from "drizzle-orm";
import { isAuthenticated } from "../middleware/auth.middleware.ts";
import { canEditInventory } from "../middleware/inventory.middleware.ts";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const allInventories = await db
			.select({
				id: inventories.id,
				title: inventories.title,
				description: inventories.description,
				isPublic: inventories.isPublic,
				creatorId: inventories.creatorId,
				creatorName: users.name,
				creatorEmail: users.email,
				createdAt: inventories.createdAt,
			})
			.from(inventories)
			.leftJoin(users, eq(inventories.creatorId, users.id))
			.orderBy(desc(inventories.createdAt));

		res.json(allInventories);
	} catch (error) {
		res.status(500).json({ message: "Error fetching inventories" });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const [inventory] = await db.select().from(inventories).where(eq(inventories.id, req.params.id));

		if (!inventory) {
			return res.status(404).json({ message: "Inventory not found" });
		}

		const [creator] = await db
			.select({
				id: users.id,
				name: users.name,
				email: users.email,
			})
			.from(users)
			.where(eq(users.id, inventory.creatorId));

		res.json({
			...inventory,
			creator,
		});
	} catch (error) {
		res.status(500).json({ message: "Error fetching inventory" });
	}
});

router.post("/", isAuthenticated, async (req, res) => {
	try {
		const { title, description, isPublic, customIdPrefix, customString1Name, customString2Name, customString3Name, customText1Name, customText2Name, customText3Name, customInt1Name, customInt2Name, customInt3Name, customLink1Name, customLink2Name, customLink3Name, customBool1Name, customBool2Name, customBool3Name } = req.body;
		if (!title) {
			return res.status(400).json({ message: "Title is required" });
		}

		const [newInventory] = await db
			.insert(inventories)
			.values({
				title,
				description,
				isPublic: isPublic || false,
				customIdPrefix: customIdPrefix || "",
				creatorId: req.user!.id,
				customString1State: !!customString1Name,
				customString1Name,
				customString2State: !!customString2Name,
				customString2Name,
				customString3State: !!customString3Name,
				customString3Name,
				customText1State: !!customText1Name,
				customText1Name,
				customText2State: !!customText2Name,
				customText2Name,
				customText3State: !!customText3Name,
				customText3Name,
				customInt1State: !!customInt1Name,
				customInt1Name,
				customInt2State: !!customInt2Name,
				customInt2Name,
				customInt3State: !!customInt3Name,
				customInt3Name,
				customLink1State: !!customLink1Name,
				customLink1Name,
				customLink2State: !!customLink2Name,
				customLink2Name,
				customLink3State: !!customLink3Name,
				customLink3Name,
				customBool1State: !!customBool1Name,
				customBool1Name,
				customBool2State: !!customBool2Name,
				customBool2Name,
				customBool3State: !!customBool3Name,
				customBool3Name,
			})
			.returning();

		res.status(201).json(newInventory);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error creating inventory" });
	}
});

router.delete("/:id", isAuthenticated, canEditInventory, async (req, res) => {
	try {
		await db.delete(inventories).where(eq(inventories.id, req.params.id as string));
		res.json({ message: "Inventory deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error deleting inventory" });
	}
});

export default router;
