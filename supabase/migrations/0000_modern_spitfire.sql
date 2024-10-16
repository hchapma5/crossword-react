CREATE TABLE IF NOT EXISTS "crosswords" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"theme" text NOT NULL,
	"data" jsonb NOT NULL,
	"answers" jsonb NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"username" text NOT NULL,
	"ratingsCount" integer DEFAULT 0 NOT NULL,
	"solvedCount" integer DEFAULT 0 NOT NULL,
	"averageRating" real DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ratings" (
	"crosswordId" uuid NOT NULL,
	"userId" text NOT NULL,
	"rating" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ratings_crosswordId_userId_pk" PRIMARY KEY("crosswordId","userId")
);
