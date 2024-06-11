import {
  pgTable,
  text,
  integer,
  jsonb,
  uuid,
  timestamp,
} from "drizzle-orm/pg-core"

export const CrosswordTable = pgTable("crosswords", {
  id: uuid("id").primaryKey().defaultRandom(),
  theme: text("theme").notNull().unique(),
  size: integer("size").notNull(),
  data: jsonb("data").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

export type InsertCrossword = typeof CrosswordTable.$inferInsert
export type SelectCrossword = typeof CrosswordTable.$inferSelect
