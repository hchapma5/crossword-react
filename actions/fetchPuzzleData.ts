"use server";

import { redirect } from "next/navigation";
import askGeminiForCrosswordData from "@/lib/genAI";
import { getCrosswordByTheme, insertCrosswordData } from "@/db/query";
import { isRedirectError } from "next/dist/client/components/redirect";

export const fetchPuzzleData = async (formData: FormData) => {
  try {
    // Extract theme and word count from form data
    const theme = formData.get("theme") as string;

    // Check if the crossword exists in the database
    let crosswordId = await getCrosswordByTheme(theme);

    if (!crosswordId) {
      // Fetch crossword data from Gemini API
      const crosswordData = await askGeminiForCrosswordData(theme);
      // Create a new crossword in the database
      crosswordId = await insertCrosswordData(theme, crosswordData);
    }

    // Redirect user to the crossword page w/ the crossword ID
    redirect(`/crossword/${crosswordId}`);
  } catch (error) {
    //  Ensure the redirect Error is handled by Nextjs
    if (isRedirectError(error)) {
      throw error;
    }
    console.error(error);
    throw new Error("Error generating crossword data");
  }
};
