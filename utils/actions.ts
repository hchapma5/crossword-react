"use server";

import { getCrosswordAnswers } from "@/db/query";

export async function validateCrosswordPuzzle(
  prevState: any,
  formData: FormData,
) {
  console.log("validating crossword puzzle on the server");
  const crosswordId = formData.get("crosswordId") as string;
  formData.delete("crosswordId");

  const correctAnswers = await getCrosswordAnswers(crosswordId);
  console.log("correctAnswers", correctAnswers);
  if (!correctAnswers) {
    return { message: "Failed to fetch correct answers", success: false };
  }

  // Iteration over the form data and compare the answers
  for (const [key, value] of Array.from(formData.entries())) {
    if (correctAnswers[key] !== value) {
      return { message: "Incorrect answers", success: false };
    }
  }

  return {
    message: "Congratulations! All answers are correct!",
    success: true,
  };
}
