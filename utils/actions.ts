"use server";

import { getCrosswordAnswers } from "@/db/query";

export async function validateCrosswordPuzzle(
  prevState: { message: string; success: boolean },
  formData: FormData,
) {
  const crosswordId = formData.get("crosswordId") as string;
  if (!crosswordId) {
    return { message: "Crossword ID is missing", success: false };
  }

  const correctAnswers = await getCrosswordAnswers(crosswordId);
  if (!correctAnswers) {
    return { message: "Failed to fetch correct answers", success: false };
  }

  // Iteration over the form data and compare the answers
  for (const [key, value] of Array.from(formData.entries())) {
    if (key !== "crosswordId" && correctAnswers[key] !== value) {
      return { message: "Incorrect answers", success: false };
    }
  }

  return {
    message: "Congratulations! All answers are correct!",
    success: true,
  };
}
