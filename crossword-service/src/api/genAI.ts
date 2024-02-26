import dotenv from 'dotenv'
dotenv.config()

const { GoogleGenerativeAI } = require('@google/generative-ai')

interface CrosswordData {
  theme: string;
  across: {
    [key: number]: {
      clue: string;
      answer: string;
      row: number;
      col: number;
    };
  };
  down: {
    [key: number]: {
      clue: string;
      answer: string;
      row: number;
      col: number;
    };
  };
}

function cleanGeminiResponse(response: string) {
  let cleanData = response.slice(1, -1)
  cleanData = cleanData.replace(/\\"/g, '"')
  cleanData = cleanData.replace(/\{\{/g, '{').replace(/\}\}/g, '}')
  return cleanData
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

  Additonal limitations!:
  - The answer for each word should be a single word
  - The answer for each word should be between 3 and 12 characters long
  - Letters only, no numbers or special characters
  - No two words can have the same answer
  `

  try {
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const result = await model.generateContent(prompt)
    const response = await result.response.text()
    const cleanData = cleanGeminiResponse(response)

    return JSON.parse(cleanData)
  } catch (error) {
    console.error('Error asking Gemini:', error)
    throw new Error('Error processing crossword data')
  }
}

export default askGeminiForCrosswordData
