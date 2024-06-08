"use server";

import { redirect } from "next/navigation";
import askGeminiForCrosswordData from "@/lib/genAI";

export const fetchPuzzleData = async (formData: FormData) => {
  try {
    // Extract theme and word count from form data
    const theme = formData.get("theme") as string;
    const totalWordCount = parseInt(formData.get("wordCount") as string, 10);

    // Fetch crossword data from Gemini API
    const crosswordData = await askGeminiForCrosswordData(
      theme,
      totalWordCount
    );

    // Encapsulate the crossword data in URL params
    const crosswordParams = new URLSearchParams();

    crosswordParams.append("crosswordData", crosswordData);

    console.log(crosswordParams);
    // Redirect user to the crossword page with the crossword data
    redirect(`/crossword?${crosswordParams}`);
  } catch (error) {
    throw new Error("Error generating crossword data");
  }
};
