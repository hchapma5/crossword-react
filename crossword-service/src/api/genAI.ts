const { GoogleGenerativeAI } = require('@google/generative-ai')

interface CrosswordData {
  theme: string
  data: Array<{clue: string, answer: string}>
}

async function askGeminiForCrosswordData(
  theme: string,
  totalWordCount: number
) : Promise<CrosswordData> {
  const prompt = `
  Consider the following information carefully when generating data for a crossword puzzle:

  - The theme is "${theme}".
  - You MUST provide ${totalWordCount} words.
  - Each word MUST be unique.
  - Each word MUST have a unique clue.
  - Each word MUST be 3-10 characters long.
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
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const result = await model.generateContent(prompt)
    const response = await result.response.text()

    return JSON.parse(response)

  } catch (error) {
    console.error('Error asking Gemini:', error)
    throw new Error('Error processing crossword data')
  }
}

export default askGeminiForCrosswordData
