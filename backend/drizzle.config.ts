import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./drizzle",
	dialect: "postgresql",
	schema: "./src/config/schema.ts",
	dbCredentials: {
		user: process.env.PG_USER,
		password: process.env.PG_PASSWORD,
		host: process.env.PG_HOST,
		port: parseInt(process.env.PG_PORT!),
		database: process.env.PG_DATABASE,
		ssl: false,
		url: "",
	},
});
