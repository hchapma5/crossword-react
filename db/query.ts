import { Crosswords, Ratings } from "./schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { Answers, CrosswordThemeData } from "@/types/types";

export async function insertCrosswordData(crossword: {
  theme: string;
  data: CrosswordThemeData;
  createdBy: string;
  answers: Answers;
}) {
  const response = await db
    .insert(Crosswords)
    .values({
      theme: crossword.theme,
      data: crossword.data,
      createdBy: crossword.createdBy,
      answers: crossword.answers,
    })
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
      rating: Crosswords.averageRating,
    })
    .from(Crosswords);
  return crosswordData;
}

export async function getCrosswordAnswersById(id: string) {
  const crosswordData = await db
    .select({ answers: Crosswords.answers })
    .from(Crosswords)
    .where(eq(Crosswords.id, id));
  return crosswordData[0].answers as Answers;
}

export async function addRating(
  crosswordId: string,
  userId: string,
  rating: number,
) {
  // Insert the new rating
  await db.insert(Ratings).values({
    crosswordId,
    rating,
    userId,
  });

  // Fetch the current crossword details
  const crossword = await db
    .select({
      ratingsCount: Crosswords.ratingsCount,
      totalRating: Crosswords.totalRating,
    })
    .from(Crosswords)
    .where(eq(Crosswords.id, crosswordId));

  if (!crossword) {
    throw new Error("Crossword not found");
  }

  // Update ratings count, total rating, and average rating
  const newRatingsCount = crossword[0].ratingsCount + 1;
  const newTotalRating = crossword[0].totalRating + rating;
  const newAverageRating = newTotalRating / newRatingsCount;

  await db
    .update(Crosswords)
    .set({
      ratingsCount: newRatingsCount,
      totalRating: newTotalRating,
      averageRating: newAverageRating,
    })
    .where(eq(Crosswords.id, crosswordId));
}
