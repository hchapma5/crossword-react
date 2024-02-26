export const API_HOST = import.meta.env.VITE_API_HOST || ''

export interface CrosswordData {
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

export async function fetchCrosswordData( theme: string, totalWordCount: number ) {
    try {const response = await fetch(`${API_HOST}/api`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            theme: `${theme}`, 
            totalWordCount: totalWordCount 
        })
    })
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    return await response.json() as Promise<CrosswordData>
  } catch (error) {
    console.error('Error fetching crossword data:', error)
    throw error
  }
}

