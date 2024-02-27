import { Container } from "@mui/material"
import { CrosswordData } from "../utils"

interface CluesProps {
  data: CrosswordData
}

export default function Clues({ data }: CluesProps) {
  const { across, down } = data
  const acrossWords = Object.values(across)
  const downWords = Object.values(down)

  return (
    <Container sx={{display: "flex"}}>
      <div>
        <h2>Across</h2>
        <ol>
          {acrossWords.map((word: { clue: string; answer: string; row: number; col: number; }, index: number) => (
            <li key={index}>{word.clue}</li>
          ))}
        </ol>
      </div>
      <div>
        <h2>Down</h2>
        <ol>
          {downWords.map((word: { clue: string; answer: string; row: number; col: number; }, index: number) => (
            <li key={index}>{word.clue}</li>
          ))}
        </ol>
      </div>
    </Container>
  )
}
