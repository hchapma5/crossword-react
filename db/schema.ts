import {
  pgTable,
  text,
  jsonb,
  real,
  integer,
  uuid,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";

export const Crosswords = pgTable("crosswords", {
  id: uuid("id").primaryKey().defaultRandom(),
  theme: text("theme").notNull(),
  data: jsonb("data").notNull(),
  answers: jsonb("answers").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  createdBy: text("username").notNull(),
  ratingsCount: integer("ratingsCount").notNull().default(0),
  totalRating: integer("solvedCount").notNull().default(0),
  averageRating: real("averageRating").notNull().default(0),
});

export const Ratings = pgTable(
  "ratings",
  {
    crosswordId: uuid("crosswordId").notNull(),
    userId: text("userId").notNull(),
    rating: integer("rating").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.crosswordId, table.userId] }),
  }),
);

export type Crossword = typeof Crosswords.$inferSelect;
export type Rating = typeof Ratings.$inferSelect;
