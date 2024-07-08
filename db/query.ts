import { Crosswords } from "./schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { CrosswordData } from "@/types/types";

export async function insertCrosswordData(theme: string, data: CrosswordData) {
  const response = await db
    .insert(Crosswords)
    .values({ theme, data })
    .returning({ id: Crosswords.id });
  return response[0].id;
}

export async function getCrosswordDataById(id: string) {
  const [crosswordData] = await db
    .select({ theme: Crosswords.theme, data: Crosswords.data })
    .from(Crosswords)
    .where(eq(Crosswords.id, id));
  return [crosswordData.theme, crosswordData.data];
}

export async function getCrosswordByTheme(theme: string) {
  const crosswordData = await db
    .select({ id: Crosswords.id })
    .from(Crosswords)
    .where(eq(Crosswords.theme, theme));
  if (crosswordData.length === 0) return null;
  return crosswordData[0].id;
}
