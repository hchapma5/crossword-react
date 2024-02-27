import { Container } from "@mui/material";
import { CrosswordData } from "../utils";

interface CrosswordProps {
  data: CrosswordData
}

function createLetterGrid(data: CrosswordData) {
  const { across, down } = data
  const grid: string[][] = Array.from({ length: 20 }, () => Array.from({ length: 20 }, () => ''))
  Object.values(across).forEach((word: { answer: string; row: number; col: number; }) => {
    const { row, col, answer } = word
    const wordArray = answer.split('')
    wordArray.forEach((letter, index) => {
      grid[row][col + index] = letter
    })
  })
  Object.values(down).forEach((word: { answer: string; row: number; col: number; }) => {
    const { row, col, answer } = word
    const wordArray = answer.split('')
    wordArray.forEach((letter, index) => {
      grid[row + index][col] = letter
    })
  })
  console.log(grid)
  return grid
}

export default function Crossword( { data } : CrosswordProps) {
  const grid = createLetterGrid(data)
  return (
    <Container>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((letter, colIndex) => (
            <div key={colIndex} style={{ width: 20, height: 20, border: '1px solid black', textAlign: 'center' }}>
              {letter}
            </div>
          ))}
        </div> // Added closing tag for the outer div
      ))}
    </Container> // Added closing tag for the Container
  )
}
