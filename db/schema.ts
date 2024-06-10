import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  json,
} from "drizzle-orm/pg-core"

export const crosswords = pgTable("crosswords", {
  id: serial("id").primaryKey(),
  theme: text("theme").notNull().unique(),
  size: integer("size").notNull(),
  data: json("data").notNull(),
})

export type InsertCrossword = typeof crosswords.$inferInsert
export type SelectCrossword = typeof crosswords.$inferSelect
