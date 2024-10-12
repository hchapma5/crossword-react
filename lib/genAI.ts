import {
  FunctionDeclarationSchemaType,
  GoogleGenerativeAI,
  GoogleGenerativeAIFetchError,
  Schema,
} from "@google/generative-ai";
import { CrosswordThemeData } from "@/types/types";

async function askGeminiForCrosswordData(theme: string) {
  const prompt = `
Generate data for a crossword puzzle with the theme "${theme}". Follow these requirements strictly:

1. Provide exactly 20 words.
2. Each word must be unique and directly related to the theme.
3. Words must be 3-8 characters long and contain only letters (A-Z).
4. Each word must have a unique, concise clue.
5. Prioritize medium-to-difficult words that are less commonly known but still relevant to ${theme}.
6. Each clue should be challenging and cryptic, requiring knowledge of ${theme} to solve.

  `;

  const schema: Schema = {
    description: "Generate data for a crossword puzzle",
    type: FunctionDeclarationSchemaType.ARRAY,
    items: {
      type: FunctionDeclarationSchemaType.OBJECT,
      properties: {
        clue: {
          type: FunctionDeclarationSchemaType.STRING,
          description: "A unique, concise clue for the crossword puzzle",
          nullable: false,
        },
        answer: {
          type: FunctionDeclarationSchemaType.STRING,
          description: "The answer to the crossword puzzle",
          nullable: false,
        },
      },
      required: ["clue", "answer"],
    },
  };

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    const parsedData = JSON.parse(response) as CrosswordThemeData;

    // Validate and clean data
    const cleanedData = parsedData.filter(({ answer, clue }) => {
      const isValidWord = /^[A-Za-z]{3,8}$/.test(answer);
      const isValidClue = clue.trim().length > 0;
      return isValidWord && isValidClue;
    });

    return { data: cleanedData };
  } catch (error) {
    if (error instanceof GoogleGenerativeAIFetchError) {
      console.error("Error fetching data from Gemini:", error);
    } else {
      console.error("Error generating crossword data:", error);
    }
    return { error: error };
  }
}

export default askGeminiForCrosswordData;
