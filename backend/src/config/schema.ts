import { boolean, integer, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid, varchar, index } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["USER", "ADMIN"]);

export const users = pgTable(
	"users",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		email: varchar("email", { length: 255 }).notNull().unique(),
		name: varchar("name", { length: 255 }),

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

export const inventories = pgTable(
	"inventories",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		title: varchar("title", { length: 255 }).notNull(),
		description: text("description"),

		isPublic: boolean("is_public").default(true).notNull(),

		customIdPrefix: varchar("custom_id_prefix", { length: 50 }).default(""),

		version: integer("version").default(0).notNull(),

		creatorId: uuid("creator_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),

		customString1State: boolean("custom_string1_state").default(false).notNull(),
		customString1Name: varchar("custom_string1_name", { length: 255 }),

		customString2State: boolean("custom_string2_state").default(false).notNull(),
		customString2Name: varchar("custom_string2_name", { length: 255 }),

		customString3State: boolean("custom_string3_state").default(false).notNull(),
		customString3Name: varchar("custom_string3_name", { length: 255 }),

		customText1State: boolean("custom_text1_state").default(false).notNull(),
		customText1Name: varchar("custom_text1_name", { length: 255 }),

		customText2State: boolean("custom_text2_state").default(false).notNull(),
		customText2Name: varchar("custom_text2_name", { length: 255 }),

		customText3State: boolean("custom_text3_state").default(false).notNull(),
		customText3Name: varchar("custom_text3_name", { length: 255 }),

		customInt1State: boolean("custom_int1_state").default(false).notNull(),
		customInt1Name: varchar("custom_int1_name", { length: 255 }),

		customInt2State: boolean("custom_int2_state").default(false).notNull(),
		customInt2Name: varchar("custom_int2_name", { length: 255 }),

		customInt3State: boolean("custom_int3_state").default(false).notNull(),
		customInt3Name: varchar("custom_int3_name", { length: 255 }),

		customLink1State: boolean("custom_link1_state").default(false).notNull(),
		customLink1Name: varchar("custom_link1_name", { length: 255 }),

		customLink2State: boolean("custom_link2_state").default(false).notNull(),
		customLink2Name: varchar("custom_link2_name", { length: 255 }),

		customLink3State: boolean("custom_link3_state").default(false).notNull(),
		customLink3Name: varchar("custom_link3_name", { length: 255 }),

		customBool1State: boolean("custom_bool1_state").default(false).notNull(),
		customBool1Name: varchar("custom_bool1_name", { length: 255 }),

		customBool2State: boolean("custom_bool2_state").default(false).notNull(),
		customBool2Name: varchar("custom_bool2_name", { length: 255 }),

		customBool3State: boolean("custom_bool3_state").default(false).notNull(),
		customBool3Name: varchar("custom_bool3_name", { length: 255 }),

		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(table) => ({
		creatorIdx: index("inventory_creator_idx").on(table.creatorId),
	}),
);
export type TInventory = typeof inventories.$inferSelect;
export type TNewInventory = typeof inventories.$inferInsert;

export const items = pgTable(
	"items",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		inventoryId: uuid("inventory_id")
			.notNull()
			.references(() => inventories.id, { onDelete: "cascade" }),
		customId: varchar("custom_id", { length: 255 }).notNull(),

		customString1: varchar("custom_string1", { length: 500 }),
		customString2: varchar("custom_string2", { length: 500 }),
		customString3: varchar("custom_string3", { length: 500 }),

		customText1: text("custom_text1"),
		customText2: text("custom_text2"),
		customText3: text("custom_text3"),

		customInt1: integer("custom_int1"),
		customInt2: integer("custom_int2"),
		customInt3: integer("custom_int3"),

		customLink1: varchar("custom_link1", { length: 1000 }),
		customLink2: varchar("custom_link2", { length: 1000 }),
		customLink3: varchar("custom_link3", { length: 1000 }),

		customBool1: boolean("custom_bool1"),
		customBool2: boolean("custom_bool2"),
		customBool3: boolean("custom_bool3"),

		sequenceValue: integer("sequence_value"),
		version: integer("version").default(0).notNull(),

		creatorId: uuid("creator_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),

		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(table) => ({
		uniqueCustomId: uniqueIndex("unique_inventory_custom_id").on(table.inventoryId, table.customId),
	}),
);

export type TItem = typeof items.$inferSelect;
export type TNewItem = typeof items.$inferInsert;

export const idFormatElements = pgTable(
	"id_format_elements",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		inventoryId: uuid("inventory_id")
			.notNull()
			.references(() => inventories.id, { onDelete: "cascade" }),
		order: integer("order").notNull(),
		type: varchar("type", { length: 50 }).notNull(),
		value: varchar("value", { length: 100 }),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => ({
		inventoryIdx: uniqueIndex("id_element_inventory_idx").on(table.inventoryId, table.order),
	}),
);
export type IdFormatElement = typeof idFormatElements.$inferSelect;
export type NewIdFormatElement = typeof idFormatElements.$inferInsert;
