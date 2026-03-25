import "./types/index.ts";
import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport.ts";
import authRoutes from "./routes/auth.routes.ts";
import inventoryRoutes from "./routes/inventory.routes.ts";
import itemsRoutes from "./routes/items.routes.ts";
import usersRoutes from "./routes/users.routes.ts";
import idFormatRoutes from "./routes/idFormat.routes.ts";
import salesforceRoutes from "./routes/salesforce.routes.ts";

const app = express();
const PORT = process.env.PORT;

app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	}),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: process.env.SESSION_SECRET!,
		resave: false,
		saveUninitialized: false,
		proxy:true,
		cookie: {
			httpOnly: true,
			secure: true,
			sameSite: "none",
			maxAge: 24 * 60 * 60 * 1000,
		},
	}),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/inventories", inventoryRoutes);
app.use("/api", itemsRoutes);
app.use("/api", idFormatRoutes);
app.use("/api/salesforce", salesforceRoutes);

app.get("/health", (req, res) => {
	res.json({ status: "ok", message: "Server is running" });
});

app.listen(PORT);
