"use server";

import { addRating, getCrosswordAnswersById } from "@/db/query";

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

// TODO: handle existing rating (update/recalculate average)
export async function addRatingAction(
  rating: number,
  crosswordId: string,
  userId: string,
) {
  try {
    await addRating({ crosswordId, rating, userId });
    return { message: "Rating added", success: true };
  } catch (error) {
    console.error(error);
    return { message: "Failed to add rating", success: false };
  }
}
