import { GoogleGenerativeAI } from "@google/generative-ai";
import { GenAiCrosswordData } from "@/types/types";

async function askGeminiForCrosswordData(theme: string) {
  const prompt = `
  Consider the following information carefully when generating data for a crossword puzzle:

- The theme is "${theme}".
- You MUST provide 20 words.
- Each word MUST be unique.
- Each word MUST have a unique clue.
- Each word MUST be between 3 and 8 characters long.
- Each word MUST be one SINGLE word, not a combination of words.
- Words MUST ONLY contain letters. (NO numbers, spaces, or special characters.)
- All words and clues MUST be directly related to the given theme.
- Avoid generic words that could apply to multiple themes. Each word should be specifically connected to the theme.
- Clues should be concise and provide a clear hint to the answer without being too obvious.
- Include a mix of easy, medium, and challenging words and clues.
- Ensure all words and clues are appropriate for a general audience.
- Include a mix of nouns, verbs, adjectives, and adverbs when applicable to the theme.
- Use commonly known words within the theme, avoiding highly specialized or obscure terminology.
- Do not create clues that reference other words in the puzzle.
- Proper nouns are allowed, but specify if the answer should be capitalized in the puzzle.
- Use standard English spelling for all words.
- Double-check that all requirements are met before finalizing the response.

Response MUST follow the example format:

[
  {"clue": "...", "answer": "..."},
]

Do NOT include any additional information in the response.
  `;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    const parsedData = JSON.parse(response) as GenAiCrosswordData;

    // Clean data - removing invalid words (words with spaces, special characters, etc.)
    const specialChars = /[!@#$%^&*(),.?":{}|<>']/g;
    const cleanedData = parsedData.filter(
      ({ answer }) => !answer.match(specialChars) && !answer.includes(" "),
    );

    return cleanedData;
  } catch (error) {
    console.error("Error asking Gemini:", error);
    throw new Error("Error processing crossword data");
  }
}

export default askGeminiForCrosswordData;
