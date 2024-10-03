import { Crosswords } from "./schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { CrosswordThemeData } from "@/types/types";

export async function insertCrosswordData(
  theme: string,
  data: CrosswordThemeData,
  username: string,
) {
  const response = await db
    .insert(Crosswords)
    .values({ theme, data, createdBy: username })
    .returning({ id: Crosswords.id });
  return response[0].id as string;
}

export async function getCrosswordDataById(
  id: string,
): Promise<[string, CrosswordThemeData]> {
  const [crosswordData] = await db
    .select({ theme: Crosswords.theme, data: Crosswords.data })
    .from(Crosswords)
    .where(eq(Crosswords.id, id));
  return [
    crosswordData.theme as string,
    crosswordData.data as CrosswordThemeData,
  ];
}

export async function getCrosswordIdByTheme(theme: string) {
  const crosswordData = await db
    .select({ id: Crosswords.id })
    .from(Crosswords)
    .where(eq(Crosswords.theme, theme));
  if (crosswordData.length === 0) return null;
  return crosswordData[0].id;
}

export async function getAllCrosswords() {
  const crosswordData = await db
    .select({
      id: Crosswords.id,
      theme: Crosswords.theme,
      username: Crosswords.createdBy,
      createdAt: Crosswords.createdAt,
    })
    .from(Crosswords);
  return crosswordData;
}
