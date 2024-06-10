CREATE TABLE IF NOT EXISTS "crosswords" (
	"id" serial PRIMARY KEY NOT NULL,
	"theme" text NOT NULL,
	"size" integer NOT NULL,
	"data" json NOT NULL,
	CONSTRAINT "crosswords_theme_unique" UNIQUE("theme")
);
