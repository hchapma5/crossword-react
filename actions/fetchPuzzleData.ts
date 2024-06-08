"use server"

import { redirect } from "next/navigation"
import askGeminiForCrosswordData from "@/lib/genAI"

export const fetchPuzzleData = async (formData: FormData) => {
  try {
    // Extract theme and word count from form data
    const theme = formData.get("theme") as string
    const totalWordCount = parseInt(formData.get("wordCount") as string, 10)

    // Fetch crossword data from Gemini API
    const crosswordData = JSON.parse(
      await askGeminiForCrosswordData(theme, totalWordCount)
    )

    // Encapsulate the crossword data in URL params
    const crosswordParams = new URLSearchParams()
    const encodedParams = encodeURIComponent(JSON.stringify(crosswordData))
    crosswordParams.append("crosswordData", encodedParams)

    // Redirect user to the crossword page with the crossword data
    return redirect(`/crossword?${crosswordParams.toString()}`)
  } catch (error) {
    throw new Error("Error generating crossword data")
  }
}
