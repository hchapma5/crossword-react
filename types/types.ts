type CrosswordData = {
  theme: string
  data: Array<{ clue: string; answer: string }>
}

type CrosswordPuzzle = {
  table: string[][]
  result: {
    clue: string
    answer: string
    startx: number
    starty: number
    orientation: "across" | "down" | "none"
    position: number
  }[]
  rows: number
  cols: number
  table_string: string
}

type WordPosition = {
  position: number
  startx: number
  starty: number
}

export type { CrosswordData, CrosswordPuzzle, WordPosition }
