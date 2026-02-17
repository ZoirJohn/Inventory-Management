import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { boolean, pgEnum, pgTable, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { Pool } from "pg";

const pool = new Pool({
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	host: process.env.PG_HOST,
	port: parseInt(process.env.PG_PORT!),
	database: process.env.PG_USER,
});
export const db = drizzle({ client: pool });

export const userRoleEnum = pgEnum("user_role", ["USER", "ADMIN"]);

export const users = pgTable(
	"users",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		email: varchar("email", { length: 255 }).notNull().unique(),
		name: varchar("name", { length: 255 }),
		image: varchar("image", { length: 500 }),

		googleId: varchar("google_id", { length: 255 }).unique(),
		facebookId: varchar("facebook_id", { length: 255 }).unique(),

		role: userRoleEnum("role").default("USER").notNull(),
		blocked: boolean("blocked").default(false).notNull(),

		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(table) => ({
		emailIdx: uniqueIndex("email_idx").on(table.email),
		googleIdIdx: uniqueIndex("google_id_idx").on(table.googleId),
		facebookIdIdx: uniqueIndex("facebook_id_idx").on(table.facebookId),
	}),
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
