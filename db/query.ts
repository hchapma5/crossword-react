import { Crosswords } from "./schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { CrosswordPuzzle } from "@/types/types";

export async function insertCrosswordData(
  theme: string,
  data: CrosswordPuzzle,
) {
  const response = await db
    .insert(Crosswords)
    .values({ theme, data })
    .returning({ id: Crosswords.id });
  return response[0].id;
}

export async function getCrosswordDataById(
  id: string,
): Promise<[string, CrosswordPuzzle]> {
  const [crosswordData] = await db
    .select({ theme: Crosswords.theme, data: Crosswords.data })
    .from(Crosswords)
    .where(eq(Crosswords.id, id));
  return [crosswordData.theme as string, crosswordData.data as CrosswordPuzzle];
}

export async function getCrosswordIdByTheme(theme: string) {
  const crosswordData = await db
    .select({ id: Crosswords.id })
    .from(Crosswords)
    .where(eq(Crosswords.theme, theme));
  if (crosswordData.length === 0) return null;
  return crosswordData[0].id;
}

export async function getCrosswordsByTheme(theme: string) {
  const crosswordData = await db
    .select({ id: Crosswords.id, theme: Crosswords.theme })
    .from(Crosswords)
    .where(eq(Crosswords.theme, theme));
  return crosswordData;
}

export async function getAllCrosswords() {
  const crosswordData = await db
    .select({ id: Crosswords.id, theme: Crosswords.theme })
    .from(Crosswords);
  return crosswordData;
}
