import { pgTable, text, jsonb, uuid, timestamp } from "drizzle-orm/pg-core";

export const Crosswords = pgTable("crosswords", {
  id: uuid("id").primaryKey().defaultRandom(),
  theme: text("theme").notNull().unique(),
  data: jsonb("data").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type InsertCrossword = typeof Crosswords.$inferInsert;
export type SelectCrossword = typeof Crosswords.$inferSelect;
