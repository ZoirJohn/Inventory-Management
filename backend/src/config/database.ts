import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	host: process.env.PG_HOST,
	port: parseInt(process.env.PG_PORT!),
	database: process.env.PG_DATABASE,
	ssl: false,
});
export const db = drizzle({ client: pool });
