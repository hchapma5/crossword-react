// "use server";

import { Crossword, Rating, Crosswords, Ratings } from "./schema";
import { db } from "./db";
import { and, eq, desc, sql, ilike } from "drizzle-orm";
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

export async function getCrosswordsBySearchQuery(
  page: number = 1,
  search: string = "",
) {
  const pageSize = 30;
  const offset = (page - 1) * pageSize;

  const condition =
    ilike(Crosswords.theme, `%${search}%`) ||
    ilike(Crosswords.createdBy, `%${search}%`);

  const crosswords = await db.query.Crosswords.findMany({
    where: condition,
    limit: pageSize,
    offset: offset,
    orderBy: desc(Crosswords.createdAt),
  });

  const totalCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(Crosswords)
    .where(condition);

  return {
    crosswords,
    totalPages: Math.ceil(totalCount[0].count / pageSize),
    currentPage: page,
  };
}

export async function getCrosswordAnswersById(id: string) {
  const crosswordData = await db
    .select({ answers: Crosswords.answers })
    .from(Crosswords)
    .where(eq(Crosswords.id, id));
  return crosswordData[0].answers as Answers;
}

export async function insertCrosswordRating(
  crosswordId: string,
  rating: number,
  userId: string,
) {
  await db.insert(Ratings).values({
    crosswordId,
    rating,
    userId: userId!,
  });
}

export async function updateCrosswordRating(
  crosswordId: string,
  averageRating: number,
  ratingsCount: number,
  totalRating: number,
) {
  await db
    .update(Crosswords)
    .set({
      averageRating,
      ratingsCount,
      totalRating,
    })
    .where(eq(Crosswords.id, crosswordId));
}

export async function getCrosswordRating(crosswordId: string) {
  const crossword = await db
    .select({
      ratingsCount: Crosswords.ratingsCount,
      totalRating: Crosswords.totalRating,
    })
    .from(Crosswords)
    .where(eq(Crosswords.id, crosswordId));
  return crossword[0];
}

export async function getUserCrosswordRating(
  crosswordId: string,
  userId: string,
) {
  const rating = await db
    .select({ rating: Ratings.rating })
    .from(Ratings)
    .where(
      and(eq(Ratings.crosswordId, crosswordId), eq(Ratings.userId, userId)),
    );
  return rating[0];
}

export async function updateUserCrosswordRating(
  crosswordId: string,
  rating: number,
  userId: string,
) {
  await db
    .update(Ratings)
    .set({ rating })
    .where(
      and(eq(Ratings.crosswordId, crosswordId), eq(Ratings.userId, userId)),
    );
}
