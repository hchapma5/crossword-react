import dotenv from 'dotenv'
dotenv.config()

const { GoogleGenerativeAI } = require('@google/generative-ai')

interface CrosswordData {
  theme: string;
  across: {
    [key: string]: {
      clue: string;
      answer: string;
      row: number;
      col: number;
    };
  };
  down: {
    [key: string]: {
      clue: string;
      answer: string;
      row: number;
      col: number;
    };
  };
}

async function askGeminiForCrosswordData(
  theme: string,
  totalWordCount: number
) : Promise<CrosswordData> {
  const prompt = `
  Generate JSON data for a crossword game with the following specifications:
  - Theme: ${theme}
  - Each word should be either across or down
  - Each word should have a unique id [1,2,3...${totalWordCount}]
  - ${totalWordCount} words in total
  - Provide a clue for each word 
  - Provide the row and column of the starting letter for each word 
  - Only respond with the JSON data, do not include any additional information.
  
  The JSON data should have the following structure:
  {{
    "theme": "${theme}",
    "across": {{
      "1": {{"clue": "", "answer": "", "row": , "col": }},
      "...": {{"clue": "", "answer": "", "row": , "col": }}
    }},
    "down": {{
      "1": {{"clue": "", "answer": "", "row": , "col": }},
      "...": {{"clue": "", "answer": "", "row": , "col": }}
    }}
  }}
  `

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    const crosswordData: CrosswordData = JSON.parse(text)
    return crosswordData
  } catch (error) {
    console.error('Error asking Gemini:', error)
    throw new Error('Error processing crossword data')
  }
}

export default askGeminiForCrosswordData
