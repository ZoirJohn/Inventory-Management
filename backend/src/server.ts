import "./types/index.ts";
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport.ts";
import authRoutes from "./routes/auth.routes.ts";

const app = express();
const PORT = process.env.PORT;

app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:5173",
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
		cookie: {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 24 * 60 * 60 * 1000,
		},
	}),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);

app.get("/health", (req, res) => {
	res.json({ status: "ok", message: "Server is running" });
});

app.listen(PORT, () => {
	console.log('Server running');
});
