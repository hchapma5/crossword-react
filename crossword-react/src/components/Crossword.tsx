import { CrosswordData } from "../interface"

export default function Crossword( data : CrosswordData ) {
  return (
    <div>{String(data)}</div>
  )
}
