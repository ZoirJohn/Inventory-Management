CREATE TYPE "public"."user_role" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TABLE "id_format_elements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"inventory_id" uuid NOT NULL,
	"order" integer NOT NULL,
	"type" varchar(50) NOT NULL,
	"value" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inventories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"is_public" boolean DEFAULT true NOT NULL,
	"custom_id_prefix" varchar(50) DEFAULT '',
	"version" integer DEFAULT 0 NOT NULL,
	"creator_id" uuid NOT NULL,
	"custom_string1_state" boolean DEFAULT false NOT NULL,
	"custom_string1_name" varchar(255),
	"custom_string2_state" boolean DEFAULT false NOT NULL,
	"custom_string2_name" varchar(255),
	"custom_string3_state" boolean DEFAULT false NOT NULL,
	"custom_string3_name" varchar(255),
	"custom_text1_state" boolean DEFAULT false NOT NULL,
	"custom_text1_name" varchar(255),
	"custom_text2_state" boolean DEFAULT false NOT NULL,
	"custom_text2_name" varchar(255),
	"custom_text3_state" boolean DEFAULT false NOT NULL,
	"custom_text3_name" varchar(255),
	"custom_int1_state" boolean DEFAULT false NOT NULL,
	"custom_int1_name" varchar(255),
	"custom_int2_state" boolean DEFAULT false NOT NULL,
	"custom_int2_name" varchar(255),
	"custom_int3_state" boolean DEFAULT false NOT NULL,
	"custom_int3_name" varchar(255),
	"custom_link1_state" boolean DEFAULT false NOT NULL,
	"custom_link1_name" varchar(255),
	"custom_link2_state" boolean DEFAULT false NOT NULL,
	"custom_link2_name" varchar(255),
	"custom_link3_state" boolean DEFAULT false NOT NULL,
	"custom_link3_name" varchar(255),
	"custom_bool1_state" boolean DEFAULT false NOT NULL,
	"custom_bool1_name" varchar(255),
	"custom_bool2_state" boolean DEFAULT false NOT NULL,
	"custom_bool2_name" varchar(255),
	"custom_bool3_state" boolean DEFAULT false NOT NULL,
	"custom_bool3_name" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"inventory_id" uuid NOT NULL,
	"custom_id" varchar(255),
	"custom_string1" varchar(500),
	"custom_string2" varchar(500),
	"custom_string3" varchar(500),
	"custom_text1" text,
	"custom_text2" text,
	"custom_text3" text,
	"custom_int1" integer,
	"custom_int2" integer,
	"custom_int3" integer,
	"custom_link1" varchar(1000),
	"custom_link2" varchar(1000),
	"custom_link3" varchar(1000),
	"custom_bool1" boolean,
	"custom_bool2" boolean,
	"custom_bool3" boolean,
	"sequence_value" integer,
	"version" integer DEFAULT 0 NOT NULL,
	"creator_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255),
	"google_id" varchar(255),
	"facebook_id" varchar(255),
	"password" varchar(255),
	"role" "user_role" DEFAULT 'USER' NOT NULL,
	"blocked" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_google_id_unique" UNIQUE("google_id"),
	CONSTRAINT "users_facebook_id_unique" UNIQUE("facebook_id")
);
--> statement-breakpoint
ALTER TABLE "id_format_elements" ADD CONSTRAINT "id_format_elements_inventory_id_inventories_id_fk" FOREIGN KEY ("inventory_id") REFERENCES "public"."inventories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_inventory_id_inventories_id_fk" FOREIGN KEY ("inventory_id") REFERENCES "public"."inventories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "id_element_inventory_idx" ON "id_format_elements" USING btree ("inventory_id","order");--> statement-breakpoint
CREATE INDEX "inventory_creator_idx" ON "inventories" USING btree ("creator_id");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_inventory_custom_id" ON "items" USING btree ("inventory_id","custom_id");--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "google_id_idx" ON "users" USING btree ("google_id");--> statement-breakpoint
CREATE UNIQUE INDEX "facebook_id_idx" ON "users" USING btree ("facebook_id");