import { boolean, pgEnum, pgTable, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";

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
		password: varchar("password", { length: 255 }),

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

export type TUser = typeof users.$inferSelect;
export type TNewUser = typeof users.$inferInsert;
