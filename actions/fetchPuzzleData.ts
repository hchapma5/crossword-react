"use server";

import { redirect } from "next/navigation";
import askGeminiForCrosswordData from "@/lib/genAI";
import { getCrosswordByTheme, insertCrosswordData } from "@/db/query";
import { isRedirectError } from "next/dist/client/components/redirect";

export const fetchPuzzleData = async (formData: {
  theme: string;
  wordCount: number;
}) => {
  try {
    // Extract theme and word count from form data
    const { theme, wordCount } = formData;

    // Check if the crossword exists in the database
    let crosswordId = await getCrosswordByTheme(theme);

    if (!crosswordId) {
      // Fetch crossword data from Gemini API
      const crosswordData = await askGeminiForCrosswordData(theme, wordCount);
      const parsedData = await JSON.parse(crosswordData);

      // Create a new crossword in the database
      crosswordId = await insertCrosswordData(theme, wordCount, parsedData);
    }

    // Redirect user to the crossword page w/ the crossword ID
    redirect(`/crossword/${crosswordId}`);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    throw new Error("Error generating crossword data");
  }
};
