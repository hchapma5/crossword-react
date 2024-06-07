"use server"

import askGeminiForCrosswordData from "@/lib/genAI"

export const fetchCrossword = async (theme: string, totalWordCount: number) => {
  try {
    const crosswordData = await askGeminiForCrosswordData(theme, totalWordCount)
    return { crosswordData }
  } catch (error) {
    throw new Error("Error generating crossword data")
  }
}
