CREATE TYPE "public"."program" AS ENUM('VBS', 'SYO');--> statement-breakpoint
ALTER TABLE "children" ADD COLUMN "program" "program" DEFAULT 'VBS' NOT NULL;