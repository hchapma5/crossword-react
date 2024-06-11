import { CrosswordTable } from "./schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { CrosswordData } from "@/types/types";

export async function insertCrosswordData(
  theme: string,
  size: number,
  data: { [key: string]: string },
) {
  const response = await db
    .insert(CrosswordTable)
    .values({ theme, size, data })
    .returning({ id: CrosswordTable.id });
  return response[0].id;
}

export async function getCrosswordDataById(id: string) {
  const crosswordData = await db
    .select({ data: CrosswordTable.data })
    .from(CrosswordTable)
    .where(eq(CrosswordTable.id, id));
  const { data } = crosswordData[0];
  return data as CrosswordData;
}

export async function getCrosswordByTheme(theme: string) {
  const crosswordData = await db
    .select({ id: CrosswordTable.id })
    .from(CrosswordTable)
    .where(eq(CrosswordTable.theme, theme));
  return crosswordData[0].id;
}
