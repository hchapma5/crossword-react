import axios from 'axios'

export const API_HOST = import.meta.env.VITE_API_HOST || ''

export interface CrosswordData {
  theme: string
  data: Array<{clue: string, answer: string}>
}

export const postData = async (theme: string, totalWordCount: number) => {
  const url = `${API_HOST}/api`
  const data = {
    theme: theme,
    totalWordCount: totalWordCount
  }

  try {
    const response = await axios.post(url, data)
    console.log('response', response.data)
    return response.data
  } catch (error) {
    console.log('Error fetching crossword data:', error)
  }
} 

