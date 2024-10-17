"use server";

import { db } from "@/db/db";
import {
  getCrosswordAnswersById,
  getCrosswordRating,
  getUserCrosswordRating,
  insertCrosswordRating,
  updateCrosswordRating,
  updateUserCrosswordRating,
} from "@/db/query";
import { Crosswords } from "@/db/schema";

export async function validateCrosswordPuzzle(
  prevState: any,
  formData: FormData,
) {
  console.log("validating crossword puzzle on the server");
  const crosswordId = formData.get("crosswordId") as string;
  formData.delete("crosswordId");

  const correctAnswers = await getCrosswordAnswersById(crosswordId);
  console.log("correctAnswers", correctAnswers);
  if (!correctAnswers) {
    return { message: "Failed to fetch correct answers", success: false };
  }

  const userAnswers = Object.fromEntries(formData.entries());

  // Iteration over the form data and compare the answers
  for (const [position, answer] of Object.entries(userAnswers)) {
    if (position.startsWith("$ACTION")) continue;
    if (correctAnswers[position] !== answer) {
      return {
        message: `Incorrect answers at ${position}`,
        success: false,
      };
    }
  }

  return {
    message: "Congratulations! All answers are correct!",
    success: true,
  };
}

export async function addRatingAction(
  rating: number,
  crosswordId: string,
  userId: string,
) {
  try {
    // Insert the new rating
    await insertCrosswordRating(crosswordId, rating, userId);

    // Fetch the current crossword details
    const crossword = await getCrosswordRating(crosswordId);

    // Update ratings count, total rating, and average rating
    const newRatingsCount = crossword.ratingsCount + 1;
    const newTotalRating = crossword.totalRating + rating;
    const newAverageRating = newTotalRating / newRatingsCount;

    // Update the crossword in the database
    await updateCrosswordRating(
      crosswordId,
      newAverageRating,
      newRatingsCount,
      newTotalRating,
    );

    return { message: "Rating added", success: true };
  } catch (error) {
    console.error(error);
    return { message: "Failed to add rating", success: false };
  }
}

export async function updateRatingAction(
  rating: number,
  crosswordId: string,
  userId: string,
) {
  try {
    const oldRating = await getUserCrosswordRating(crosswordId, userId);

    await updateUserCrosswordRating(crosswordId, rating, userId);

    const crossword = await getCrosswordRating(crosswordId);

    const newTotalRating = crossword.totalRating - oldRating.rating + rating;
    const newAverageRating = newTotalRating / crossword.ratingsCount;

    await updateCrosswordRating(
      crosswordId,
      newAverageRating,
      crossword.ratingsCount,
      newTotalRating,
    );

    return { message: "Rating updated", success: true };
  } catch (error) {
    console.error(error);
    return { message: "Failed to update rating", success: false };
  }
}

export async function getUserRatingAction(crosswordId: string, userId: string) {
  const rating = await getUserCrosswordRating(crosswordId, userId);
  return rating;
}
