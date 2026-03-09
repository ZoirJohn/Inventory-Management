import express from "express";
import { db } from "../config/database.ts";
import { users } from "../config/schema.ts";
import { eq } from "drizzle-orm";
import { isAuthenticated, isAdmin, isNotBlocked } from "../middleware/auth.middleware.ts";

const router = express.Router();

router.get("/", isAuthenticated, isNotBlocked, isAdmin, async (req, res) => {
	try {
		const allUsers = await db
			.select({
				id: users.id,
				email: users.email,
				name: users.name,
				googleId: users.googleId,
				facebookId: users.facebookId,
				role: users.role,
				blocked: users.blocked,
				createdAt: users.createdAt,
			})
			.from(users)
			.orderBy(users.createdAt);

		res.json(allUsers);
	} catch (error) {
		res.status(500).json({ message: "Error fetching users" });
	}
});

router.patch("/:id/block", isAuthenticated, isNotBlocked, isAdmin, async (req, res) => {
	try {
		const userId = req.params.id as string;

		// if (userId === req.user!.id) {
		// 	return res.status(400).json({ message: "You cannot block yourself" });
		// }

		const [updated] = await db.update(users).set({ blocked: true }).where(eq(users.id, userId)).returning();

		if (!updated) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json({ message: "User blocked successfully", user: updated });
	} catch (error) {
		res.status(500).json({ message: "Error blocking user" });
	}
});

router.patch("/:id/unblock", isAuthenticated, isNotBlocked, isAdmin, async (req, res) => {
	try {
		const userId = req.params.id as string;

		const [updated] = await db.update(users).set({ blocked: false }).where(eq(users.id, userId)).returning();

		if (!updated) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json({ message: "User unblocked successfully", user: updated });
	} catch (error) {
		res.status(500).json({ message: "Error unblocking user" });
	}
});

router.patch("/:id/make-admin", isAuthenticated, isNotBlocked, isAdmin, async (req, res) => {
	try {
		const userId = req.params.id as string;

		const [updated] = await db.update(users).set({ role: "ADMIN" }).where(eq(users.id, userId)).returning();

		if (!updated) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json({ message: "User promoted to admin successfully", user: updated });
	} catch (error) {
		res.status(500).json({ message: "Error promoting user" });
	}
});

router.patch("/:id/remove-admin", isAuthenticated, isNotBlocked, isAdmin, async (req, res) => {
	try {
		const userId = req.params.id as string;

		// if (userId === req.user!.id) {
		// 	return res.status(400).json({ message: "You cannot demote yourself" });
		// }

		const [updated] = await db.update(users).set({ role: "USER" }).where(eq(users.id, userId)).returning();

		if (!updated) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json({ message: "Admin privileges removed successfully", user: updated });
	} catch (error) {
		res.status(500).json({ message: "Error removing admin" });
	}
});

router.delete("/:id", isAuthenticated, isNotBlocked, isAdmin, async (req, res) => {
	try {
		const userId = req.params.id as string;

		// if (userId === req.user!.id) {
		// 	return res.status(400).json({ message: "You cannot delete yourself" });
		// }

		const [deleted] = await db.delete(users).where(eq(users.id, userId)).returning();

		if (!deleted) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json({ message: "User deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error deleting user" });
	}
});

export default router;
