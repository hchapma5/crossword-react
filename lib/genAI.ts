import { GoogleGenerativeAI } from "@google/generative-ai"
import { CrosswordData } from "@/types/types"

async function askGeminiForCrosswordData(
  theme: string,
  totalWordCount: number
) {
  const prompt = `
  Consider the following information carefully when generating data for a crossword puzzle:

  - The theme is "${theme}".
  - You MUST provide ${totalWordCount} words.
  - Each word MUST be unique.
  - Each word MUST have a unique clue.
  - Each word MUST be between 3 and 8 characters long.
  - Each word MUST be one SINGLE word, not a combination of words.
  - Words MUST ONLY contain letters. (NO numbers, spaces, or special characters.)

  Response MUST follow the example format:

  {
    "theme": "theme",
    "data": {
      {"clue": "...", "answer": "..."},
    }
  }

  Do NOT include any additional information in the response.
  `

  try {
    // declare gemini api key from .env.local
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const result = await model.generateContent(prompt)
    const response = result.response.text()

    return response
  } catch (error) {
    console.error("Error asking Gemini:", error)
    throw new Error("Error processing crossword data")
  }
}

export default askGeminiForCrosswordData
