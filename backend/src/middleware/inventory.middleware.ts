import { Request, Response, NextFunction } from "express";
import { db } from "../config/database.ts";
import { inventories } from "../config/schema.ts";
import { eq } from "drizzle-orm";

export const canEditItems = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const inventoryId = req.params.id || req.params.inventoryId;

		const [inventory] = await db
			.select()
			.from(inventories)
			.where(eq(inventories.id, inventoryId as string));

		if (!inventory) {
			return res.status(404).json({ message: "Inventory not found" });
		}

		const user = req.user;

		if (!user) {
			return res.status(401).json({ message: "Login required to add items" });
		}

		if (user.blocked) {
			return res.status(403).json({ message: "Your account is blocked" });
		}

		if (user.role === "ADMIN") {
			req.inventory = inventory;
			return next();
		}

		if (inventory.creatorId === user.id) {
			req.inventory = inventory;
			return next();
		}

		if (inventory.isPublic) {
			req.inventory = inventory;
			return next();
		}

		return res.status(403).json({ message: "No access to this inventory" });
	} catch (error) {
		res.status(500).json({ message: "Error checking permissions" });
	}
};

export const canEditInventory = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const inventoryId = req.params.id;

		const [inventory] = await db
			.select()
			.from(inventories)
			.where(eq(inventories.id, inventoryId as string));

		if (!inventory) {
			return res.status(404).json({ message: "Inventory not found" });
		}

		const user = req.user;

		if (!user) {
			return res.status(401).json({ message: "Login required" });
		}

		if (user.blocked) {
			return res.status(403).json({ message: "Your account is blocked" });
		}

		if (user.role === "ADMIN" || inventory.creatorId === user.id) {
			req.inventory = inventory;
			return next();
		}

		return res.status(403).json({ message: "Only creator can edit inventory settings" });
	} catch (error) {
		res.status(500).json({ message: "Error checking permissions" });
	}
};
