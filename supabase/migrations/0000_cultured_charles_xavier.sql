CREATE TABLE IF NOT EXISTS "crosswords" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"theme" text NOT NULL,
	"data" jsonb NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "crosswords_theme_unique" UNIQUE("theme")
);
