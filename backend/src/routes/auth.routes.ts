import express from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import { db } from "../config/database.ts";
import { users } from "../config/schema.ts";
import { eq } from "drizzle-orm";
import { isAuthenticated } from "../middleware/auth.middleware.ts";

const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		const { email, password, name } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: "Email and password are required" });
		}
		if (password.length < 6) {
			return res.json(400).json({ message: "Password must be at least 6 characters" });
		}

		const [existing] = await db.select().from(users).where(eq(users.email, email));
		if (existing) {
			return res.status(400).json({ message: "Email already registered" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const [newUser] = await db.insert(users).values({ email, name, password: hashedPassword }).returning();

		req.logIn(newUser, (err) => {
			if (err) return res.status(500).json({ message: "Auto login failed" });
			const { password, ...safeUser } = newUser;
			res.status(201).json(safeUser);
		});
	} catch (error) {
		res.status(500).json({ message: "Registration failed" });
	}
});

router.post("/login", (req, res, next) => {
	passport.authenticate("local", (err: any, user: any, info: any) => {
		if (err) return res.status(500).json({ message: "Login error" });

		if (!user) {
			return res.status(401).json({ message: info?.message || "Login failed" });
		}

		req.login(user, (err) => {
			if (err) return res.status(500).json({ message: "Login failed" });

			const { password: _, ...safeUser } = user;
			res.json(safeUser);
		});
	})(req, res, next);
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_failed`,
	}),
	(req, res) => {
		res.redirect(process.env.FRONTEND_URL!);
	},
);

router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

router.get(
	"/facebook/callback",
	passport.authenticate("facebook", {
		failureRedirect: `${process.env.FRONTEND_URL}/login?error=facebook_failed`,
	}),
	(req, res) => {
		res.redirect(process.env.FRONTEND_URL!);
	},
);

router.get("/me", isAuthenticated, (req, res) => {
	const { password: _, ...safeUser } = req.user as any;
	res.json(safeUser);
});

router.post("/logout", isAuthenticated, (req, res) => {
	req.logout((err) => {
		if (err) return res.status(500).json({ message: "Logout failed" });
		res.json({ message: "Logged out successfully" });
	});
});

export default router;
