import { GoogleGenerativeAI } from "@google/generative-ai";
import { GenAiCrosswordData } from "@/types/types";

async function askGeminiForCrosswordData(
  theme: string,
): Promise<GenAiCrosswordData> {
  const prompt = `
  Generate data for a crossword puzzle with the theme "${theme}". Follow these requirements strictly:

  1. Provide exactly 20 words.
  2. Each word must be unique and directly related to the theme.
  3. Words must be 3-8 characters long and contain only letters (A-Z).
  4. Each word must have a unique, concise clue.
  5. Include a mix of easy, medium, and challenging words.
  6. Use a variety of word types (nouns, verbs, adjectives, adverbs) when applicable.
  7. Avoid obscure terminology; use commonly known words within the theme.

  Respond ONLY with a JSON array in this format:
  [
    {"clue": "...", "answer": "...", "capitalize": boolean},
  ]
  `;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    const parsedData = JSON.parse(response) as GenAiCrosswordData;

    // Validate and clean data
    const cleanedData = parsedData.filter(({ answer, clue }) => {
      const isValidWord = /^[A-Za-z]{3,8}$/.test(answer);
      const isValidClue = clue.trim().length > 0;
      return isValidWord && isValidClue;
    });

    if (cleanedData.length !== 20) {
      throw new Error("Invalid number of words generated");
    }

    return cleanedData;
  } catch (error) {
    console.error("Error generating crossword data:", error);
    throw new Error("Failed to generate crossword data");
  }
}

export default askGeminiForCrosswordData;
