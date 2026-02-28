import express from "express";
import { db } from "../config/database";
import { users } from "../config/schema";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const allUsers = await db.select().from(users);
		res.json(allUsers);
	} catch (error) {
		res.status(500).json({ message: "Error fetching items" });
	}
});

export default router;
