"use server";

import { redirect } from "next/navigation";
import askGeminiForCrosswordData from "@/lib/genAI";
import clg from "crossword-layout-generator";
import { getCrosswordIdByTheme, insertCrosswordData } from "@/db/query";
import { isRedirectError } from "next/dist/client/components/redirect";
import { GenAiCrosswordData } from "@/types/types";
import { currentUser } from "@clerk/nextjs/server";

export const fetchPuzzleData = async (formData: FormData) => {
  const user = await currentUser();

  try {
    // Extract theme and word count from form data
    const theme = formData.get("theme") as string;

    // Check if the crossword exists in the database
    let crosswordId = await getCrosswordIdByTheme(theme);

    if (!crosswordId) {
      // Fetch crossword data from Gemini API
      const aiResponse: GenAiCrosswordData =
        await askGeminiForCrosswordData(theme);

      // Generate a crossword layout
      const crosswordData = clg.generateLayout(aiResponse);

      // Create a new crossword in the database
      crosswordId = await insertCrosswordData(
        theme,
        crosswordData,
        user!.username || user!.id,
      );
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
