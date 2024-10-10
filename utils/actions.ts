"use server";

import { getCrosswordAnswers } from "@/db/query";

export async function isPuzzleComplete(formData: FormData) {
  const crosswordId = formData.get("crosswordId") as string;
  console.log("crossword id: ", crosswordId);

  const correctAnswers = await getCrosswordAnswers(crosswordId!);
  console.log("correct answers: ", correctAnswers);

  // remove id from the form data
  formData.delete("crosswordId");

  // Iteration over the form data and compare the answers
  for (const [key, value] of Array.from(formData.entries())) {
    if (correctAnswers[key] !== value) {
      console.log(`Incorrect answer for ${key}`);
      return console.log("invalid crossword");
    }
  }
  return console.log("valid crossword");
}
