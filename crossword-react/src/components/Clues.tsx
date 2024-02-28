import { Container } from "@mui/material"
import { CrosswordData } from "../utils/utils"

interface CluesProps {
  data: CrosswordData
}

export default function Clues( props : CluesProps ) {
  const { theme, data } = props.data
  return (
    <Container>
      <h2>{theme}</h2>
      {data.map((d) => (
        <ul>{d.clue}</ul>
      ))}
    </Container>
  )
}