import type { Request, Response, NextFunction } from "express";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	if (req.isAuthenticated()) return next();
	res.status(401).json({ message: "Unauthorized. Please log in" });
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
	if (req.isAuthenticated() && req.user.role === "ADMIN") return next();
	res.status(401).json({ message: "Forbidden. Admins only." });
};

export const isNotBlocked = (req: Request, res: Response, next: NextFunction) => {
	if (req.isAuthenticated() && !req.user.blocked) return next();
	res.status(403).json({ message: "Forbidden. Your account is blocked." });
}